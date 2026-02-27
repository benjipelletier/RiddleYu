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
${usedChengyu.length > 0 ? `\nDo NOT use any of these 成语, they have already been used: ${usedChengyu.join('、')}\n` : ''}
Rules:
1. Choose a 成语 that is interesting, learnable, and not too obscure. Suitable for beginners to intermediate learners.
2. For each of the 4 characters, choose exactly 3 imposter characters. Imposters must:
   - Belong to the same semantic category as the real character (e.g. if real char is 马 an animal, imposters are also animals)
   - Be common, recognizable Chinese characters
   - NOT appear elsewhere in the 成语
3. Write a riddle in Chinese for each character. The riddle must:
   - Describe the semantic category that both the real char AND its imposters belong to
   - Be solvable by a beginner with a dictionary
   - Be poetic and interesting, not just "我是一种动物"
   - NOT directly reveal the character
4. Write an English hint for each riddle (for the hint button)
5. The grid array must contain all 16 characters (4 real + 12 imposters) shuffled randomly

Output this exact JSON shape:
{
  "date": "${date}",
  "chengyu": ["字","字","字","字"],
  "pinyin": "xxx xxx xxx xxx",
  "meaning": "English meaning of the idiom",
  "origin": "One sentence about the origin or historical context",
  "riddles": [
    { "text": "Chinese riddle for char 1", "hint": "English hint" },
    { "text": "Chinese riddle for char 2", "hint": "English hint" },
    { "text": "Chinese riddle for char 3", "hint": "English hint" },
    { "text": "Chinese riddle for char 4", "hint": "English hint" }
  ],
  "grid": ["字",...16 chars shuffled...]
}`

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const date = req.query.date || new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })

  // Idempotent — skip if already cached (unless ?force=true)
  if (req.query.force !== 'true') {
    try {
      const existing = await kv.get(`puzzle:${date}`)
      if (existing) return res.status(200).json({ status: 'already cached', date })
    } catch (e) {
      console.error('KV read error:', e)
    }
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
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: USER_PROMPT(date, usedChengyu) }],
    })

    const puzzle = JSON.parse(message.content[0].text.trim())

    await kv.set(`puzzle:${date}`, puzzle, { ex: 60 * 60 * 25 })
    await kv.set('used_chengyu', [...usedChengyu, puzzle.chengyu.join('')])

    return res.status(200).json({ status: 'generated', date })
  } catch (e) {
    console.error('Generation error:', e)
    return res.status(500).json({ error: 'Failed to generate puzzle', detail: e.message })
  }
}
