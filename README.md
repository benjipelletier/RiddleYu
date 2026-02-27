# 謎語 RiddleYu

A daily 成语 puzzle game. Solve 4 riddles, chain the characters, uncover the idiom.

## How it works

- Each day a new 成语 is generated via the Anthropic API
- The API is called once (on first load of the day), the result cached in Vercel KV for 25 hours
- Everyone gets the same puzzle for the day

## Local development

```bash
npm install
npm run dev
```

The app will use hardcoded puzzles locally (see `src/puzzles.js`).

## Deploying to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
gh repo create riddleyu --public --push
```

### 2. Deploy on Vercel
- Go to vercel.com → New Project → import your repo
- Framework: Vite

### 3. Add environment variables in Vercel dashboard
```
ANTHROPIC_API_KEY=your_key_here
```

### 4. Add Vercel KV
- In Vercel dashboard → Storage → Create KV database
- Connect it to your project (auto-adds `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` env vars)

### 5. Install API dependencies
```bash
npm install @anthropic-ai/sdk @vercel/kv
```

## Switching from hardcoded to AI puzzles

In `src/puzzles.js`, swap `getPuzzleForDate` to fetch from the API:

```js
export async function getPuzzleForDate(dateStr) {
  const res = await fetch(`/api/puzzle?date=${dateStr}`)
  return res.json()
}
```

Then update `src/hooks/useGame.js` to await the async call:
```js
useEffect(() => {
  getPuzzleForDate(getTodayString()).then(setPuzzle)
}, [])
```

## Puzzle data shape

```json
{
  "date": "YYYY-MM-DD",
  "chengyu": ["字","字","字","字"],
  "pinyin": "...",
  "meaning": "English meaning",
  "origin": "One sentence origin story",
  "riddles": [
    { "text": "Chinese riddle", "hint": "English hint" },
    ...x4
  ],
  "grid": ["字", ...16 chars shuffled],
  "slotMap": [0, ...16 slot indices]
}
```

## Adding more hardcoded puzzles

Edit `src/puzzles.js` and add to the `HARDCODED_PUZZLES` array.
Each puzzle needs: chengyu, pinyin, meaning, origin, 4 riddles, grid (16 chars), slotMap.
