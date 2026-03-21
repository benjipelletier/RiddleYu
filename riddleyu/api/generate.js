import Anthropic from '@anthropic-ai/sdk'
import { kv } from '@vercel/kv'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a Chinese language educator specializing in 成语 (chéngyǔ — four-character idioms).
You generate daily puzzles for a deduction game called RiddleYu.
You will output ONLY valid JSON, no markdown, no explanation, no preamble.`

const PUZZLE_PROMPT = (date, usedChengyu, forceChengyu) => `Generate a RiddleYu v2 puzzle for ${date}.
${usedChengyu.length > 0 ? `\nDo NOT use any of these 成语 (already used):\n${usedChengyu.join('、')}\n` : ''}
${forceChengyu ? `\nYou MUST use this specific 成语: ${forceChengyu}\n` : ''}

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
  "date": "${date}",
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
}`

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const date = req.query.date || new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })

  // Check for existing puzzle
  let existing = null
  try {
    existing = await kv.get(`puzzle:${date}`)
    if (existing && req.query.force !== 'true') {
      return res.status(200).json({ status: 'already cached', date })
    }
  } catch (e) {
    console.error('KV read error:', e)
  }

  // When force=true and puzzle exists, re-generate with the same chengyu
  const forceChengyu = (req.query.force === 'true' && existing?.chengyu)
    ? existing.chengyu.chars.join('')
    : null

  // Fetch used 成语
  let usedChengyu = []
  try {
    usedChengyu = (await kv.get('used_chengyu')) || []
  } catch (e) {
    console.error('KV read error (used_chengyu):', e)
  }

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: PUZZLE_PROMPT(date, usedChengyu, forceChengyu) }],
    })
    const puzzle = JSON.parse(msg.content[0].text.trim())

    // Basic validation
    if (!puzzle.chengyu?.chars || puzzle.chengyu.chars.length !== 4) {
      throw new Error('Invalid chengyu structure')
    }
    if (!puzzle.grid || puzzle.grid.length !== 16) {
      throw new Error('Grid must have exactly 16 characters')
    }
    if (new Set(puzzle.grid).size !== 16) {
      throw new Error('Grid has duplicate characters')
    }
    const zaiCount = Object.values(puzzle.characters).filter(c => c.zai).length
    if (zaiCount !== 4) {
      throw new Error(`Expected 4 在 characters, got ${zaiCount}`)
    }

    await kv.set(`puzzle:${date}`, puzzle)

    // Record as used
    const newEntry = puzzle.chengyu.chars.join('')
    if (!usedChengyu.includes(newEntry)) {
      await kv.set('used_chengyu', [...usedChengyu, newEntry])
    }

    return res.status(200).json({ status: 'generated', date, chengyu: newEntry })
  } catch (e) {
    console.error('Generation error:', e)
    return res.status(500).json({ error: 'Failed to generate puzzle', detail: e.message })
  }
}
