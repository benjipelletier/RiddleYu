// api/generate.js — called by Vercel cron job daily at midnight UTC
// Also callable manually: GET /api/generate?date=YYYY-MM-DD
// Protected by CRON_SECRET env var (set in Vercel dashboard)

import { kv } from '@vercel/kv'
import { generateAndCache } from './_generate.js'

export default async function handler(req, res) {
  // Vercel cron sets Authorization: Bearer <CRON_SECRET>
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const date = req.query.date || new Date().toISOString().slice(0, 10)

  // Idempotent — skip if already cached
  try {
    const existing = await kv.get(`puzzle:${date}`)
    if (existing) {
      return res.status(200).json({ status: 'already cached', date })
    }
  } catch (e) {
    console.error('KV read error:', e)
  }

  try {
    await generateAndCache(date)
    return res.status(200).json({ status: 'generated', date })
  } catch (e) {
    console.error('Generation error:', e)
    return res.status(500).json({ error: 'Failed to generate puzzle', detail: e.message })
  }
}
