# Zhùjiě (注解) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Genius-style annotation engine for Chinese content with a two-pass LLM pipeline and lazy per-line annotation.

**Architecture:** Next.js App Router with two API routes (content-map, annotate-line), Neon Postgres for caching, Anthropic SDK for LLM calls. Paste input at `/`, annotation workspace at `/content/[hash]`. Lines annotated lazily on click.

**Tech Stack:** Next.js 15, TypeScript, Neon Postgres (`@neondatabase/serverless`), Anthropic SDK, inline JS styles, Noto Serif SC / JetBrains Mono / Inter fonts.

**Spec:** `docs/superpowers/specs/2026-03-22-zhujie-design.md`

---

## File Structure

```
zhujie/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout, fonts, CSS imports
│   │   ├── page.tsx                      # Paste input view (client component)
│   │   ├── content/[hash]/
│   │   │   └── page.tsx                  # Annotation workspace (client component)
│   │   └── api/
│   │       ├── content-map/route.ts      # POST — Pass 1 (content map)
│   │       └── annotate-line/route.ts    # POST — Pass 2 (lazy line annotation)
│   ├── components/
│   │   ├── PasteInput.tsx                # Text area + metadata fields + submit
│   │   ├── LineList.tsx                  # Left panel — summary card + numbered lines
│   │   ├── AnnotationView.tsx            # Right panel — line display + annotation layers
│   │   ├── WordPopover.tsx               # Tappable word detail popover / mobile bottom sheet
│   │   ├── InsightStrip.tsx              # Blue insight block
│   │   ├── GrammarUnlock.tsx             # Coral grammar pattern block
│   │   └── CrossReference.tsx            # Green connection pills
│   ├── lib/
│   │   ├── db.ts                         # Neon SQL client + query functions
│   │   ├── annotate.ts                   # Anthropic API calls (Pass 1 + Pass 2 prompts)
│   │   ├── types.ts                      # TypeScript interfaces
│   │   ├── hash.ts                       # Text normalization + SHA-256 hashing
│   │   └── metadata.ts                   # Auto-detect title/artist/content type
│   └── styles/
│       ├── theme.ts                      # Color constants, font stacks, shared style objects
│       └── globals.css                   # @font-face imports, CSS variables, resets
├── package.json
├── next.config.ts
├── tsconfig.json
├── vercel.json
├── .env.local                            # DATABASE_URL, ANTHROPIC_API_KEY (not committed)
└── CLAUDE.md                             # Project-specific instructions
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `vercel.json`, `.env.local`, `.gitignore`, `CLAUDE.md`
- Create: `src/app/layout.tsx`, `src/styles/globals.css`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/benjipelletier/projects/benji.codes/zhujie
npx create-next-app@latest . --typescript --app --src-dir --no-tailwind --no-eslint --import-alias "@/*"
```

Accept defaults. This creates the scaffold with `src/app/` structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install @neondatabase/serverless @anthropic-ai/sdk @vercel/analytics
```

- [ ] **Step 3: Create `.env.local`**

```
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=sk-ant-...
```

User must fill in actual values.

- [ ] **Step 4: Create `vercel.json`**

```json
{
  "framework": "nextjs"
}
```

- [ ] **Step 5: Create `CLAUDE.md`**

```markdown
# zhujie — 注解

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build

## Architecture
- Next.js App Router (TypeScript)
- Neon Postgres for content/annotation cache
- Anthropic SDK (claude-opus-4-6) for annotation generation
- Inline JS style objects (no Tailwind, no CSS modules)

## Key Patterns
- Two-pass LLM: content-map (Pass 1) then lazy annotate-line (Pass 2)
- Cache keyed by SHA-256 of normalized text
- Annotation colors: amber (vocab), blue (insight), coral (grammar), green (cross-ref), purple (culture)

## Environment
- DATABASE_URL — Neon Postgres connection string
- ANTHROPIC_API_KEY — Anthropic API key
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js dev server running on localhost:3000 with default page.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold zhujie Next.js project with dependencies"
```

---

## Task 2: Theme & Global Styles

**Files:**
- Create: `src/styles/theme.ts`, `src/styles/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/styles/theme.ts`**

All color constants, font stacks, and reusable style objects. This is the single source of truth for the visual language.

```typescript
// ─── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  bg: '#08090C',
  surface: '#111318',
  text: '#E0DDD6',
  textMuted: 'rgba(224, 221, 214, 0.5)',
  textFaint: 'rgba(224, 221, 214, 0.35)',
  textDimmed: 'rgba(224, 221, 214, 0.25)',
  border: 'rgba(255, 255, 255, 0.06)',
  borderSubtle: 'rgba(255, 255, 255, 0.04)',

  // Annotation type colors
  vocab: '#E8A84C',
  vocabBg: 'rgba(232, 168, 76, 0.06)',
  vocabBorder: 'rgba(232, 168, 76, 0.18)',

  insight: '#5BAADB',
  insightBg: 'rgba(91, 170, 219, 0.04)',
  insightBorder: 'rgba(91, 170, 219, 0.18)',

  grammar: '#D96B5A',
  grammarBg: 'rgba(217, 107, 90, 0.04)',
  grammarBorder: 'rgba(217, 107, 90, 0.18)',

  crossRef: '#6BB478',
  crossRefBg: 'rgba(107, 180, 120, 0.06)',
  crossRefBorder: 'rgba(107, 180, 120, 0.15)',

  culture: '#B88CD8',
  cultureBg: 'rgba(184, 140, 216, 0.06)',
  cultureBorder: 'rgba(184, 140, 216, 0.15)',

  // Active line highlight
  activeBorder: '#E8A84C',
  activeBg: 'rgba(232, 168, 76, 0.04)',
} as const;

// ─── Fonts ───────────────────────────────────────────────────────────────────

export const fonts = {
  chinese: "'Noto Serif SC', serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Inter', system-ui, sans-serif",
} as const;

// ─── Common Style Objects ────────────────────────────────────────────────────

export const labelStyle: React.CSSProperties = {
  fontSize: 10,
  textTransform: 'uppercase',
  letterSpacing: 1,
  opacity: 0.4,
};
```

- [ ] **Step 2: Create `src/styles/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@300;400;500&family=Noto+Serif+SC:wght@400;500;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  background: #08090C;
  color: #E0DDD6;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: rgba(232, 168, 76, 0.3);
  color: #E0DDD6;
}

/* Scrollbar styling for dark theme */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

