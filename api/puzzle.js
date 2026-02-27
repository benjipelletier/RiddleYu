// api/puzzle.js — Vercel serverless function
// GET /api/puzzle?date=YYYY-MM-DD
//
// Flow:
// 1. Check Vercel KV cache for today's puzzle
// 2. If cached → return it
// 3. If not → generate via Anthropic API, cache for 24h, return

import Anthropic from '@anthropic-ai/sdk'
import { kv } from '@vercel/kv'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a Chinese language educator specializing in 成语 (chéngyǔ — four-character idioms).
Your job is to generate a daily puzzle for a game called RiddleYu.

You will output ONLY valid JSON, no markdown, no explanation, no preamble.`

const USER_PROMPT = (date) => `Generate a RiddleYu puzzle for ${date}.

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
6. slotMap must map each grid position to its slot (0=first char, 1=second, 2=third, 3=fourth)

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
  "grid": ["字",...16 chars shuffled...],
  "slotMap": [0,...16 slot indices matching grid order...]
}`

export default async function handler(req, res) {
  const date = req.query.date || new Date().toISOString().slice(0, 10)
  const cacheKey = `puzzle:${date}`

  // 1. Check cache
  try {
    const cached = await kv.get(cacheKey)
    if (cached) {
      return res.status(200).json(cached)
    }
  } catch (e) {
    console.error('KV read error:', e)
    // continue to generate
  }

  // 2. Generate
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: USER_PROMPT(date) }],
    })

    const raw = message.content[0].text.trim()
    const puzzle = JSON.parse(raw)

    // 3. Cache for 25 hours (covers timezone drift)
    try {
      await kv.set(cacheKey, puzzle, { ex: 60 * 60 * 25 })
    } catch (e) {
      console.error('KV write error:', e)
    }

    return res.status(200).json(puzzle)
  } catch (e) {
    console.error('Generation error:', e)
    return res.status(500).json({ error: 'Failed to generate puzzle', detail: e.message })
  }
}
