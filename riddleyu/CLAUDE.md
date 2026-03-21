# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install    # install dependencies
npm run dev    # start Vite dev server (uses hardcoded puzzles locally)
```

There are no tests. Deployment is to Vercel via GitHub push.

## What this is

A daily 成语 (Chinese four-character idiom) puzzle game. The player deduces which 4 of 16 characters form today's 成语 by cross-referencing claims (true for correct characters, false for distractors). Built for people learning Chinese at a beginner to intermediate level.

## Game mechanic

- 16 characters in a 4×4 grid: 4 are 在 (in the idiom), 12 are 不在 (distractors)
- Position 0 is pre-revealed with its claim
- Player taps a character, declares 在 (in) or 不在 (not in)
- Correct declarations reveal that character's claim
- Wrong guesses: card stays closed, yellow tile in share result
- Discovery enforced in position order (0→1→2→3)
- No lives system — wrong guesses only affect share score

## Key data concept: characters map

`characters[char]` contains `{ zai: boolean, position?: number, claim: string }`. The `zai` field indicates if the character is in the idiom. Claims from 在 characters are TRUE; claims from 不在 characters are FALSE but plausible.

## Puzzle data shape

```json
{
  "date": "YYYY-MM-DD",
  "chengyu": {
    "chars": ["字","字","字","字"],
    "pinyin": "xxx",
    "meaning": "English meaning"
  },
  "story": "Chinese story summary",
  "grid": ["字", ...16 chars],
  "characters": {
    "字": { "zai": true, "position": 0, "claim": "Chinese claim" },
    "字": { "zai": false, "claim": "Chinese claim" },
    ...
  }
}
```

## Tech stack

- **Frontend**: React + Vite
- **Hosting**: Vercel
- **Daily puzzle API**: Vercel serverless function (`/api/puzzle.js`)
- **Caching**: Vercel KV (Redis) — puzzle generated once per day
- **AI generation**: Anthropic API (`claude-sonnet-4-20250514`)

## Current state

- 1 hardcoded puzzle in `src/puzzles.js` for dev (马到成功)
- AI generation via Anthropic API is in `api/generate.js`
- `getPuzzleForDate()` uses hardcoded data in dev, fetches from `/api/puzzle?date=YYYY-MM-DD` in production
- To manually trigger puzzle generation: `GET /api/generate?date=YYYY-MM-DD&force=true` with `Authorization: Bearer CRON_SECRET`
- `force=true` regenerates claims/distractors for the SAME 成语 (for prompt tweaking)

## File structure

```
riddleyu/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Routes between intro/game/result phases
│   ├── index.css             # CSS variables, global reset, animations
│   ├── puzzles.js            # Hardcoded puzzle data + getPuzzleForDate()
│   ├── hooks/
│   │   └── useGame.js        # Game state: selected, opened, claims, declarations, win detection
│   └── components/
│       ├── IntroScreen.jsx   # How-to-play + start button
│       ├── GameScreen.jsx    # Claim bar + grid + action bar
│       ├── ClaimBar.jsx      # Current claim display + swipeable history
│       ├── CharacterGrid.jsx # 4×4 grid of character cards
│       └── ResultScreen.jsx  # 成语 reveal + share button
├── api/
│   ├── puzzle.js             # Vercel serverless: serve cached puzzle from KV
│   └── generate.js           # Vercel serverless: generate puzzle via Claude + cache in KV
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── CLAUDE.md
```

## Design aesthetic

Ink-on-paper feel. Warm cream tones (#f5f0e8). Noto Serif SC for Chinese characters. Playfair Display for English labels. Red accent for selections. All styles as inline JS objects in `const s = { ... }` blocks. See `index.css` for CSS variables.

## Things to keep in mind

- All 16 grid characters must be distinct
- Claims from 在 characters are TRUE, from 不在 characters are FALSE
- Position-order discovery: player must find positions 0→1→2→3 in order
- This is a learning game — claims teach semantic distinctions between similar characters
- Chinese characters should use Noto Serif SC at generous size
- `used_chengyu` in KV tracks all used 成语 to prevent repeats