- [ ] **Step 3: Update `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '注解 Zhùjiě',
  description: 'Pre-study every line before you press play',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify — dev server shows blank dark page**

```bash
npm run dev
```

Open localhost:3000. Expected: dark background (#08090C), no content errors.

- [ ] **Step 5: Commit**

```bash
git add src/styles/theme.ts src/styles/globals.css src/app/layout.tsx
git commit -m "feat: add theme system and global styles"
```

---

## Task 3: TypeScript Types

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 1: Create `src/lib/types.ts`**

All shared interfaces for the annotation pipeline.

```typescript
// ─── Content Map (Pass 1 Output) ────────────────────────────────────────────

export interface VocabularyThread {
  word: string;
  appears_in_lines: number[];
  evolution: string;
}

export interface Speaker {
  id: string;
  description: string;
}

export interface ContentMap {
  summary: string;
  motifs: string[];
  structural_patterns: string[];
  register_profile: string;
  speakers: Speaker[];
  cultural_references: string[];
  language_variant: 'simplified' | 'traditional';
  key_vocabulary_threads: VocabularyThread[];
}

// ─── Line Annotation (Pass 2 Output) ────────────────────────────────────────

export interface WordAnnotation {
  chars: string;
  pinyin?: string;
  has_pinyin_gotcha: boolean;
  note: string;
  is_pattern_key: boolean;
  difficulty: string;
}

export interface GrammarUnlock {
  pattern: string;
  explanation: string;
  examples: string[];
}

export interface CrossReference {
  target_line: number;
  note: string;
}

export interface LineAnnotation {
  line_index: number;
  chinese: string;
  translation: string;
  insight: string;
  words: WordAnnotation[];
  grammar_unlock: GrammarUnlock | null;
  cross_references: CrossReference[];
  dropped_subject: string | null;
  negation_note: string | null;
}

// ─── API Request/Response ────────────────────────────────────────────────────

export interface ContentMapRequest {
  text: string;
  title?: string;
  artist?: string;
  contentType?: string;
}

export interface ContentMetadata {
  title: string | null;
  artist: string | null;
  contentType: 'song' | 'tv' | 'podcast' | 'other';
  languageVariant: 'simplified' | 'traditional';
}

export interface ContentMapResponse {
  contentHash: string;
  contentMap: ContentMap;
  lines: string[];
  metadata: ContentMetadata;
}

export interface AnnotateLineRequest {
  contentHash: string;
  lineIndex: number;
}

// ─── Database Rows ───────────────────────────────────────────────────────────

export interface ContentRow {
  content_hash: string;
  source_text: string;
  content_map: ContentMap;
  title: string | null;
  artist: string | null;
  content_type: string;
  language_variant: string;
  created_at: string;
}

