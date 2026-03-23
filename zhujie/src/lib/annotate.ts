import Anthropic from '@anthropic-ai/sdk';
import type { ContentMap, LineAnnotation } from './types';
import type { LineDecomposition } from './yukuai-types';

let _client: Anthropic | null = null;
function getClient() {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  }
  return _client;
}
const MODEL = 'claude-sonnet-4-6';

// ─── Pass 1: Content Map ─────────────────────────────────────────────────────

const PASS1_SYSTEM = `You are a Chinese language analysis engine. You will receive a complete piece of Chinese content (song lyrics, TV subtitles, or transcript).

Produce a JSON content map with the following structure:
{
  "summary": "2-3 sentence thematic/emotional summary",
  "motifs": ["list of recurring images, metaphors, or thematic threads"],
  "structural_patterns": ["parallel lines, repeated frames, refrains"],
  "register_profile": "overall register description and notable shifts",
  "speakers": [{"id": "...", "description": "..."}],
  "cultural_references": ["broad cultural context relevant to the whole piece"],
  "language_variant": "simplified | traditional",
  "key_vocabulary_threads": [
    {"word": "鯨魚", "appears_in_lines": [1, 8, 15], "evolution": "how its meaning shifts across appearances"}
  ]
}

Be specific and grounded. Every observation must reference specific lines or words. Do not make generic statements about Chinese culture — only flag cultural context that is necessary to understand THIS specific content.

Return ONLY valid JSON. No markdown, no explanation.`;

