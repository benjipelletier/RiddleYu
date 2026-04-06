import { createClient } from '@vercel/kv'
import { NextRequest } from 'next/server'

const kv = createClient({
  url: process.env.RIDDLEYU_KV_REST_API_URL!,
  token: process.env.RIDDLEYU_KV_REST_API_TOKEN!,
})

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date') ||
    new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })

  try {
    const puzzle = await kv.get(`puzzle:${date}`)
    if (puzzle) return Response.json(puzzle)

    const yesterday = new Date(date)
    yesterday.setDate(yesterday.getDate() - 1)
    const prev = await kv.get(`puzzle:${yesterday.toLocaleDateString('en-CA', { timeZone: 'America/New_York' })}`)
    if (prev) return Response.json(prev)

    return Response.json({ error: 'No puzzle available yet, check back soon' }, { status: 503 })
  } catch (e: any) {
    console.error('KV read error:', e)
    return Response.json({ error: 'Storage error', detail: e.message }, { status: 500 })
  }
}
