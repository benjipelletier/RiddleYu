# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install    # install dependencies
npm run dev    # start Vite dev server (uses hardcoded puzzles locally)
```

There are no tests. Deployment is to Vercel via GitHub push.

## What this is

A daily 成语 (Chinese four-character idiom) puzzle game, inspired by Wordle. The player solves 4 riddles to identify 4 characters, chains them together, and uncovers today's idiom. Built for people learning Chinese at a beginner level.

## Game mechanics

1. A 4×4 grid of 16 Chinese characters is shown — shuffled, no visible grouping
2. There are 4 riddles, one per character position in the 成语 (slot 0, 1, 2, 3)
3. Riddles are revealed one at a time. Each riddle describes a **semantic category** that applies to multiple characters in the grid (e.g. "I am an animal" → 马, 龙, 虎, 牛 are all in the grid)
4. The player clicks a character from the grid that matches the current riddle
5. That character locks into the chain (slot 0 → 1 → 2 → 3), and the next riddle appears
6. Once all 4 slots are filled, the player submits
7. Feedback per character: 🟩 green = correct char correct slot, 🟨 yellow = correct char wrong slot, ⬜ grey = not in 成语
8. 5 lives total. Wrong attempt resets the chain; player tries again with feedback visible

## Key data concept: slotMap

Each of the 16 grid characters belongs to exactly one slot (0–3). `slotMap[i]` tells which slot `grid[i]` is an answer or imposter for. This controls which characters are selectable — only characters whose `slotMap` value equals `currentSlot` are clickable at any given time.

Example for 马到成功:
- Slot 0 (马): real=马, imposters=龙,虎,牛 → all have slotMap value 0
- Slot 1 (到): real=到, imposters=来,去,行 → all have slotMap value 1

## Puzzle data shape

```json
{
  "date": "YYYY-MM-DD",
  "chengyu": ["字","字","字","字"],
  "pinyin": "mǎ dào chéng gōng",
  "meaning": "English meaning",
  "origin": "One sentence historical context",
  "riddles": [
    { "text": "Chinese riddle (describes the category)", "hint": "English hint for hint button" },
    { "text": "...", "hint": "..." },
    { "text": "...", "hint": "..." },
    { "text": "...", "hint": "..." }
  ],
  "grid": ["字", ...16 chars total, shuffled],
  "slotMap": [0, 1, 2, ...16 slot indices matching grid positions]
}
```

## Tech stack

- **Frontend**: React + Vite
- **Hosting**: Vercel
- **Daily puzzle API**: Vercel serverless function (`/api/puzzle.js`)
- **Caching**: Vercel KV (Redis) — puzzle generated once per day, cached 25h
- **AI generation**: Anthropic API (`claude-sonnet-4-20250514`)

## Current state

- Hardcoded puzzles in `src/puzzles.js` (2 puzzles for dev/testing)
- AI generation via Anthropic API is built in `api/puzzle.js` but not yet wired to the frontend
- The frontend currently calls `getPuzzleForDate()` synchronously from hardcoded data
- To switch to AI: make `getPuzzleForDate` async and fetch from `/api/puzzle?date=YYYY-MM-DD`

## File structure

```
riddleyu/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Routes between intro/game/result phases
│   ├── index.css             # CSS variables, global reset
│   ├── puzzles.js            # Hardcoded puzzle data + getPuzzleForDate()
│   ├── hooks/
│   │   └── useGame.js        # All game logic (state, selection, feedback, lives)
│   └── components/
│       ├── IntroScreen.jsx   # How-to-play + start button
│       ├── GameScreen.jsx    # Main game: header, history, chain, riddle, grid, actions
│       └── ResultScreen.jsx  # End screen: 成语 reveal, meaning, attempt history
├── api/
│   └── puzzle.js             # Vercel serverless: generate + cache daily puzzle
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── CLAUDE.md
```

## Design aesthetic

Ink-on-paper feel. Warm cream tones (`#f5f0e8`). Noto Serif SC for Chinese characters. Playfair Display for English labels. Red seal stamp decoration. Clean, focused, no clutter. Feels handcrafted rather than digital. See `index.css` for CSS variables.

All styles are inline JS objects defined in a `const s = { ... }` block at the bottom of each component file.

## Things to keep in mind

- This is a learning game — riddles and feedback should feel educational, not punishing
- The grid must always look scrambled — never reveal column groupings visually
- Chinese characters should always use Noto Serif SC at generous size
- The hint button exists so beginners aren't stuck — using it should feel fine, not penalised
- Yellow feedback is important: "you found a real character but put it in the wrong slot" — make sure this is clearly communicated
