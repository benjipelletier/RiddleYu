# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install    # install dependencies
npm run dev    # start Vite dev server (uses hardcoded puzzles locally)
```

There are no tests. Deployment is to Vercel via GitHub push.

## What this is

A daily 成语 (Chinese four-character idiom) puzzle game with two phases. The player solves 4 idiom riddles (Connections-style), then slides the rows to reveal a hidden 5th 成语. Built for people learning Chinese at a beginner to intermediate level.

## Game phases

### Phase 1 — Connections (`connections`)

1. A 4×4 grid of 16 Chinese characters is shown (all 4 solved 成语's characters shuffled together)
2. One riddle at a time describes the **meaning/scene** of a whole 成语
3. The player picks 4 characters from the grid they believe spell that 成语
4. Submit: if all 4 belong to that 成语's group → correct, locked in; otherwise → lose a life
5. Repeat for all 4 成语
6. 5 lives shared across the whole connections phase

### Phase 2 — Sliding (`sliding`)

1. The 4 solved 成语 are shown as horizontal rows
2. The player drags each row left/right to select which character is "active" for that row
3. The 4 active characters (one per row, in row order) form the hidden 5th 成语
4. Partial feedback: active character shown in yellow if correct for that row, green when all 4 match
5. Win auto-detected when all 4 active chars match `hidden.chars`

### Phase 3 — Result (`result`)

Shows all 4 solved 成语 + the hidden 5th with meanings. Share button.

## Key data concept: gridGroups

Each of the 16 grid characters belongs to exactly one solved 成语 (0–3). `gridGroups[i]` is the group index for `grid[i]`. During connections phase, correctness is checked by group membership, not character values — this handles any potential duplicate characters across idioms.

## Key data concept: hiddenPositions

`hiddenPositions[i]` is the index (0–3) within `chengyus[i].chars` that contributes to the hidden 成语. Used in the sliding phase to know the target offset per row.

Example for hidden 一马当先:
- 一石二鸟 → 一 is at position 0 → hiddenPositions[0] = 0
- 马到成功 → 马 is at position 0 → hiddenPositions[1] = 0
- 当仁不让 → 当 is at position 0 → hiddenPositions[2] = 0
- 争先恐后 → 先 is at position 1 → hiddenPositions[3] = 1

## Puzzle data shape

```json
{
  "date": "YYYY-MM-DD",
  "chengyus": [
    {
      "chars": ["字","字","字","字"],
      "pinyin": "xxx xxx xxx xxx",
      "meaning": "English meaning",
      "riddle": "Chinese riddle describing the whole idiom's meaning/scene",
      "riddle_translation": "English translation of the riddle",
      "hint": "English hint shown when player taps hint button"
    },
    { ... },
    { ... },
    { ... }
  ],
  "hidden": {
    "chars": ["字","字","字","字"],
    "pinyin": "xxx xxx xxx xxx",
    "meaning": "English meaning"
  },
  "hiddenPositions": [0, 0, 0, 1],
  "grid": ["字", ...16 chars total, shuffled],
  "gridGroups": [0, ...16 group indices 0–3, same shuffle as grid]
}
```

## Tech stack

- **Frontend**: React + Vite
- **Hosting**: Vercel
- **Daily puzzle API**: Vercel serverless function (`/api/puzzle.js`)
- **Caching**: Vercel KV (Redis) — puzzle generated once per day
- **AI generation**: Anthropic API (`claude-sonnet-4-20250514`)

## Current state

- 1 hardcoded puzzle in `src/puzzles.js` for dev/testing (date: 2026-03-19)
- AI generation via Anthropic API is in `api/generate.js`
- `getPuzzleForDate()` in dev uses hardcoded data; in production fetches from `/api/puzzle?date=YYYY-MM-DD`
- To manually trigger puzzle generation: `GET /api/generate?date=YYYY-MM-DD&force=true` with `Authorization: Bearer CRON_SECRET`
- Old KV entries (pre-redesign, single-成语 format) will break the new frontend — flush them before going live

## File structure

```
riddleyu/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Routes between intro/connections/sliding/result phases
│   ├── index.css             # CSS variables, global reset
│   ├── puzzles.js            # Hardcoded puzzle data + getPuzzleForDate()
│   ├── hooks/
│   │   └── useGame.js        # All game logic (state, selection, feedback, lives, sliding)
│   └── components/
│       ├── IntroScreen.jsx   # How-to-play + start button
│       ├── GameScreen.jsx    # Connections phase: riddle, 16-char grid, selection, submit
│       ├── SlidingScreen.jsx # Sliding phase: draggable rows, forming preview, win detection
│       └── ResultScreen.jsx  # End screen: all 5 成语 revealed, share button
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

Ink-on-paper feel. Warm cream tones (`#f5f0e8`). Noto Serif SC for Chinese characters. Playfair Display for English labels. Red seal stamp decoration. Clean, focused, no clutter. Feels handcrafted rather than digital. See `index.css` for CSS variables.

All styles are inline JS objects defined in a `const s = { ... }` block at the bottom of each component file.

## Riddle design

Each solved 成语 has three progressive reveal fields:

- **`riddle`**: Real classical Chinese derivation text from the bundled idiom dataset (`data/idiom.json`, source: pwxcoo/chinese-xinhua, CC0). E.g. `《论语·卫灵公》：子曰：'当仁，不让于师。'`
- **`riddle_translation`**: AI-generated English translation of the classical text. Still indirect — translates the story, doesn't name the idiom.
- **`hint`**: Direct English meaning of the idiom (gives it away — that's fine, it's a learning game).

### Reveal flow (UI)

```
Level 0: riddle (classical Chinese) only + "译 · translate" button
Level 1: + riddle_translation shown + "提示 · hint" button
Level 2: + hint shown, no button
```

### If an idiom has no classical derivation

If `derivation` is `"无"` in the dataset, the `riddle` field uses an AI-written vivid Chinese scene as a fallback (same style as the old riddles). Log a warning during generation.

## Things to keep in mind

- The 16 grid characters must all be distinct (no character appears in two different solved 成语)
- The sliding constraint must hold: `chengyus[i].chars[hiddenPositions[i]] === hidden.chars[i]` for all i
- `gridGroups` must be shuffled in the same permutation as `grid`
- This is a learning game — riddles should feel poetic and educational, not punishing
- Chinese characters should always use Noto Serif SC at generous size
- The hint button exists so beginners aren't stuck — using it should feel fine, not penalised
- `used_chengyu` in KV tracks all 5 成语 per day to prevent repeats across any slot
