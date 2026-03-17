// api/generate.js — called by Vercel cron job daily at midnight ET
// Also callable manually: GET /api/generate?date=YYYY-MM-DD&force=true
// Protected by CRON_SECRET env var (set in Vercel dashboard)

import Anthropic from '@anthropic-ai/sdk'
import { kv } from '@vercel/kv'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a Chinese language educator specializing in 成语 (chéngyǔ — four-character idioms).
Your job is to generate a daily puzzle for a game called RiddleYu.

You will output ONLY valid JSON, no markdown, no explanation, no preamble.`

const USER_PROMPT = (date, usedChengyu, fixedChengyu) => `Generate a RiddleYu puzzle for ${date}.
${fixedChengyu ? `\nYou MUST use this exact 成语: ${fixedChengyu.join('')} (${fixedChengyu.join('、')}). Do not choose a different one.\n` : ''}${!fixedChengyu && usedChengyu.length > 0 ? `\nDo NOT use any of these 成语, they have already been used: ${usedChengyu.join('、')}\n` : ''}
Rules:
1. ${fixedChengyu ? `Use the 成语 ${fixedChengyu.join('')} specified above.` : 'Choose a 成语 that is interesting, learnable, and not too obscure. Suitable for beginners to intermediate learners.'}

2. For each of the 4 characters, choose exactly 3 imposter characters. Imposters must:
   - Be common, recognizable Chinese characters
   - NOT appear elsewhere in the 成语
   - For TYPE C (场景谜): same semantic category as the real character
   - For TYPE A (字谜) / TYPE B (形谜): visually similar to the real character

3. Write a riddle for each character using ONE of these three types:

TYPE A: 字谜 (Character Composition)
Use when: the character has 2+ clearly decomposable components.
Format: a short poetic sentence describing how the parts combine — without naming the character.
Examples:
  - 功: text="出力又出工，缺一不可。" hint="工 (work) + 力 (strength) = 功"
  - 石: text="山崖下藏着一张嘴，坚硬千年。" hint="厂 (cliff) + 口 (mouth) = 石"
  - 到: text="持刀而至，方才到达。" hint="至 (to reach) + 刂 (knife) = 到"

TYPE B: 形谜 (Visual/Shape Riddle)
Use when: the character is visually simple — few strokes, geometric.
Format: describe what you see without naming it.
Examples:
  - 一: text="万物之始，我只有一笔，横贯天地。" hint="A single horizontal line"
  - 二: text="比一多一笔，比三少一笔，两横平行。" hint="Two horizontal strokes"

TYPE C: 场景谜 (Scene Riddle)
Format: a vivid, specific scenario — NOT a broad category ("I am an animal" is forbidden).
Examples:
  - 马: text="皇帝出征，骑着我才能打天下。" hint="A powerful animal ridden by warriors and emperors"
  - 鸟: text="春天清晨，我在树梢叫醒你。" hint="A feathered creature that sings at dawn"

4. For each riddle, choose ONE emoji that visually represents or symbolizes the character.
   - It must NOT be a Chinese character
   - It should be intuitive — someone should look at it and vaguely sense what character it stands for
   - Use it consistently in the story and witnesses
   Examples: 马→🐎, 到→🏁, 成→⚔️, 功→🌟, 石→🗿, 鸟→🐦, 水→💧, 山→⛰️, 火→🔥, 一→☝️

5. Write 2–3 witness testimonies for each riddle.
   - Each witness is a named character from the story (e.g. 将军 · General Wei)
   - Each testimony hints at the character WITHOUT ever spelling it out
   - Replace the target character with the riddle's emoji in the testimony text
   - First witness: the protagonist or a key figure from the origin story
   - Second witness: a chronicler, scholar, or observer
   - Third (optional): an ordinary person, a bystander, or someone unexpected
   - Testimonies in Chinese with English translations — 1–2 sentences each

6. Write a story canvas: 4 lines that together form a mini narrative.
   - Each line uses exactly ONE of the 4 chengyu characters (in order)
   - The character must appear naturally in the sentence
   - Lines should flow as a coherent story (often historical or legendary)
   - before/after fields are the text surrounding the character slot

7. The grid array must contain all 16 characters (4 real + 12 imposters) shuffled randomly.
   slotMap[i] tells which slot (0–3) grid[i] belongs to.

Output this exact JSON shape:
{
  "date": "${date}",
  "chengyu": ["字","字","字","字"],
  "pinyin": "xxx xxx xxx xxx",
  "meaning": "English meaning of the idiom",
  "origin": "One sentence about the origin or historical context in English",
  "origin_zh": "同一个故事，用简单的中文写，一到两句话",
  "story": [
    { "before": "text before char", "char": "字", "after": "text after char" },
    { "before": "...", "char": "字", "after": "..." },
    { "before": "...", "char": "字", "after": "..." },
    { "before": "...", "char": "字", "after": "..." }
  ],
  "riddles": [
    {
      "emoji": "🐎",
      "type": "字谜|形谜|场景谜",
      "text": "Chinese riddle for char 1",
      "translation": "English translation of the riddle",
      "hint": "English hint",
      "witnesses": [
        { "speaker": "将军 · General Wei", "text": "「Chinese testimony using 🐎 in place of the character」", "translation": "English translation" },
        { "speaker": "史书 · The Chronicle", "text": "「...」", "translation": "..." },
        { "speaker": "将士们 · The Soldiers", "text": "「...」", "translation": "..." }
      ]
    },
    {
      "emoji": "🏁",
      "type": "...",
      "text": "...",
      "translation": "...",
      "hint": "...",
      "witnesses": [
        { "speaker": "...", "text": "「...」", "translation": "..." },
        { "speaker": "...", "text": "「...」", "translation": "..." }
      ]
    },
    { "emoji": "...", "type": "...", "text": "...", "translation": "...", "hint": "...", "witnesses": [...] },
    { "emoji": "...", "type": "...", "text": "...", "translation": "...", "hint": "...", "witnesses": [...] }
  ],
  "grid": ["字",...16 chars shuffled...],
  "slotMap": [0,1,2,...16 slot indices...]
}`

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const date = req.query.date || new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })

  let fixedChengyu = null
  let usedChengyu = []

  try {
    const existing = await kv.get(`puzzle:${date}`)
    if (existing) {
      if (req.query.force !== 'true') {
        return res.status(200).json({ status: 'already cached', date })
      }
      fixedChengyu = existing.chengyu
    }
  } catch (e) {
    console.error('KV read error:', e)
  }

  if (!fixedChengyu) {
    try {
      usedChengyu = (await kv.get('used_chengyu')) || []
    } catch (e) {
      console.error('KV read error (used_chengyu):', e)
    }
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: USER_PROMPT(date, usedChengyu, fixedChengyu) }],
    })

    const puzzle = JSON.parse(message.content[0].text.trim())

    await kv.set(`puzzle:${date}`, puzzle)
    if (!fixedChengyu) {
      await kv.set('used_chengyu', [...usedChengyu, puzzle.chengyu.join('')])
    }

    return res.status(200).json({ status: 'generated', date })
  } catch (e) {
    console.error('Generation error:', e)
    return res.status(500).json({ error: 'Failed to generate puzzle', detail: e.message })
  }
}
