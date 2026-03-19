// api/generate.js — called by Vercel cron job daily at midnight ET
// Also callable manually: GET /api/generate?date=YYYY-MM-DD&force=true
// Protected by CRON_SECRET env var (set in Vercel dashboard)

import Anthropic from '@anthropic-ai/sdk'
import { kv } from '@vercel/kv'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a Chinese language educator specializing in 成语 (chéngyǔ — four-character idioms).
Your job is to generate a daily puzzle for a game called RiddleYu.

You will output ONLY valid JSON, no markdown, no explanation, no preamble.`

const USER_PROMPT = (date, usedChengyu) => `Generate a RiddleYu puzzle for ${date}.
${usedChengyu.length > 0 ? `\nDo NOT use any of these 成语, they have already been used:\n${usedChengyu.join('、')}\n` : ''}

## Game overview

The puzzle has TWO phases:

**Phase 1 — Connections:** The player sees 16 Chinese characters in a grid. One riddle at a time describes a whole 成语. They pick the 4 characters that spell it. Repeat for all 4 成语.

**Phase 2 — Sliding:** The 4 solved 成语 are shown as rows. The player drags each row left/right to select one character per row. The 4 selected characters (one from each row, in row order) must spell a hidden 5th 成语.

## How to construct the puzzle

**Step 1: Choose the hidden 成语 first.**
Pick a well-known, meaningful 成语 (4 characters). This is the hidden finale.

**Step 2: Choose 4 solved 成语.**
Each solved 成语 must contain one character from the hidden 成语, in order:
- solved[0] must contain hidden[0] somewhere in its 4 characters
- solved[1] must contain hidden[1] somewhere in its 4 characters
- solved[2] must contain hidden[2] somewhere in its 4 characters
- solved[3] must contain hidden[3] somewhere in its 4 characters

Record which position (0, 1, 2, or 3) in each solved 成语 holds the hidden character — this becomes hiddenPositions.

Example:
- hidden: 一马当先 → chars [一, 马, 当, 先]
- solved[0]: 一石二鸟 → 一 is at position 0 → hiddenPositions[0] = 0
- solved[1]: 马到成功 → 马 is at position 0 → hiddenPositions[1] = 0
- solved[2]: 当仁不让 → 当 is at position 0 → hiddenPositions[2] = 0
- solved[3]: 争先恐后 → 先 is at position 1 → hiddenPositions[3] = 1

**Step 3: Write one riddle for each solved 成语.**
The riddle describes the MEANING or ORIGIN of the whole idiom — a vivid scene or story that points clearly to this specific idiom without naming it. Do not write riddles for individual characters.

Riddle format:
- text: a short vivid Chinese sentence (1–2 sentences)
- riddle_translation: English translation of the riddle text
- hint: a direct English hint naming the concept or situation

Good riddle examples:
- 一石二鸟: text="旅人投一石，双鸟齐落。一举，两获。" translation="A traveler throws one stone — two birds fall. One move, two gains." hint="One action achieves two goals at once"
- 马到成功: text="将旗未落，战马蹄声中城门已开。" translation="The battle flag still raised — city gates open to the sound of approaching hooves." hint="Success arrives the moment you do — no delay, no struggle"

**Step 4: Build the grid.**
The grid has 16 characters: all 4 characters from each of the 4 solved 成语 (4 × 4 = 16). Shuffle them randomly.

gridGroups is a parallel array: gridGroups[i] = which solved 成语 index (0–3) the character at grid[i] belongs to. Shuffle grid and gridGroups together (same permutation).

## Rules

- All 5 成语 must be real, well-known Chinese idioms
- The 4 solved 成语 must be suitable for beginner–intermediate learners
- No character may appear in two different solved 成语 (the 16 grid chars must all be distinct)
- The hidden 成語 character in each row must come from a different solved 成语 (one per row)
- Riddles must not name the 成语 or any of its characters directly
- Choose 4 solved 成语 with varied themes (not all battle idioms, not all animal idioms)

Output this exact JSON shape (no markdown, no extra text):
{
  "date": "${date}",
  "chengyus": [
    {
      "chars": ["字","字","字","字"],
      "pinyin": "xxx xxx xxx xxx",
      "meaning": "English meaning",
      "riddle": "Chinese riddle text",
      "riddle_translation": "English translation of riddle",
      "hint": "English hint"
    },
    { "chars": [...], "pinyin": "...", "meaning": "...", "riddle": "...", "riddle_translation": "...", "hint": "..." },
    { "chars": [...], "pinyin": "...", "meaning": "...", "riddle": "...", "riddle_translation": "...", "hint": "..." },
    { "chars": [...], "pinyin": "...", "meaning": "...", "riddle": "...", "riddle_translation": "...", "hint": "..." }
  ],
  "hidden": {
    "chars": ["字","字","字","字"],
    "pinyin": "xxx xxx xxx xxx",
    "meaning": "English meaning"
  },
  "hiddenPositions": [0, 0, 0, 1],
  "grid": ["字",...16 chars shuffled...],
  "gridGroups": [0,...16 group indices 0-3, same shuffle as grid...]
}`

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const date = req.query.date || new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })

  // Check for existing puzzle
  try {
    const existing = await kv.get(`puzzle:${date}`)
    if (existing && req.query.force !== 'true') {
      return res.status(200).json({ status: 'already cached', date })
    }
  } catch (e) {
    console.error('KV read error:', e)
  }

  // Fetch used 成语 to avoid duplicates
  let usedChengyu = []
  try {
    usedChengyu = (await kv.get('used_chengyu')) || []
  } catch (e) {
    console.error('KV read error (used_chengyu):', e)
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: USER_PROMPT(date, usedChengyu) }],
    })

    const puzzle = JSON.parse(message.content[0].text.trim())

    // Validate the sliding constraint: each solved chengyu must contain the expected hidden char
    for (let i = 0; i < 4; i++) {
      const expectedChar = puzzle.hidden.chars[i]
      const pos = puzzle.hiddenPositions[i]
      if (puzzle.chengyus[i].chars[pos] !== expectedChar) {
        throw new Error(`Sliding constraint violated: chengyus[${i}].chars[${pos}] should be ${expectedChar}`)
      }
    }

    await kv.set(`puzzle:${date}`, puzzle)

    // Record all 5 成语 as used (4 solved + 1 hidden)
    const newEntries = [
      ...puzzle.chengyus.map(cy => cy.chars.join('')),
      puzzle.hidden.chars.join(''),
    ]
    const dedupedUsed = [...new Set([...usedChengyu, ...newEntries])]
    await kv.set('used_chengyu', dedupedUsed)

    return res.status(200).json({ status: 'generated', date })
  } catch (e) {
    console.error('Generation error:', e)
    return res.status(500).json({ error: 'Failed to generate puzzle', detail: e.message })
  }
}
