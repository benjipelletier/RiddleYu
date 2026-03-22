# Zhùjiě (注解) — Design Spec

## Overview

A Genius-style annotation layer for Chinese native content (songs, TV shows, podcasts). Users paste Chinese text, get a content map via LLM Pass 1, then lazily annotate individual lines on click via Pass 2. Annotations are cached in Postgres so repeated access is instant.

Part of the benji.codes suite.

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Hosting:** Vercel
- **Database:** Neon Postgres (content cache + line annotations)
- **LLM:** Anthropic SDK, `claude-opus-4-6` for both passes
- **Styling:** Inline JS style objects + CSS variables (no Tailwind — consistent with monorepo)
- **Fonts:** Noto Serif SC (Chinese), JetBrains Mono (UI/monospace), Inter (body)

## Architecture

### Two-Pass LLM Pipeline with Lazy Line Annotation

**Pass 1 — Content Map (on paste):**
User pastes content → `POST /api/content-map` → LLM analyzes full text → returns structured content map (themes, motifs, register, cultural references, vocabulary threads). Stored in Postgres keyed by SHA-256 of normalized text.

**Pass 2 — Line Annotation (on click):**
User clicks a line → `POST /api/annotate-line` → checks cache → if miss, sends content map + full text + target line + ±3 surrounding lines to LLM → returns annotation → caches in Postgres.

This means initial load is one API call. Users only pay (in time and cost) for lines they actually study.

### Data Flow

```
Paste text → POST /api/content-map
  ├─ If cached (by content hash): return instantly
  └─ If new: LLM Pass 1 → store → return
     → Navigate to /content/[hash]
     → Render line list + summary card

Click line N → POST /api/annotate-line { contentHash, lineIndex }
  ├─ If cached: return instantly
  └─ If new: LLM Pass 2 → store → return
     → Render annotation view
```

### API Design

**`POST /api/content-map`**
- Body: `{ text, title?, artist?, contentType? }`
- Auto-detects metadata from common formats (e.g., "周杰伦 - 晴天" as first line)
- Normalizes text, computes SHA-256 hash
- Response: `{ contentHash, contentMap, lines: string[], metadata: { title, artist, contentType, languageVariant } }`

**`POST /api/annotate-line`**
- Body: `{ contentHash, lineIndex }`
- Fetches content map + full text from `contents` table
- Response: full annotation object (see schema below)

### Database Schema

**`contents` table:**
| Column | Type | Notes |
|--------|------|-------|
| content_hash | TEXT PK | SHA-256 of normalized input |
| source_text | TEXT | Original pasted text |
| content_map | JSONB | Pass 1 output |
| title | TEXT | Auto-detected or user-provided |
| artist | TEXT | Auto-detected or user-provided |
| content_type | TEXT | "song" / "tv" / "podcast" / "other" |
| language_variant | TEXT | "simplified" / "traditional" |
| created_at | TIMESTAMPTZ | |

**`line_annotations` table:**
| Column | Type | Notes |
|--------|------|-------|
| content_hash | TEXT | FK → contents |
| line_index | INT | 0-based |
| annotation | JSONB | Pass 2 output |
| version | INT | For future re-annotation with improved prompts |
| created_at | TIMESTAMPTZ | |
| | | PK: (content_hash, line_index) |

Cache is keyed to content hash, so identical content from different users hits the same cache.

## Annotation Schema

### Content Map (Pass 1 Output)

```json
{
  "summary": "2-3 sentence thematic/emotional summary",
  "motifs": ["recurring images, metaphors, thematic threads"],
  "structural_patterns": ["parallel lines, repeated frames, refrains"],
  "register_profile": "overall register description and notable shifts",
  "speakers": [{"id": "...", "description": "..."}],
  "cultural_references": ["specific cultural context for THIS content"],
  "language_variant": "simplified | traditional",
  "key_vocabulary_threads": [
    {"word": "鯨魚", "appears_in_lines": [1, 8, 15], "evolution": "how meaning shifts"}
  ]
}
```

### Per-Line Annotation (Pass 2 Output)

