// api/generate.js — called by Vercel cron job daily at midnight ET
// Also callable manually: GET /api/generate?date=YYYY-MM-DD&force=true
// Protected by CRON_SECRET env var (set in Vercel dashboard)

import Anthropic from '@anthropic-ai/sdk'
import { kv } from '@vercel/kv'
import idiomData from '../data/idiom.json' with { type: 'json' }

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a Chinese language educator specializing in 成语 (chéngyǔ — four-character idioms).
Your job is to generate a daily puzzle for a game called RiddleYu.

You will output ONLY valid JSON, no markdown, no explanation, no preamble.`

const STRUCTURE_PROMPT = (date, usedChengyu) => `Generate a RiddleYu puzzle structure for ${date}.
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

**Step 3: Build the grid.**
The grid has 16 characters: all 4 characters from each of the 4 solved 成语 (4 × 4 = 16). Shuffle them randomly.

gridGroups is a parallel array: gridGroups[i] = which solved 成语 index (0–3) the character at grid[i] belongs to. Shuffle grid and gridGroups together (same permutation).

## Rules

- All 5 成语 must be real, well-known Chinese idioms
- The 4 solved 成语 must be suitable for beginner–intermediate learners
- No character may appear in two different solved 成语 (the 16 grid chars must all be distinct)
- The hidden 成語 character in each row must come from a different solved 成语 (one per row)
- Choose 4 solved 成语 with varied themes (not all battle idioms, not all animal idioms)

Output this exact JSON shape (no markdown, no extra text):
{
  "date": "${date}",
  "chengyus": [
    { "chars": ["字","字","字","字"], "pinyin": "xxx xxx xxx xxx", "meaning": "English meaning" },
    { "chars": [...], "pinyin": "...", "meaning": "..." },
    { "chars": [...], "pinyin": "...", "meaning": "..." },
    { "chars": [...], "pinyin": "...", "meaning": "..." }
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

const RIDDLES_PROMPT = (idioms) => `For each of the following Chinese idioms, generate a riddle, translation, and hint.

riddle: A short vivid Chinese sentence (1–2 sentences) describing the MEANING of the idiom as an evocative scene. Do NOT name the idiom or any of its characters. Write your own creative description — do NOT reproduce any classical source text.
riddle_translation: English translation of your riddle text.
hint: A direct English explanation of what the idiom means (1 short sentence).

${idioms.map((item, i) => {
  const ctx = item.derivation ? `\nClassical context (for your reference only, do NOT copy verbatim): "${item.derivation}"` : ''
  return `${i + 1}. ${item.word}${ctx}`
}).join('\n\n')}

Output ONLY this JSON array (no markdown, no extra text):
[
  { "riddle": "...", "riddle_translation": "...", "hint": "..." },
  { "riddle": "...", "riddle_translation": "...", "hint": "..." },
  { "riddle": "...", "riddle_translation": "...", "hint": "..." },
  { "riddle": "...", "riddle_translation": "...", "hint": "..." }
]`

function getDerivation(chars) {
  const word = chars.join('')
  const entry = idiomData.find(e => e.word === word)
  if (!entry || !entry.derivation || entry.derivation === '无') return null
  // Strip trailing Chinese right quotation mark artifact if present
  return entry.derivation.replace(/\u201d$/, '')
}

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
    // Call 1: Generate structure
    const structureMsg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: STRUCTURE_PROMPT(date, usedChengyu) }],
    })
    const structure = JSON.parse(structureMsg.content[0].text.trim())

    // Validate sliding constraint
    for (let i = 0; i < 4; i++) {
      const expectedChar = structure.hidden.chars[i]
      const pos = structure.hiddenPositions[i]
      if (structure.chengyus[i].chars[pos] !== expectedChar) {
        throw new Error(`Sliding constraint violated: chengyus[${i}].chars[${pos}] should be ${expectedChar}`)
      }
    }

    // Dataset lookup: get real classical derivation for each idiom
    const idiomRiddles = structure.chengyus.map(cy => {
      const derivation = getDerivation(cy.chars)
      if (!derivation) {
        console.warn(`No derivation found for ${cy.chars.join('')} — will use fallback`)
      }
      return { word: cy.chars.join(''), derivation: derivation || null }
    })

    // Call 2: Generate riddle translations + hints
    const riddlesMsg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: RIDDLES_PROMPT(idiomRiddles) }],
    })
    const riddles = JSON.parse(riddlesMsg.content[0].text.trim())

    // Merge: combine structure + real riddle texts + translations + hints
    const puzzle = {
      ...structure,
      chengyus: structure.chengyus.map((cy, i) => ({
        ...cy,
        riddle: riddles[i].riddle,
        riddle_translation: riddles[i].riddle_translation,
        hint: riddles[i].hint,
        derivation: idiomRiddles[i].derivation || null,
      })),
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