export async function generateContentMap(text: string): Promise<ContentMap> {
  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: PASS1_SYSTEM,
    messages: [{ role: 'user', content: text }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  return parseJSON<ContentMap>(content.text);
}

function parseJSON<T>(raw: string): T {
  let s = raw.trim();
  // Strip code fences
  if (s.startsWith('```')) {
    s = s.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
    s = s.trim();
  }
  // Extract the outermost JSON object
  const start = s.indexOf('{');
  if (start === -1) throw new Error('No JSON object found in response');
  let depth = 0;
  let end = -1;
  for (let i = start; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) throw new Error('Unterminated JSON object in response');
  return JSON.parse(s.slice(start, end + 1)) as T;
}

// ─── Pass 2: Line Annotation ─────────────────────────────────────────────────

const PASS2_SYSTEM = `You are annotating a single line of Chinese content for an intermediate-to-advanced learner (HSK 4-6 level). Your goal is to maximize comprehension of this specific line in context.

You have access to:
- The full content map (themes, motifs, patterns)
- The complete original text
- The target line and its surrounding lines

Produce annotations following this JSON schema:
{
  "line_index": number,
  "chinese": "the line text",
  "translation": "contextual English translation",
  "insight": "ONE concise non-obvious observation",
  "words": [
    {
      "chars": "word",
      "pinyin": "only if pronunciation is a gotcha",
      "has_pinyin_gotcha": boolean,
      "note": "contextual meaning woven with cultural insight",
      "is_pattern_key": boolean,
      "difficulty": "hsk1-6 or hsk5+"
    }
  ],
  "grammar_unlock": null | {
    "pattern": "pattern template",
    "explanation": "what it does",
    "examples": ["example1", "example2", "example3"]
  },
  "cross_references": [
    { "target_line": number, "note": "specific connection explanation" }
  ],
  "dropped_subject": null | "explanation of implied subject",
  "negation_note": null | "explanation of negation pattern"
}

Rules:
- CONTEXTUAL MEANINGS ONLY. Never give dictionary defaults. What does this word mean in THIS sentence?
- WEAVE cultural insight into vocabulary notes. Don't separate "culture" from "meaning."
- PINYIN only when pronunciation is a gotcha: 多音字, unexpected tones, commonly mispronounced. Set has_pinyin_gotcha: true for these. Otherwise omit pinyin and set has_pinyin_gotcha: false.
- INSIGHT must be ONE concise observation — the single most important non-obvious thing about this line. Not a summary. An insight.
- GRAMMAR UNLOCK only when a pattern is the actual comprehension bottleneck. If grammar is straightforward, set to null.
- CROSS-REFERENCES must be specific. "This connects to line X" is useless. "This line's V來V去 mirrors line 2's, but swimming became running — the exhaustion escalates" is useful.
- SKIP boring words. 我, 你, 的, 在 — don't annotate unless doing something unusual.
- For particles (了, 呢, 吧, etc.), explain what the particle is DOING in this specific sentence.
- Flag dropped subjects explicitly.
- Note register only when the word choice is surprising or meaningful.

Return ONLY valid JSON. No markdown, no explanation.`;

export async function generateLineAnnotationLegacy(
  contentMap: ContentMap,
  fullText: string,
  lines: string[],
  lineIndex: number,
): Promise<LineAnnotation> {
  const start = Math.max(0, lineIndex - 3);
  const end = Math.min(lines.length - 1, lineIndex + 3);
  const surroundingLines = lines
    .slice(start, end + 1)
    .map((line, i) => {
      const idx = start + i;
      const marker = idx === lineIndex ? ' <<<' : '';
      return `${idx}: ${line}${marker}`;
    })
    .join('\n');

  const userMessage = `## Content Map
${JSON.stringify(contentMap, null, 2)}

## Full Text
${fullText}

## Target Line
Line ${lineIndex}: ${lines[lineIndex]}

## Surrounding Lines (±3)
${surroundingLines}`;

  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: PASS2_SYSTEM,
    messages: [{ role: 'user', content: userMessage }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  return parseJSON<LineAnnotation>(content.text);
}

// ─── Pass 2 Redesign: YuKuai Decomposition ───────────────────────────────────

const DECOMPOSE_SYSTEM = `You are decomposing a single line of Chinese content into atomic learning units (YuKuai) for a language learner.

You have access to:
- The full content map (themes, motifs, patterns)
- The complete original text
- The target line and its surrounding lines

Produce a decomposition following this JSON schema:
{
  "translation": "contextual English translation of the full line",
  "yukuai": [
    {
      "canonical_id": "vocab:鲸鱼" | "grammar:V来V去" | "expr:春花秋月",
      "type": "vocab" | "grammar" | "expression",
      "surface_form": "the exact characters as they appear in this line",
      "contextual_meaning": "what this means specifically HERE, not the dictionary default"
    }
  ],
  "connections": [
    {
      "from": "canonical_id of a yukuai in this line",
      "to_line": line_index_number,
      "note": "specific explanation of how this yukuai connects to or evolves from its appearance in another line"
    }
  ],
  "gotchas": [
    {
      "yukuai_id": "canonical_id",
      "note": "pronunciation trap, false friend, register surprise, or common mistake"
    }
  ]
}

Rules for canonical_id format:
- Vocab: "vocab:" + the dictionary headword in simplified Chinese. E.g., "vocab:鲸鱼", "vocab:人海"
- Grammar: "grammar:" + the abstract pattern with variables. E.g., "grammar:V来V去", "grammar:是...的", "grammar:一...就..."
- Expression: "expr:" + the fixed expression. E.g., "expr:春花秋月", "expr:一霎那"

Rules for decomposition:
- SKIP boring words (我, 你, 的, 在, 是, 了, 不) unless their usage is genuinely unusual or interesting
- For grammar patterns, the canonical_id uses variables (V, N, A) and the surface_form shows the actual words
- CONTEXTUAL MEANING must explain what this means HERE, not the dictionary default
- CONNECTIONS must be specific. Not "relates to line X" but "V来V去 shifts from 游 (swimming) to 跑 (running) — the exhaustion escalates"
- GOTCHAS only when there's a real trap: 多音字, reversed character pairs (言语 vs 语言), register mismatches, false friends
- Keep decomposition focused — 2-6 yukuai per line is typical. Don't force it.

Return ONLY valid JSON. No markdown, no explanation.`;

export async function generateLineDecomposition(
  contentMap: ContentMap,
  fullText: string,
  lines: string[],
  lineIndex: number,
): Promise<LineDecomposition> {
  const start = Math.max(0, lineIndex - 3);
  const end = Math.min(lines.length - 1, lineIndex + 3);
  const surroundingLines = lines
    .slice(start, end + 1)
    .map((line, i) => {
      const idx = start + i;
      const marker = idx === lineIndex ? ' <<<' : '';
      return `${idx}: ${line}${marker}`;
    })
    .join('\n');

  const userMessage = `## Content Map
${JSON.stringify(contentMap, null, 2)}

## Full Text
${fullText}

## Target Line
Line ${lineIndex}: ${lines[lineIndex]}

## Surrounding Lines (±3)
${surroundingLines}`;

  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: DECOMPOSE_SYSTEM,
    messages: [{ role: 'user', content: userMessage }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  return parseJSON<LineDecomposition>(content.text);
}
