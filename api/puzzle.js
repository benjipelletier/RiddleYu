// api/puzzle.js — serves today's puzzle from KV cache
// Normally pre-populated by the midnight cron job (api/generate.js)
// Falls back to generating on-demand if the cron hasn't run yet

import { kv } from '@vercel/kv'
import { generateAndCache } from './_generate.js'

export default async function handler(req, res) {
  const date = req.query.date || new Date().toISOString().slice(0, 10)

  try {
    const cached = await kv.get(`puzzle:${date}`)
    if (cached) {
      return res.status(200).json(cached)
    }
  } catch (e) {
    console.error('KV read error:', e)
  }

  // Cron hasn't run yet (e.g. first deploy) — generate on demand
  try {
    const puzzle = await generateAndCache(date)
    return res.status(200).json(puzzle)
  } catch (e) {
    console.error('Generation error:', e)
    return res.status(500).json({ error: 'Failed to generate puzzle', detail: e.message })
  }
}