```json
{
  "line_index": 0,
  "chinese": "誰陪我做執迷的鯨魚",
  "translation": "Who will stay with me, being a stubbornly obsessed whale",
  "insight": "One concise non-obvious observation about this line",
  "words": [
    {
      "chars": "執迷",
      "pinyin": "zhímí",
      "has_pinyin_gotcha": true,
      "note": "Contextual meaning woven with cultural insight",
      "is_pattern_key": false,
      "difficulty": "hsk5+"
    }
  ],
  "grammar_unlock": null | {
    "pattern": "V來V去",
    "explanation": "...",
    "examples": ["想來想去", "走來走去", "翻來覆去"]
  },
  "cross_references": [
    {
      "target_line": 2,
      "note": "Specific explanation of the connection"
    }
  ],
  "dropped_subject": null | "Subject is still 她 from line 12",
  "negation_note": null | "不是不想 — stacked negation explanation"
}
```

**Pinyin rule:** Only included on words where pronunciation is a gotcha (多音字, unexpected tones, common mispronunciations). The LLM decides via `has_pinyin_gotcha`. No top-level pinyin on lines.

**Word annotation priorities (ordered by comprehension impact):**
1. Contextual meaning (what it means HERE, not dictionary default)
2. Cultural load (woven into the meaning note)
3. Particle nuance (了/的/得/过 — what is it DOING here)
4. Register signal (literary vs colloquial)
5. Sound-meaning play
6. Emotional coloring of near-synonyms
7. Measure word choices
8. Character decomposition (only when etymology illuminates)

**Line annotation priorities:**
1. Dropped/implied subjects
2. Sentence rhythm and emphasis
3. Cross-references (structural parallels, evolving imagery)
4. Grammar unlock (only when pattern is the bottleneck)
5. Connector logic (卻/倒/反而/偏偏)
6. Negation subtlety
7. Fixed frames (不是...而是, 與其...不如)

**Skip boring words:** 我, 你, 的, 在 — don't annotate unless they're doing something unusual.

## LLM Prompts

### Pass 1 System Prompt

```
You are a Chinese language analysis engine. You will receive a complete piece of Chinese content (song lyrics, TV subtitles, or transcript).

Produce a JSON content map with the following structure:
{
  "summary": "2-3 sentence thematic/emotional summary",
  "motifs": ["list of recurring images, metaphors, or thematic threads"],
  "structural_patterns": ["parallel lines, repeated frames, refrains"],
  "register_profile": "overall register description and notable shifts",
  "speakers": [{"id": "...", "description": "..."}],
  "cultural_references": ["broad cultural context relevant to the whole piece"],
  "language_variant": "simplified | traditional",
  "key_vocabulary_threads": [
    {"word": "鯨魚", "appears_in_lines": [1, 8, 15], "evolution": "how its meaning shifts across appearances"}
  ]
}

Be specific and grounded. Every observation must reference specific lines or words. Do not make generic statements about Chinese culture — only flag cultural context that is necessary to understand THIS specific content.
```

### Pass 2 System Prompt

```
You are annotating a single line of Chinese content for an intermediate-to-advanced learner (HSK 4-6 level). Your goal is to maximize comprehension of this specific line in context.

You have access to:
- The full content map (themes, motifs, patterns)
- The complete original text
- The target line and its surrounding lines

Produce annotations following the schema provided.

Rules:
- CONTEXTUAL MEANINGS ONLY. Never give dictionary defaults. What does this word mean in THIS sentence?
- WEAVE cultural insight into vocabulary notes. Don't separate "culture" from "meaning."
- PINYIN only when pronunciation is a gotcha: 多音字, unexpected tones, commonly mispronounced. Set has_pinyin_gotcha: true for these. Otherwise omit pinyin.
- INSIGHT must be ONE concise observation — the single most important non-obvious thing about this line. Not a summary. An insight.
- GRAMMAR UNLOCK only when a pattern is the actual comprehension bottleneck. If grammar is straightforward, set to null.
- CROSS-REFERENCES must be specific. "This connects to line X" is useless. "This line's V來V去 mirrors line 2's, but swimming became running — the exhaustion escalates" is useful.
- SKIP boring words. 我, 你, 的, 在 — don't annotate unless doing something unusual.
- For particles (了, 呢, 吧, etc.), explain what the particle is DOING in this specific sentence.
- Flag dropped subjects explicitly.
- Note register only when the word choice is surprising or meaningful.
```

