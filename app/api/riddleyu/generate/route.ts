import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@vercel/kv'
import { NextRequest } from 'next/server'

const kv = createClient({
  url: process.env.RIDDLEYU_KV_REST_API_URL!,
  token: process.env.RIDDLEYU_KV_REST_API_TOKEN!,
})

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a Chinese language educator specializing in 成语 (chéngyǔ — four-character idioms).
You generate daily puzzles for a deduction game called RiddleYu.
You will output ONLY valid JSON, no markdown, no explanation, no preamble.`

const PUZZLE_PROMPT = (date: string, usedChengyu: string[], forceChengyu: string | null) => `Generate a RiddleYu puzzle for ${date}.
${usedChengyu.length > 0 ? `\nDo NOT use any of these 成语 (already used):\n${usedChengyu.join('、')}\n` : ''}
${forceChengyu ? `\nYou MUST use this specific 成语: ${forceChengyu}\n` : ''}

## Game overview

A 4×4 grid of 16 Chinese characters. 4 form a 成语 (in order), grouped into 4 clusters of 4 characters each. Each cluster contains 1 correct character + 3 semantically related distractors.

The player finds clusters one at a time (in 成语 order). For each cluster:
1. A hint describes the shared theme of the 4 characters
2. Player selects the 4 matching characters from the grid
3. A lesson sentence explains what makes the correct character unique
4. Player picks the correct one

## How to construct the puzzle

**Step 1: Choose a 成语.**
Pick a well-known 成语 suitable for intermediate learners.

**Step 2: For each of the 4 characters, create a cluster of 4.**
Each cluster = 1 correct character + 3 distractors that share a semantic field:
- All 4 should genuinely relate to the same concept — they must ALL be valid examples of the category
- The distractors should be close enough that the player needs the lesson to distinguish
- Distractors must be REAL, convincing members of the category — never filler characters that obviously don't belong
- CRITICAL: All 16 characters across all 4 clusters must be completely distinct — no character may appear in more than one cluster. Double-check this before outputting.

**Step 3: Write hints (one per cluster).**
Use first-person riddle style from the perspective of the characters: "我们都能___" or "我们都是___" or "我们都和___有关".
The hint should be a playful one-sentence riddle that describes what all 4 characters in the cluster share. It must be clear enough to find them in the grid.

**Step 4: Write lessons (one per cluster).**
Use first-person style from the perspective of the correct character.
The lesson is 1–2 sentences that: (1) briefly names what all 4 share, (2) explains YOUR specific meaning and why it fits this idiom position, (3) names at least 2 of the other 3 characters and why they don't fit.

**Step 5: Write a breakdown (one per cluster).**
Write 2–3 sentences in Chinese, third-person, for the result screen. Explain all four characters' meanings and differences, then conclude with why the correct one fits this specific idiom.

**Step 6: Write a story summary.**
1–2 sentences in Chinese explaining the idiom's origin and meaning.

## Output format

Output this exact JSON shape (no markdown, no extra text):
{
  "date": "${date}",
  "chengyu": {
    "chars": ["字","字","字","字"],
    "pinyin": "pīnyīn",
    "meaning": "English meaning"
  },
  "story": "Chinese story summary",
  "grid": ["字",...16 chars shuffled...],
  "clusters": [
    {
      "hint": "我们都能/都是/都和___有关（第一人称谜语）",
      "chars": ["字","字","字","字"],
      "answer": "字",
      "lesson": "我是/我能/我的特点是___（第一人称，对比其他三个字，解释为什么我在成语里）",
      "breakdown": "第三人称，2-3句，解析这四个字的区别，说明为什么答案字适合这个成语位置"
    },
    ...4 clusters total...
  ]
}`

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const date = request.nextUrl.searchParams.get('date') ||
    new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
  const force = request.nextUrl.searchParams.get('force') === 'true'

  let existing: any = null
  try {
    existing = await kv.get(`puzzle:${date}`)
    if (existing && !force) {
      return Response.json({ status: 'already cached', date })
    }
  } catch (e) {
    console.error('KV read error:', e)
  }

  const forceChengyu = (force && existing?.chengyu)
    ? existing.chengyu.chars.join('')
    : null

  let usedChengyu: string[] = []
  try {
    usedChengyu = (await kv.get('used_chengyu')) || []
  } catch (e) {
    console.error('KV read error (used_chengyu):', e)
  }

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: PUZZLE_PROMPT(date, usedChengyu, forceChengyu) }],
    })
    const puzzle = JSON.parse((msg.content[0] as any).text.trim())

    // Validation
    if (!puzzle.chengyu?.chars || puzzle.chengyu.chars.length !== 4) {
      throw new Error('Invalid chengyu structure')
    }
    if (!puzzle.clusters || puzzle.clusters.length !== 4) {
      throw new Error('Need exactly 4 clusters')
    }
    if (!puzzle.grid || puzzle.grid.length !== 16) {
      throw new Error('Grid must have exactly 16 characters')
    }
    if (new Set(puzzle.grid).size !== 16) {
      throw new Error('Grid has duplicate characters')
    }
    for (let i = 0; i < 4; i++) {
      const c = puzzle.clusters[i]
      if (!c.chars || c.chars.length !== 4) {
        throw new Error(`Cluster ${i} must have exactly 4 characters`)
      }
      if (!c.chars.includes(c.answer)) {
        throw new Error(`Cluster ${i} answer must be in its chars`)
      }
      if (c.answer !== puzzle.chengyu.chars[i]) {
        throw new Error(`Cluster ${i} answer must match chengyu position ${i}`)
      }
      if (!c.breakdown) {
        throw new Error(`Cluster ${i} missing breakdown`)
      }
    }

    await kv.set(`puzzle:${date}`, puzzle)

    const newEntry = puzzle.chengyu.chars.join('')
    if (!usedChengyu.includes(newEntry)) {
      await kv.set('used_chengyu', [...usedChengyu, newEntry])
    }

    return Response.json({ status: 'generated', date, chengyu: newEntry })
  } catch (e: any) {
    console.error('Generation error:', e)
    return Response.json({ error: 'Failed to generate puzzle', detail: e.message }, { status: 500 })
  }
}
