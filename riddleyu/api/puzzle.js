// api/puzzle.js — serves today's puzzle from KV cache
// Pre-populated each day by the cron job (api/generate.js)

import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  const date = req.query.date || new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })

  try {
    const puzzle = await kv.get(`puzzle:${date}`)
    if (puzzle) return res.status(200).json(puzzle)

    // Cron hasn't run yet — serve yesterday's puzzle
    const yesterday = new Date(date)
    yesterday.setDate(yesterday.getDate() - 1)
    const prev = await kv.get(`puzzle:${yesterday.toLocaleDateString('en-CA', { timeZone: 'America/New_York' })}`)
    if (prev) return res.status(200).json(prev)

    return res.status(503).json({ error: 'No puzzle available yet, check back soon' })
  } catch (e) {
    console.error('KV read error:', e)
    return res.status(500).json({ error: 'Storage error', detail: e.message })
  }
}