export interface LineAnnotationRow {
  content_hash: string;
  line_index: number;
  annotation: LineAnnotation;
  version: number;
  created_at: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add TypeScript interfaces for annotation schema"
```

---

## Task 4: Database Layer

**Files:**
- Create: `src/lib/db.ts`

- [ ] **Step 1: Create `src/lib/db.ts`**

Neon client + all query functions. Uses `@neondatabase/serverless` with tagged template literals.

```typescript
import { neon } from '@neondatabase/serverless';
import type { ContentMap, ContentMetadata, LineAnnotation, ContentRow } from './types';

const sql = neon(process.env.DATABASE_URL!);

// ─── Schema Setup ────────────────────────────────────────────────────────────

export async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS contents (
      content_hash TEXT PRIMARY KEY,
      source_text TEXT NOT NULL,
      content_map JSONB NOT NULL,
      title TEXT,
      artist TEXT,
      content_type TEXT NOT NULL DEFAULT 'other',
      language_variant TEXT NOT NULL DEFAULT 'simplified',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS line_annotations (
      content_hash TEXT NOT NULL REFERENCES contents(content_hash),
      line_index INT NOT NULL,
      annotation JSONB NOT NULL,
      version INT NOT NULL DEFAULT 1,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (content_hash, line_index)
    )
  `;
}

// ─── Content Map ─────────────────────────────────────────────────────────────

export async function getContent(contentHash: string): Promise<ContentRow | null> {
  const rows = await sql`
    SELECT * FROM contents WHERE content_hash = ${contentHash}
  `;
  return (rows[0] as ContentRow) ?? null;
}

export async function storeContent(
  contentHash: string,
  sourceText: string,
  contentMap: ContentMap,
  metadata: ContentMetadata,
): Promise<void> {
  await sql`
    INSERT INTO contents (content_hash, source_text, content_map, title, artist, content_type, language_variant)
    VALUES (
      ${contentHash},
      ${sourceText},
      ${JSON.stringify(contentMap)},
      ${metadata.title},
      ${metadata.artist},
      ${metadata.contentType},
      ${metadata.languageVariant}
    )
    ON CONFLICT (content_hash) DO NOTHING
  `;
}

// ─── Line Annotations ────────────────────────────────────────────────────────

export async function getLineAnnotation(
  contentHash: string,
  lineIndex: number,
): Promise<LineAnnotation | null> {
  const rows = await sql`
    SELECT annotation FROM line_annotations
    WHERE content_hash = ${contentHash} AND line_index = ${lineIndex}
  `;
  return (rows[0]?.annotation as LineAnnotation) ?? null;
}

export async function storeLineAnnotation(
  contentHash: string,
  lineIndex: number,
  annotation: LineAnnotation,
): Promise<void> {
  await sql`
    INSERT INTO line_annotations (content_hash, line_index, annotation)
    VALUES (${contentHash}, ${lineIndex}, ${JSON.stringify(annotation)})
    ON CONFLICT (content_hash, line_index) DO UPDATE SET
      annotation = ${JSON.stringify(annotation)},
      version = line_annotations.version + 1
  `;
}
```

- [ ] **Step 2: Verify database connection**

Start dev server and check no import errors. Actual table creation will happen on first API call.

```bash
npm run dev
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/db.ts
git commit -m "feat: add Neon Postgres database layer"
```

---

## Task 5: Utility Libraries (Hash + Metadata Detection)

**Files:**
- Create: `src/lib/hash.ts`, `src/lib/metadata.ts`

- [ ] **Step 1: Create `src/lib/hash.ts`**

Text normalization and SHA-256 hashing. Normalization: trim each line, remove empty lines, join with `\n`.

```typescript
import { createHash } from 'crypto';

export function normalizeText(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

export function splitLines(text: string): string[] {
  return normalizeText(text).split('\n');
}

export function hashContent(normalizedText: string): string {
  return createHash('sha256').update(normalizedText, 'utf8').digest('hex');
}
```

- [ ] **Step 2: Create `src/lib/metadata.ts`**

Auto-detect title/artist from common paste formats. Detects simplified vs traditional by checking character ranges.

```typescript
import type { ContentMetadata } from './types';

// Common separators for "Artist - Title" or "Title - Artist" formats
const SEPARATOR_RE = /\s*[-–—]\s*/;

// Simplified-only characters (common ones that differ from traditional)
const SIMPLIFIED_RE = /[这个来对说时会学长开关门车东风书画]/;
// Traditional-only characters
const TRADITIONAL_RE = /[這個來對說時會學長開關門車東風書畫]/;

export function detectLanguageVariant(text: string): 'simplified' | 'traditional' {
  let simpCount = 0;
  let tradCount = 0;
  for (const char of text) {
    if (SIMPLIFIED_RE.test(char)) simpCount++;
    if (TRADITIONAL_RE.test(char)) tradCount++;
  }
  return tradCount > simpCount ? 'traditional' : 'simplified';
}

export function detectMetadata(
  text: string,
  overrides: { title?: string; artist?: string; contentType?: string },
): ContentMetadata {
  let title: string | null = overrides.title ?? null;
  let artist: string | null = overrides.artist ?? null;

  // Try to parse first line as "Artist - Title" if no overrides
  if (!title && !artist) {
    const lines = text.trim().split('\n');
    const firstLine = lines[0]?.trim() ?? '';
    if (SEPARATOR_RE.test(firstLine)) {
      const parts = firstLine.split(SEPARATOR_RE);
      if (parts.length === 2 && parts[0].length < 30 && parts[1].length < 30) {
        artist = parts[0];
        title = parts[1];
      }
    }
  }

  // Infer content type from structure
  let contentType: 'song' | 'tv' | 'podcast' | 'other' = 'other';
  if (overrides.contentType) {
    contentType = overrides.contentType as ContentMetadata['contentType'];
  } else {
    const lineCount = text.trim().split('\n').filter((l) => l.trim()).length;
    if (lineCount <= 80) contentType = 'song';
  }

  return {
    title,
    artist,
    contentType,
    languageVariant: detectLanguageVariant(text),
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/hash.ts src/lib/metadata.ts
git commit -m "feat: add content hashing and metadata auto-detection"
```

---

## Task 6: LLM Annotation Module

**Files:**
- Create: `src/lib/annotate.ts`

- [ ] **Step 1: Create `src/lib/annotate.ts`**

Anthropic API calls for Pass 1 (content map) and Pass 2 (line annotation). Prompts from the spec.

```typescript
import Anthropic from '@anthropic-ai/sdk';
import type { ContentMap, LineAnnotation } from './types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const MODEL = 'claude-opus-4-6';

// ─── Pass 1: Content Map ─────────────────────────────────────────────────────

const PASS1_SYSTEM = `You are a Chinese language analysis engine. You will receive a complete piece of Chinese content (song lyrics, TV subtitles, or transcript).

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

Return ONLY valid JSON. No markdown, no explanation.`;

export async function generateContentMap(text: string): Promise<ContentMap> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: PASS1_SYSTEM,
    messages: [{ role: 'user', content: text }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  return JSON.parse(content.text) as ContentMap;
}

// ─── Pass 2: Line Annotation ─────────────────────────────────────────────────

const PASS2_SYSTEM = `You are annotating a single line of Chinese content for an intermediate-to-advanced learner (HSK 4-6 level). Your goal is to maximize comprehension of this specific line in context.

You have access to:
- The full content map (themes, motifs, patterns)
- The complete original text
- The target line and its surrounding lines

Produce annotations following this JSON schema:
{
  "line_index": number,
  "chinese": "the line text",
  "translation": "contextual English translation",
  "insight": "ONE concise non-obvious observation",
  "words": [
    {
      "chars": "word",
      "pinyin": "only if pronunciation is a gotcha",
      "has_pinyin_gotcha": boolean,
      "note": "contextual meaning woven with cultural insight",
      "is_pattern_key": boolean,
      "difficulty": "hsk1-6 or hsk5+"
    }
  ],
  "grammar_unlock": null | {
    "pattern": "pattern template",
    "explanation": "what it does",
    "examples": ["example1", "example2", "example3"]
  },
  "cross_references": [
    { "target_line": number, "note": "specific connection explanation" }
  ],
  "dropped_subject": null | "explanation of implied subject",
  "negation_note": null | "explanation of negation pattern"
}

Rules:
- CONTEXTUAL MEANINGS ONLY. Never give dictionary defaults. What does this word mean in THIS sentence?
- WEAVE cultural insight into vocabulary notes. Don't separate "culture" from "meaning."
- PINYIN only when pronunciation is a gotcha: 多音字, unexpected tones, commonly mispronounced. Set has_pinyin_gotcha: true for these. Otherwise omit pinyin and set has_pinyin_gotcha: false.
- INSIGHT must be ONE concise observation — the single most important non-obvious thing about this line. Not a summary. An insight.
- GRAMMAR UNLOCK only when a pattern is the actual comprehension bottleneck. If grammar is straightforward, set to null.
- CROSS-REFERENCES must be specific. "This connects to line X" is useless. "This line's V來V去 mirrors line 2's, but swimming became running — the exhaustion escalates" is useful.
- SKIP boring words. 我, 你, 的, 在 — don't annotate unless doing something unusual.
- For particles (了, 呢, 吧, etc.), explain what the particle is DOING in this specific sentence.
- Flag dropped subjects explicitly.
- Note register only when the word choice is surprising or meaningful.

Return ONLY valid JSON. No markdown, no explanation.`;

export async function generateLineAnnotation(
  contentMap: ContentMap,
  fullText: string,
  lines: string[],
  lineIndex: number,
): Promise<LineAnnotation> {
  // Build context with ±3 surrounding lines
  const start = Math.max(0, lineIndex - 3);
  const end = Math.min(lines.length - 1, lineIndex + 3);
  const surroundingLines = lines
    .slice(start, end + 1)
    .map((line, i) => {
      const idx = start + i;
      const marker = idx === lineIndex ? ' <<<' : '';
      return `${idx}: ${line}${marker}`;
    })
    .join('\n');

  const userMessage = `## Content Map
${JSON.stringify(contentMap, null, 2)}

## Full Text
${fullText}

## Target Line
Line ${lineIndex}: ${lines[lineIndex]}

## Surrounding Lines (±3)
${surroundingLines}`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: PASS2_SYSTEM,
    messages: [{ role: 'user', content: userMessage }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  return JSON.parse(content.text) as LineAnnotation;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/annotate.ts
git commit -m "feat: add LLM annotation module with Pass 1 and Pass 2 prompts"
```

---

## Task 7: API Routes

**Files:**
- Create: `src/app/api/content-map/route.ts`, `src/app/api/annotate-line/route.ts`

- [ ] **Step 1: Create `src/app/api/content-map/route.ts`**

POST handler for Pass 1. Checks cache first, generates if miss.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { normalizeText, splitLines, hashContent } from '@/lib/hash';
import { detectMetadata } from '@/lib/metadata';
import { getContent, storeContent, ensureTables } from '@/lib/db';
import { generateContentMap } from '@/lib/annotate';
import type { ContentMapRequest, ContentMapResponse } from '@/lib/types';

const MAX_TEXT_LENGTH = 20000; // ~500 lines of Chinese text

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body = (await request.json()) as ContentMapRequest;
    if (!body.text || body.text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }
    if (body.text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `Text too long (max ${MAX_TEXT_LENGTH} characters)` },
        { status: 400 },
      );
    }

    const normalized = normalizeText(body.text);
    const contentHash = hashContent(normalized);
    const lines = splitLines(body.text);

    // Check cache
    const existing = await getContent(contentHash);
    if (existing) {
      const response: ContentMapResponse = {
        contentHash,
        contentMap: existing.content_map,
        lines,
        metadata: {
          title: existing.title,
          artist: existing.artist,
          contentType: existing.content_type as ContentMapResponse['metadata']['contentType'],
          languageVariant: existing.language_variant as 'simplified' | 'traditional',
        },
      };
      return NextResponse.json(response);
    }

    // Generate content map
    const metadata = detectMetadata(body.text, {
      title: body.title,
      artist: body.artist,
      contentType: body.contentType,
    });
    const contentMap = await generateContentMap(normalized);

    // Override language_variant from LLM if it detected it
    if (contentMap.language_variant) {
      metadata.languageVariant = contentMap.language_variant;
    }

    // Cache
    await storeContent(contentHash, normalized, contentMap, metadata);

    const response: ContentMapResponse = {
      contentHash,
      contentMap,
      lines,
      metadata,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Content map error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content map' },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Create `src/app/api/annotate-line/route.ts`**

POST handler for Pass 2. Lazy — only called when user clicks a line.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getContent, getLineAnnotation, storeLineAnnotation, ensureTables } from '@/lib/db';
import { generateLineAnnotation } from '@/lib/annotate';
import { splitLines } from '@/lib/hash';
import type { AnnotateLineRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body = (await request.json()) as AnnotateLineRequest;
    if (!body.contentHash || body.lineIndex === undefined) {
      return NextResponse.json(
        { error: 'contentHash and lineIndex are required' },
        { status: 400 },
      );
    }

    // Check annotation cache
    const cached = await getLineAnnotation(body.contentHash, body.lineIndex);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch content for context
    const content = await getContent(body.contentHash);
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const lines = content.source_text.split('\n');
    if (body.lineIndex < 0 || body.lineIndex >= lines.length) {
      return NextResponse.json({ error: 'Line index out of range' }, { status: 400 });
    }

    // Generate annotation
    const annotation = await generateLineAnnotation(
      content.content_map,
      content.source_text,
      lines,
      body.lineIndex,
    );

    // Cache
    await storeLineAnnotation(body.contentHash, body.lineIndex, annotation);

    return NextResponse.json(annotation);
  } catch (error) {
    console.error('Annotate line error:', error);
    return NextResponse.json(
      { error: 'Failed to annotate line' },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 3: Test API routes manually**

Start dev server. Use curl to test content-map with a short Chinese text:

```bash
curl -X POST http://localhost:3000/api/content-map \
  -H "Content-Type: application/json" \
  -d '{"text": "誰陪我做執迷的鯨魚\n在人海中游來游去\n誰陪我建永恆的故居\n在歲月中跑來跑去"}'
```

Expected: JSON response with `contentHash`, `contentMap`, `lines`, `metadata`.

Then test annotate-line with the returned hash:

```bash
curl -X POST http://localhost:3000/api/annotate-line \
  -H "Content-Type: application/json" \
  -d '{"contentHash": "<hash from above>", "lineIndex": 0}'
```

Expected: JSON annotation object with `words`, `insight`, `translation`, etc.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/
git commit -m "feat: add content-map and annotate-line API routes"
```

---

## Task 8: Paste Input Page

**Files:**
- Create: `src/components/PasteInput.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/PasteInput.tsx`**

Text area with auto-detected metadata fields, loading state, and submit handler.

```tsx
'use client';

import { useState } from 'react';
import { colors, fonts } from '@/styles/theme';
import type { ContentMapResponse } from '@/lib/types';

interface PasteInputProps {
  onComplete: (data: ContentMapResponse) => void;
}

export default function PasteInput({ onComplete }: PasteInputProps) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/content-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          title: title || undefined,
          artist: artist || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to annotate');
      }

      const data: ContentMapResponse = await res.json();

      // Auto-fill metadata if detected
      if (data.metadata.title && !title) setTitle(data.metadata.title);
      if (data.metadata.artist && !artist) setArtist(data.metadata.artist);

      onComplete(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const s = {
    container: {
      maxWidth: 600,
      margin: '0 auto',
      padding: '60px 24px',
    } as React.CSSProperties,
    header: {
      textAlign: 'center',
      marginBottom: 40,
    } as React.CSSProperties,
    logo: {
      fontSize: 32,
      fontWeight: 700,
      fontFamily: fonts.chinese,
      color: colors.vocab,
      letterSpacing: 4,
      marginBottom: 6,
    } as React.CSSProperties,
    tagline: {
      fontSize: 13,
      color: colors.textFaint,
    } as React.CSSProperties,
    textarea: {
      width: '100%',
      minHeight: 200,
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: 16,
      color: colors.text,
      fontFamily: fonts.chinese,
      fontSize: 16,
      lineHeight: 2,
      resize: 'vertical' as const,
      outline: 'none',
    } as React.CSSProperties,
    metaRow: {
      display: 'flex',
      gap: 12,
      marginTop: 16,
    } as React.CSSProperties,
    metaField: {
      flex: 1,
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 6,
      padding: '10px 12px',
    } as React.CSSProperties,
    metaLabel: {
      fontSize: 11,
      color: colors.textFaint,
      marginBottom: 4,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    } as React.CSSProperties,
    metaInput: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      color: colors.vocab,
      fontSize: 14,
      fontFamily: fonts.body,
      outline: 'none',
    } as React.CSSProperties,
    button: {
      display: 'block',
      width: '100%',
      marginTop: 24,
      padding: '12px 32px',
      background: loading ? colors.textFaint : colors.vocab,
      color: colors.bg,
      fontWeight: 600,
      fontSize: 15,
      border: 'none',
      borderRadius: 6,
      cursor: loading ? 'wait' : 'pointer',
      fontFamily: fonts.body,
    } as React.CSSProperties,
    error: {
      marginTop: 12,
      color: colors.grammar,
      fontSize: 13,
      textAlign: 'center' as const,
    } as React.CSSProperties,
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={s.logo}>注解</div>
        <div style={s.tagline}>Pre-study every line before you press play</div>
      </div>

      <textarea
        style={s.textarea}
        placeholder="Paste Chinese content..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />

      <div style={s.metaRow}>
        <div style={s.metaField}>
          <div style={s.metaLabel}>Title</div>
          <input
            style={s.metaInput}
            placeholder="Auto-detected"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        <div style={s.metaField}>
          <div style={s.metaLabel}>Artist</div>
          <input
            style={s.metaInput}
            placeholder="Auto-detected"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <button style={s.button} onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analyzing...' : 'Annotate'}
      </button>

      {error && <div style={s.error}>{error}</div>}
    </div>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx`**

```tsx
'use client';

import { useRouter } from 'next/navigation';
import PasteInput from '@/components/PasteInput';
import type { ContentMapResponse } from '@/lib/types';

export default function Home() {
  const router = useRouter();

  const handleComplete = (data: ContentMapResponse) => {
    // Store content map data in sessionStorage for the workspace page
    sessionStorage.setItem(`content:${data.contentHash}`, JSON.stringify(data));
    router.push(`/content/${data.contentHash}`);
  };

  return <PasteInput onComplete={handleComplete} />;
}
```

- [ ] **Step 3: Verify paste input renders**

```bash
npm run dev
```

Open localhost:3000. Expected: dark page with 注解 header, text area, title/artist fields, Annotate button.

- [ ] **Step 4: Commit**

```bash
git add src/components/PasteInput.tsx src/app/page.tsx
git commit -m "feat: add paste input page with metadata auto-detection"
```

---

## Task 9: Annotation Workspace — Line List (Left Panel)

**Files:**
- Create: `src/components/LineList.tsx`

- [ ] **Step 1: Create `src/components/LineList.tsx`**

Left panel with summary card and clickable line list.

```tsx
'use client';

import { colors, fonts, labelStyle } from '@/styles/theme';
import type { ContentMap } from '@/lib/types';

interface LineListProps {
  lines: string[];
  contentMap: ContentMap;
  activeLineIndex: number | null;
  annotatedLines: Set<number>;
  onLineClick: (index: number) => void;
}

export default function LineList({
  lines,
  contentMap,
  activeLineIndex,
  annotatedLines,
  onLineClick,
}: LineListProps) {
  const s = {
    container: {
      width: 280,
      borderRight: `1px solid ${colors.border}`,
      padding: 16,
      overflowY: 'auto' as const,
      flexShrink: 0,
      height: '100%',
    } as React.CSSProperties,
    summary: {
      background: `linear-gradient(135deg, ${colors.crossRefBg}, ${colors.cultureBg})`,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 12,
      lineHeight: 1.6,
    } as React.CSSProperties,
    summaryLabel: {
      ...labelStyle,
      marginBottom: 6,
    } as React.CSSProperties,
    summaryText: {
      color: 'rgba(224, 221, 214, 0.7)',
    } as React.CSSProperties,
    motifs: {
      display: 'flex',
      gap: 6,
      marginTop: 8,
      flexWrap: 'wrap' as const,
    } as React.CSSProperties,
    motifTag: {
      background: colors.cultureBg,
      border: `1px solid ${colors.cultureBorder}`,
      borderRadius: 10,
      padding: '2px 8px',
      fontSize: 10,
      color: colors.culture,
    } as React.CSSProperties,
    line: (isActive: boolean) =>
      ({
        borderLeft: `3px solid ${isActive ? colors.activeBorder : 'transparent'}`,
        padding: '8px 10px',
        marginBottom: 1,
        background: isActive ? colors.activeBg : 'transparent',
        borderRadius: '0 4px 4px 0',
        cursor: 'pointer',
        transition: 'background 0.15s ease',
      }) as React.CSSProperties,
    lineNumber: {
      fontSize: 10,
      color: colors.textDimmed,
      marginBottom: 2,
    } as React.CSSProperties,
    lineText: (isActive: boolean) =>
      ({
        fontSize: 15,
        fontFamily: fonts.chinese,
        letterSpacing: 0.5,
        opacity: isActive ? 1 : 0.45,
        color: colors.text,
      }) as React.CSSProperties,
  };

  return (
    <div style={s.container}>
      {/* Summary card */}
      <div style={s.summary}>
        <div style={s.summaryLabel}>Content Map</div>
        <div style={s.summaryText}>{contentMap.summary}</div>
        {contentMap.motifs.length > 0 && (
          <div style={s.motifs}>
            {contentMap.motifs.slice(0, 4).map((motif, i) => (
              <span key={i} style={s.motifTag}>
                {motif}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Line list */}
      {lines.map((line, i) => (
        <div
          key={i}
          style={s.line(i === activeLineIndex)}
          onClick={() => onLineClick(i)}
        >
          <div style={s.lineNumber}>{i + 1}</div>
          <div style={s.lineText(i === activeLineIndex)}>{line}</div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LineList.tsx
git commit -m "feat: add line list component with summary card"
```

---

## Task 10: Annotation Workspace — Annotation Sub-Components

**Files:**
- Create: `src/components/WordPopover.tsx`, `src/components/InsightStrip.tsx`, `src/components/GrammarUnlock.tsx`, `src/components/CrossReference.tsx`

- [ ] **Step 1: Create `src/components/InsightStrip.tsx`**

```tsx
import { colors, labelStyle } from '@/styles/theme';

interface InsightStripProps {
  insight: string;
}

export default function InsightStrip({ insight }: InsightStripProps) {
  const s = {
    container: {
      borderLeft: `3px solid ${colors.insight}`,
      padding: '12px 16px',
      background: colors.insightBg,
      borderRadius: '0 8px 8px 0',
      marginBottom: 20,
    } as React.CSSProperties,
    label: {
      ...labelStyle,
      color: `${colors.insight}80`,
      marginBottom: 6,
    } as React.CSSProperties,
    text: {
      fontSize: 13,
      lineHeight: 1.8,
      color: 'rgba(224, 221, 214, 0.7)',
    } as React.CSSProperties,
  };

  return (
    <div style={s.container}>
      <div style={s.label}>Insight</div>
      <div style={s.text}>{insight}</div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/GrammarUnlock.tsx`**

```tsx
import { colors, labelStyle } from '@/styles/theme';
import type { GrammarUnlock as GrammarUnlockType } from '@/lib/types';

interface GrammarUnlockProps {
  grammar: GrammarUnlockType;
}

export default function GrammarUnlock({ grammar }: GrammarUnlockProps) {
  const s = {
    container: {
      borderLeft: `3px solid ${colors.grammar}`,
      padding: '12px 16px',
      background: colors.grammarBg,
      borderRadius: '0 8px 8px 0',
      marginBottom: 20,
    } as React.CSSProperties,
    label: {
      ...labelStyle,
      color: `${colors.grammar}80`,
      marginBottom: 6,
    } as React.CSSProperties,
    pattern: {
      fontSize: 15,
      color: colors.grammar,
      marginBottom: 6,
      fontFamily: "'JetBrains Mono', monospace",
    } as React.CSSProperties,
    explanation: {
      fontSize: 13,
      lineHeight: 1.8,
      color: 'rgba(224, 221, 214, 0.7)',
      marginBottom: 8,
    } as React.CSSProperties,
    examples: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap' as const,
    } as React.CSSProperties,
    example: {
      background: colors.grammarBg,
      border: `1px solid ${colors.grammarBorder}`,
      borderRadius: 6,
      padding: '4px 10px',
      fontSize: 12,
      color: `${colors.grammar}B3`,
    } as React.CSSProperties,
  };

  return (
    <div style={s.container}>
      <div style={s.label}>Grammar</div>
      <div style={s.pattern}>{grammar.pattern}</div>
      <div style={s.explanation}>{grammar.explanation}</div>
      <div style={s.examples}>
        {grammar.examples.map((ex, i) => (
          <span key={i} style={s.example}>
            {ex}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/CrossReference.tsx`**

```tsx
import { colors } from '@/styles/theme';
import type { CrossReference as CrossRefType } from '@/lib/types';

interface CrossReferenceProps {
  references: CrossRefType[];
  lines: string[];
  onJump: (lineIndex: number) => void;
}

export default function CrossReference({ references, lines, onJump }: CrossReferenceProps) {
  if (references.length === 0) return null;

  const s = {
    container: {
      marginBottom: 20,
    } as React.CSSProperties,
    label: {
      fontSize: 10,
      textTransform: 'uppercase' as const,
      letterSpacing: 1,
      color: `${colors.crossRef}80`,
      marginBottom: 8,
    } as React.CSSProperties,
    pills: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap' as const,
    } as React.CSSProperties,
    pill: {
      background: colors.crossRefBg,
      border: `1px solid ${colors.crossRefBorder}`,
      borderRadius: 8,
      padding: '8px 12px',
      cursor: 'pointer',
      maxWidth: 320,
    } as React.CSSProperties,
    pillLine: {
      fontSize: 12,
      color: colors.crossRef,
      marginBottom: 3,
    } as React.CSSProperties,
    pillNote: {
      fontSize: 11,
      color: `${colors.crossRef}80`,
      lineHeight: 1.5,
    } as React.CSSProperties,
  };

  return (
    <div style={s.container}>
      <div style={s.label}>Connections</div>
      <div style={s.pills}>
        {references.map((ref, i) => (
          <div key={i} style={s.pill} onClick={() => onJump(ref.target_line)}>
            <div style={s.pillLine}>
              → Line {ref.target_line + 1} — {lines[ref.target_line] ?? ''}
            </div>
            <div style={s.pillNote}>{ref.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/WordPopover.tsx`**

Renders as floating popover on desktop, bottom sheet on mobile.

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { colors, fonts } from '@/styles/theme';
import type { WordAnnotation } from '@/lib/types';

interface WordPopoverProps {
  word: WordAnnotation;
  anchorRect: DOMRect | null;
  isMobile: boolean;
  onClose: () => void;
}

export default function WordPopover({ word, anchorRect, isMobile, onClose }: WordPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const s = {
    // Desktop: positioned popover
    popover: {
      position: 'absolute' as const,
      top: anchorRect ? anchorRect.bottom + 8 : 0,
      left: anchorRect ? anchorRect.left : 0,
      background: colors.surface,
      border: `1px solid ${colors.vocabBorder}`,
      borderRadius: 10,
      padding: 16,
      maxWidth: 400,
      zIndex: 100,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
    } as React.CSSProperties,
    // Mobile: bottom sheet
    bottomSheet: {
      position: 'fixed' as const,
      bottom: 0,
      left: 0,
      right: 0,
      background: colors.surface,
      borderTop: `1px solid ${colors.vocabBorder}`,
      borderRadius: '16px 16px 0 0',
      padding: '20px 20px 32px',
      zIndex: 100,
      boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.3)',
    } as React.CSSProperties,
    header: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: 8,
    } as React.CSSProperties,
    chars: {
      fontSize: 20,
      color: colors.vocab,
      fontFamily: fonts.chinese,
    } as React.CSSProperties,
    pinyin: {
      fontSize: 12,
      color: `${colors.vocab}80`,
      fontFamily: fonts.mono,
    } as React.CSSProperties,
    badge: {
      background: `${colors.vocab}14`,
      border: `1px solid ${colors.vocab}26`,
      borderRadius: 4,
      padding: '1px 6px',
      fontSize: 10,
      color: `${colors.vocab}99`,
    } as React.CSSProperties,
    note: {
      fontSize: 13,
      lineHeight: 1.8,
      color: 'rgba(224, 221, 214, 0.75)',
    } as React.CSSProperties,
    register: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: `1px solid ${colors.borderSubtle}`,
      fontSize: 12,
      color: colors.textMuted,
      fontStyle: 'italic' as const,
    } as React.CSSProperties,
  };

  return (
    <div ref={ref} style={isMobile ? s.bottomSheet : s.popover}>
      <div style={s.header}>
        <span style={s.chars}>{word.chars}</span>
        {word.has_pinyin_gotcha && word.pinyin && (
          <span style={s.pinyin}>{word.pinyin}</span>
        )}
        {word.difficulty && <span style={s.badge}>{word.difficulty}</span>}
      </div>
      <div style={s.note}>{word.note}</div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/WordPopover.tsx src/components/InsightStrip.tsx src/components/GrammarUnlock.tsx src/components/CrossReference.tsx
git commit -m "feat: add annotation sub-components (popover, insight, grammar, cross-ref)"
```

---

## Task 11: Annotation View (Right Panel)

**Files:**
- Create: `src/components/AnnotationView.tsx`

- [ ] **Step 1: Create `src/components/AnnotationView.tsx`**

Right panel that displays the selected line with interactive words and all annotation layers.

```tsx
'use client';

import { useState, useCallback } from 'react';
import { colors, fonts } from '@/styles/theme';
import type { LineAnnotation, WordAnnotation } from '@/lib/types';
import WordPopover from './WordPopover';
import InsightStrip from './InsightStrip';
import GrammarUnlock from './GrammarUnlock';
import CrossReference from './CrossReference';

interface AnnotationViewProps {
  annotation: LineAnnotation | null;
  loading: boolean;
  lines: string[];
  isMobile: boolean;
  onLineJump: (lineIndex: number) => void;
  onBack?: () => void; // mobile only
}

export default function AnnotationView({
  annotation,
  loading,
  lines,
  isMobile,
  onLineJump,
  onBack,
}: AnnotationViewProps) {
  const [activeWord, setActiveWord] = useState<{
    word: WordAnnotation;
    rect: DOMRect | null;
  } | null>(null);

  const handleWordClick = useCallback(
    (word: WordAnnotation, e: React.MouseEvent<HTMLSpanElement>) => {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setActiveWord((prev) =>
        prev?.word.chars === word.chars ? null : { word, rect },
      );
    },
    [],
  );

  const s = {
    container: {
      flex: 1,
      padding: isMobile ? '20px 16px' : '28px 36px',
      overflowY: 'auto' as const,
      position: 'relative' as const,
      height: '100%',
    } as React.CSSProperties,
    backButton: {
      fontSize: 13,
      color: colors.textMuted,
      cursor: 'pointer',
      marginBottom: 16,
    } as React.CSSProperties,
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: colors.textFaint,
      fontSize: 14,
    } as React.CSSProperties,
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: colors.textMuted,
      fontSize: 14,
    } as React.CSSProperties,
    chinese: {
      fontSize: isMobile ? 22 : 28,
      fontWeight: 500,
      fontFamily: fonts.chinese,
      marginBottom: 6,
      letterSpacing: 2,
      lineHeight: 1.6,
    } as React.CSSProperties,
    translation: {
      fontSize: 14,
      color: colors.textMuted,
      fontStyle: 'italic' as const,
      marginBottom: 28,
    } as React.CSSProperties,
    word: (isAnnotated: boolean) =>
      ({
        cursor: isAnnotated ? 'pointer' : 'default',
        borderBottom: isAnnotated ? `2.5px dotted ${colors.vocab}80` : 'none',
        opacity: isAnnotated ? 1 : 0.4,
        transition: 'opacity 0.15s ease',
      }) as React.CSSProperties,
    droppedSubject: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: 6,
      border: `1px solid ${colors.borderSubtle}`,
      marginTop: 12,
    } as React.CSSProperties,
    droppedDot: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: colors.textDimmed,
      flexShrink: 0,
    } as React.CSSProperties,
    droppedText: {
      fontSize: 12,
      color: colors.textFaint,
    } as React.CSSProperties,
    swipeHint: {
      fontSize: 10,
      color: colors.textDimmed,
      textAlign: 'center' as const,
      marginTop: 24,
    } as React.CSSProperties,
  };

  if (loading) {
    return (
      <div style={s.container}>
        <div style={s.loading}>Annotating...</div>
      </div>
    );
  }

  if (!annotation) {
    return (
      <div style={s.container}>
        <div style={s.empty}>Select a line to annotate</div>
      </div>
    );
  }

  // Build the interactive Chinese line from words array
  // Words in the annotation cover the interesting parts; remaining chars are rendered dimmed
  const renderInteractiveLine = () => {
    const annotatedWords = new Map(annotation.words.map((w) => [w.chars, w]));
    const chinese = annotation.chinese;
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < chinese.length) {
      // Try to match longest annotated word at position i
      let matched = false;
      for (let len = Math.min(6, chinese.length - i); len >= 1; len--) {
        const substr = chinese.substring(i, i + len);
        const wordData = annotatedWords.get(substr);
        if (wordData) {
          elements.push(
            <span
              key={i}
              style={s.word(true)}
              onClick={(e) => handleWordClick(wordData, e)}
            >
              {substr}
            </span>,
          );
          i += len;
          matched = true;
          break;
        }
      }
      if (!matched) {
        elements.push(
          <span key={i} style={s.word(false)}>
            {chinese[i]}
          </span>,
        );
        i++;
      }
    }

    return elements;
  };

  return (
    <div style={s.container}>
      {isMobile && onBack && (
        <div style={s.backButton} onClick={onBack}>
          ← Back
        </div>
      )}

      {/* The line */}
      <div style={s.chinese}>{renderInteractiveLine()}</div>
      <div style={s.translation}>{annotation.translation}</div>

      {/* Word popover */}
      {activeWord && (
        <WordPopover
          word={activeWord.word}
          anchorRect={activeWord.rect}
          isMobile={isMobile}
          onClose={() => setActiveWord(null)}
        />
      )}

      {/* Insight strip */}
      <InsightStrip insight={annotation.insight} />

      {/* Grammar unlock */}
      {annotation.grammar_unlock && (
        <GrammarUnlock grammar={annotation.grammar_unlock} />
      )}

      {/* Cross-references */}
      <CrossReference
        references={annotation.cross_references}
        lines={lines}
        onJump={onLineJump}
      />

      {/* Dropped subject / negation notes */}
      {annotation.dropped_subject && (
        <div style={s.droppedSubject}>
          <div style={s.droppedDot} />
          <div style={s.droppedText}>{annotation.dropped_subject}</div>
        </div>
      )}
      {annotation.negation_note && (
        <div style={{ ...s.droppedSubject, marginTop: 8 }}>
          <div style={s.droppedDot} />
          <div style={s.droppedText}>{annotation.negation_note}</div>
        </div>
      )}

      {isMobile && (
        <div style={s.swipeHint}>Swipe ← → for prev/next line</div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AnnotationView.tsx
git commit -m "feat: add annotation view with interactive words and annotation layers"
```

---

## Task 12: Annotation Workspace Page

**Files:**
- Create: `src/app/content/[hash]/page.tsx`

- [ ] **Step 1: Create `src/app/content/[hash]/page.tsx`**

Main workspace page that composes LineList + AnnotationView, handles lazy annotation loading, and manages mobile/desktop layout.

```tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { colors } from '@/styles/theme';
import type { ContentMapResponse, LineAnnotation } from '@/lib/types';
import LineList from '@/components/LineList';
import AnnotationView from '@/components/AnnotationView';

const MOBILE_BREAKPOINT = 640;

export default function ContentWorkspace() {
  const params = useParams();
  const router = useRouter();
  const hash = params.hash as string;

  const [contentData, setContentData] = useState<ContentMapResponse | null>(null);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [annotations, setAnnotations] = useState<Map<number, LineAnnotation>>(new Map());
  const [annotatedLines, setAnnotatedLines] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false); // mobile: show annotation view
  const touchStartX = useRef(0);

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Load content data from sessionStorage or redirect
  useEffect(() => {
    const stored = sessionStorage.getItem(`content:${hash}`);
    if (stored) {
      setContentData(JSON.parse(stored));
    } else {
      // Could also fetch from API, but for now redirect to paste
      router.push('/');
    }
  }, [hash, router]);

  // Lazy annotate on line click
  const handleLineClick = useCallback(
    async (lineIndex: number) => {
      setActiveLineIndex(lineIndex);

      if (isMobile) setShowAnnotation(true);

      // If already annotated, just show it
      if (annotations.has(lineIndex)) return;

      setLoading(true);
      try {
        const res = await fetch('/api/annotate-line', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentHash: hash, lineIndex }),
        });

        if (!res.ok) throw new Error('Failed to annotate');

        const annotation: LineAnnotation = await res.json();
        setAnnotations((prev) => new Map(prev).set(lineIndex, annotation));
        setAnnotatedLines((prev) => new Set(prev).add(lineIndex));
      } catch (error) {
        console.error('Annotation error:', error);
      } finally {
        setLoading(false);
      }
    },
    [hash, annotations, isMobile],
  );

  // Cross-reference jump
  const handleLineJump = useCallback(
    (lineIndex: number) => {
      handleLineClick(lineIndex);
    },
    [handleLineClick],
  );

  // Mobile back
  const handleBack = useCallback(() => {
    setShowAnnotation(false);
  }, []);

  // Mobile swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!contentData || activeLineIndex === null) return;
      const diff = e.changedTouches[0].clientX - touchStartX.current;
      const threshold = 80;

      if (diff > threshold && activeLineIndex > 0) {
        handleLineClick(activeLineIndex - 1);
      } else if (diff < -threshold && activeLineIndex < contentData.lines.length - 1) {
        handleLineClick(activeLineIndex + 1);
      }
    },
    [contentData, activeLineIndex, handleLineClick],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!contentData) return;
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        const next = activeLineIndex === null ? 0 : Math.min(activeLineIndex + 1, contentData.lines.length - 1);
        handleLineClick(next);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        const prev = activeLineIndex === null ? 0 : Math.max(activeLineIndex - 1, 0);
        handleLineClick(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contentData, activeLineIndex, handleLineClick]);

  if (!contentData) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: colors.textMuted }}>
        Loading...
      </div>
    );
  }

  const s = {
    desktop: {
      display: 'flex',
      height: '100vh',
      background: colors.bg,
    } as React.CSSProperties,
    mobile: {
      height: '100vh',
      background: colors.bg,
    } as React.CSSProperties,
    mobileLineList: {
      padding: 16,
      height: '100%',
      overflowY: 'auto' as const,
    } as React.CSSProperties,
  };

  // Mobile layout
  if (isMobile) {
    return (
      <div
        style={s.mobile}
        onTouchStart={showAnnotation ? handleTouchStart : undefined}
        onTouchEnd={showAnnotation ? handleTouchEnd : undefined}
      >
        {showAnnotation ? (
          <AnnotationView
            annotation={activeLineIndex !== null ? annotations.get(activeLineIndex) ?? null : null}
            loading={loading}
            lines={contentData.lines}
            isMobile={true}
            onLineJump={handleLineJump}
            onBack={handleBack}
          />
        ) : (
          <div style={s.mobileLineList}>
            <LineList
              lines={contentData.lines}
              contentMap={contentData.contentMap}
              activeLineIndex={activeLineIndex}
              annotatedLines={annotatedLines}
              onLineClick={handleLineClick}
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={s.desktop}>
      <LineList
        lines={contentData.lines}
        contentMap={contentData.contentMap}
        activeLineIndex={activeLineIndex}
        annotatedLines={annotatedLines}
        onLineClick={handleLineClick}
      />
      <AnnotationView
        annotation={activeLineIndex !== null ? annotations.get(activeLineIndex) ?? null : null}
        loading={loading}
        lines={contentData.lines}
        isMobile={false}
        onLineJump={handleLineJump}
      />
    </div>
  );
}
```

- [ ] **Step 2: End-to-end test**

Start dev server. Paste Chinese text on homepage, click Annotate. Should navigate to `/content/[hash]` with line list visible. Click a line — should show "Annotating..." then display the full annotation.

```bash
npm run dev
```

Test the full flow:
1. Open localhost:3000
2. Paste lyrics into text area
3. Click Annotate
4. Wait for content map (should redirect to workspace)
5. Click a line in the left panel
6. Verify annotation loads and displays correctly

- [ ] **Step 3: Commit**

```bash
git add src/app/content/
git commit -m "feat: add annotation workspace page with lazy line loading"
```

---

## Task 13: Build Verification & Polish

**Files:**
- Potentially modify any files from above for build fixes

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Fix any TypeScript or build errors.

- [ ] **Step 2: Verify `.gitignore` includes necessary entries**

Ensure `.env.local`, `node_modules/`, `.next/`, `.superpowers/` are all ignored.

- [ ] **Step 3: Create database tables**

If not auto-created, connect to Neon and run the CREATE TABLE statements from `db.ts`'s `ensureTables()` manually, or verify they're created on first API call.

- [ ] **Step 4: Full end-to-end smoke test**

Run through the complete flow:
1. Paste → Annotate → workspace loads with line list
2. Click line → annotation loads with words, insight, grammar, cross-refs
3. Click a word → popover appears
4. Click a cross-reference → jumps to that line and annotates it
5. Keyboard navigation (arrow keys) works
6. Resize to mobile width → line list full screen, tap line → annotation view, back button works

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: build fixes and polish from smoke test"
```

---

## Task 14: Deploy to Vercel

- [ ] **Step 1: Set environment variables in Vercel**

In the Vercel project settings, add:
- `DATABASE_URL` — Neon Postgres connection string
- `ANTHROPIC_API_KEY` — Anthropic API key

- [ ] **Step 2: Deploy**

```bash
git push
```

Or link the project in Vercel dashboard with root directory set to `zhujie/`.

- [ ] **Step 3: Verify production**

Test the deployed URL with the same end-to-end flow from Task 13.

- [ ] **Step 4: Commit `vercel.json` if any changes needed**

```bash
git add vercel.json
git commit -m "chore: update vercel config for production"
```
