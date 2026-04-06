#!/bin/bash
# Generate a riddleyu v2 puzzle and store it in Vercel KV
#
# Usage:
#   ./scripts/generate.sh              # generate for today
#   ./scripts/generate.sh 2026-03-21   # generate for specific date
#   ./scripts/generate.sh --force      # regenerate today (same chengyu, new claims)
#   ./scripts/generate.sh 2026-03-21 --force
#
# Requires .env.local with ANTHROPIC_API_KEY, KV_REST_API_URL, KV_REST_API_TOKEN

set -euo pipefail
cd "$(dirname "$0")/.."

# Load env
if [ -f .env.local ]; then
  set -a; source .env.local; set +a
else
  echo "Error: .env.local not found" >&2; exit 1
fi

# Parse args
DATE=""
FORCE=false
for arg in "$@"; do
  case $arg in
    --force) FORCE=true ;;
    *) DATE="$arg" ;;
  esac
done

if [ -z "$DATE" ]; then
  DATE=$(TZ=America/New_York date +%Y-%m-%d)
fi

echo "Date: $DATE"
echo "Force: $FORCE"

# Check existing puzzle
EXISTING=$(curl -s -H "Authorization: Bearer $KV_REST_API_TOKEN" \
  "$KV_REST_API_URL/get/puzzle:$DATE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('result'):
    print(data['result'])
" 2>/dev/null || true)

if [ -n "$EXISTING" ] && [ "$FORCE" != "true" ]; then
  echo "Puzzle already exists for $DATE. Use --force to regenerate."
  echo "$EXISTING" | python3 -m json.tool 2>/dev/null | head -5
  exit 0
fi

# Extract forceChengyu if force + existing
FORCE_CHENGYU=""
if [ "$FORCE" = "true" ] && [ -n "$EXISTING" ]; then
  FORCE_CHENGYU=$(echo "$EXISTING" | python3 -c "
import sys, json
data = json.loads(sys.stdin.read())
print(''.join(data['chengyu']['chars']))
" 2>/dev/null || true)
  if [ -n "$FORCE_CHENGYU" ]; then
    echo "Force mode: reusing chengyu $FORCE_CHENGYU"
  fi
fi

# Get used chengyu list
USED=$(curl -s -H "Authorization: Bearer $KV_REST_API_TOKEN" \
  "$KV_REST_API_URL/get/used_chengyu" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('result'):
    items = json.loads(data['result']) if isinstance(data['result'], str) else data['result']
    print('、'.join(items))
" 2>/dev/null || true)

echo "Used chengyu: ${USED:-none}"

# Build prompt
read -r -d '' SYSTEM_PROMPT << 'SYEOF' || true
You are a Chinese language educator specializing in 成语 (chéngyǔ — four-character idioms).
You generate daily puzzles for a deduction game called RiddleYu.
You will output ONLY valid JSON, no markdown, no explanation, no preamble.
SYEOF

USED_BLOCK=""
if [ -n "$USED" ]; then
  USED_BLOCK="
Do NOT use any of these 成语 (already used):
$USED
"
fi

FORCE_BLOCK=""
if [ -n "$FORCE_CHENGYU" ]; then
  FORCE_BLOCK="
You MUST use this specific 成语: $FORCE_CHENGYU
"
fi

read -r -d '' USER_PROMPT << UEOF || true
Generate a RiddleYu v2 puzzle for $DATE.
$USED_BLOCK$FORCE_BLOCK
## Game overview

The player sees 16 Chinese characters in a 4×4 grid. 4 of them form a 成语 (in order). 12 are distractors. The first character is pre-revealed. Each correctly opened card reveals a "claim" — a short Chinese statement about the idiom. Claims from correct characters (在) are TRUE. Claims from distractors (不在) are plausible FALSE statements.

The player cross-references claims to deduce which characters belong. Discovery is enforced in position order (0→1→2→3).

## How to construct the puzzle

**Step 1: Choose a 成语.**
Pick a well-known, meaningful 成语 suitable for intermediate learners.

**Step 2: Semantic decomposition.**
Break it into 4 roles (output this as "decomposition" for your reasoning, it won't be shown to players):
- Position 0: Setup / Context
- Position 1: Transition / Change
- Position 2: Resolution / Process
- Position 3: Outcome / Evaluation

**Step 3: Choose 12 distractor characters.**
Must include a mix of:
- 3–4 synonym traps (characters with similar meaning to the correct ones)
- 2–3 component parts (characters that are literal components of correct characters, e.g. 工 and 力 are inside 功)
- 3–4 same-category (characters from the same semantic field)
- 2–3 thematic noise (characters related to the story but not in the idiom)

All 16 characters must be distinct. Each distractor must plausibly satisfy SOME true claims but fail against others.

**Step 4: Generate 4 TRUE claims (for 在 characters).**
Each claim must:
- Be in Chinese (clear, natural phrasing, not dumbed down)
- Reference the semantic decomposition accurately
- Narrow the field for the NEXT position (chain forward: claim 0 → helps find position 1, etc.)
- Require cross-referencing with at least one other claim to be actionable
- Include a mix of: semantic progression, character meaning distinctions, component structure, story references

**Step 5: Generate 12 FALSE claims (for 不在 characters).**
Three types of lies, mixed:
- Near-miss: almost correct but one specific detail is wrong
- Category confusion: mixes up semantic roles between positions
- Structural error: misrepresents the overall pattern

Each false claim must sound plausible until cross-referenced with true claims. NOT trivially dismissable.

**Step 6: Validate.**
- Only one consistent interpretation exists across all 16 characters
- Every true claim is needed (no redundancy)
- At least 2 claims must combine to eliminate any single distractor
- The puzzle teaches meaningful semantic distinctions between similar Chinese words

**Step 7: Write a story summary.**
1–2 sentences in Chinese explaining the idiom's origin and meaning. This is shown on the result screen.

## Output format

Output this exact JSON shape (no markdown, no extra text):
{
  "date": "$DATE",
  "chengyu": {
    "chars": ["字","字","字","字"],
    "pinyin": "pīnyīn",
    "meaning": "English meaning"
  },
  "story": "Chinese story summary",
  "grid": ["字",...16 chars shuffled...],
  "characters": {
    "字": { "zai": true, "position": 0, "claim": "Chinese claim text" },
    "字": { "zai": false, "claim": "Chinese claim text" },
    ...all 16 characters...
  }
}
UEOF

echo ""
echo "Calling Anthropic API..."

RESPONSE=$(curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d "$(python3 -c "
import json
print(json.dumps({
    'model': 'claude-sonnet-4-20250514',
    'max_tokens': 4000,
    'system': '''$SYSTEM_PROMPT''',
    'messages': [{'role': 'user', 'content': '''$USER_PROMPT'''}]
}))
")")

# Extract the text content
PUZZLE=$(echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if 'error' in data:
    print('API Error:', data['error'], file=sys.stderr)
    sys.exit(1)
text = data['content'][0]['text'].strip()
# Validate it's valid JSON
parsed = json.loads(text)
print(json.dumps(parsed))
")

if [ $? -ne 0 ]; then
  echo "Error parsing response" >&2
  echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
  exit 1
fi

# Validate
python3 -c "
import json, sys
p = json.loads('''$PUZZLE''')
assert len(p['chengyu']['chars']) == 4, 'Need 4 chengyu chars'
assert len(p['grid']) == 16, 'Need 16 grid chars'
assert len(set(p['grid'])) == 16, 'Grid has duplicates'
zai = [k for k,v in p['characters'].items() if v.get('zai')]
assert len(zai) == 4, f'Need 4 zai chars, got {len(zai)}'
print('Validation passed')
print(f'Chengyu: {chr(34)}{\"\".join(p[\"chengyu\"][\"chars\"])}{chr(34)}')
print(f'Meaning: {p[\"chengyu\"][\"meaning\"]}')
"

echo ""
echo "Storing in KV..."

# Store puzzle
curl -s -H "Authorization: Bearer $KV_REST_API_TOKEN" \
  "$KV_REST_API_URL/set/puzzle:$DATE" \
  -d "$PUZZLE" > /dev/null

# Update used_chengyu
NEW_ENTRY=$(echo "$PUZZLE" | python3 -c "
import sys, json
p = json.loads(sys.stdin.read())
print(''.join(p['chengyu']['chars']))
")

# Get current used list, append, store
python3 -c "
import json, urllib.request, sys

url = '$KV_REST_API_URL/get/used_chengyu'
req = urllib.request.Request(url, headers={'Authorization': 'Bearer $KV_REST_API_TOKEN'})
try:
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    used = json.loads(data['result']) if data.get('result') else []
except:
    used = []

new = '$NEW_ENTRY'
if new not in used:
    used.append(new)

# Store back
url2 = '$KV_REST_API_URL/set/used_chengyu'
payload = json.dumps(used).encode()
req2 = urllib.request.Request(url2, data=payload, headers={
    'Authorization': 'Bearer $KV_REST_API_TOKEN',
    'Content-Type': 'application/json'
})
urllib.request.urlopen(req2)
print(f'Used chengyu updated: {len(used)} entries')
"

echo ""
echo "Done! Puzzle for $DATE is live."
echo "$PUZZLE" | python3 -m json.tool