## UI Design

### Views

**View 1: Paste Input (`/`)**
- Large text area for pasting Chinese content
- Auto-detected metadata fields (title, artist) with manual override
- "Annotate" button triggers Pass 1
- Loading state while content map generates

**View 2: Annotation Workspace (`/content/[hash]`)**
- Two-panel layout on desktop (line list left, annotation right)
- Full-screen line list on mobile, tap to enter annotation view

### Left Panel — Line List
- Summary card at top (from content map: themes, motifs, key patterns)
- Scrollable numbered Chinese lines
- Active line highlighted with gold left border
- Unclicked lines show raw Chinese text only
- Click triggers lazy annotation load

### Right Panel — Annotation View
**Layer 1 — The Line (always visible on selection):**
- Chinese text rendered large with word segmentation
- Tappable words have dotted underlines colored by category
- Boring words dimmed
- Contextual English translation below

**Layer 2 — Word Popovers (on tap):**
- Compact popover with word + contextual meaning
- Pinyin only when has_pinyin_gotcha is true
- HSK level badge
- Register note if notable
- Character decomposition if illuminating
- One popover at a time, dismiss by tapping elsewhere

**Layer 3 — Line-Level Annotations (on line selection):**
- Insight strip (blue) — one concise non-obvious observation
- Grammar unlock (coral) — only when pattern is the bottleneck, includes examples
- Cross-reference pills (green) — clickable, jump to related lines with explanation
- Dropped subject note — when pronouns are omitted

### Mobile Behavior
- Line list is default full-screen view
- Tap line → full-screen annotation view with back nav
- Swipe left/right between lines
- Word popovers render as bottom sheets
- Responsive breakpoint at 640px

### Theme

**Background:** `#08090C` (near-black with slight blue)
**Surface:** `#111318` (dark gray-blue)
**Text:** `#E0DDD6` (warm off-white)

**Annotation type colors:**
| Type | Color | Hex |
|------|-------|-----|
| Vocabulary | Warm amber | `#E8A84C` |
| Insight | Clear blue | `#5BAADB` |
| Grammar | Warm coral | `#D96B5A` |
| Cross-reference | Sage green | `#6BB478` |
| Culture/Motif | Soft purple | `#B88CD8` |

**Fonts:**
- Chinese: Noto Serif SC, weight 500
- UI/monospace: JetBrains Mono
- Body: Inter or system sans-serif

**Styling approach:** Inline JS style objects + CSS variables. No Tailwind, no CSS modules.

## Project Structure

```
zhujie/
├── src/
│   └── app/
│       ├── page.tsx                    # Paste input view
│       ├── layout.tsx                  # Root layout, fonts, global styles
│       ├── content/[hash]/
│       │   └── page.tsx                # Annotation workspace
│       └── api/
│           ├── content-map/route.ts    # POST — Pass 1
│           └── annotate-line/route.ts  # POST — Pass 2 (lazy)
├── components/
│   ├── PasteInput.tsx
│   ├── LineList.tsx
│   ├── AnnotationView.tsx
│   ├── WordPopover.tsx
│   ├── InsightStrip.tsx
│   ├── GrammarUnlock.tsx
│   └── CrossReference.tsx
├── lib/
│   ├── db.ts                           # Neon SQL client
│   ├── annotate.ts                     # Anthropic API calls
│   └── types.ts                        # TypeScript interfaces
├── index.css                           # CSS variables, fonts, globals
├── package.json
├── next.config.js
├── tsconfig.json
└── vercel.json
```

## Content Input

### Metadata Auto-Detection
Parse common formats from pasted text:
- `Artist - Title` or `Title - Artist` as first line
- Detect language variant (simplified vs traditional) from character analysis
- Content type inference (line count, structure patterns)
- All auto-detected fields are editable by user

### Future (Post-MVP)
- .srt / .ass / .vtt subtitle file support
- Content library (browse previously annotated content)
- Synced playback with media
- Spaced repetition hooks
- Difficulty profiling
- Export to Anki
