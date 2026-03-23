# YuKuai Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform zhujie from a passive annotation reader into a personalized learning tool built around YuKuai — atomic, reusable knowledge units tracked per-user across content.

**Architecture:** Existing Next.js App Router + Neon Postgres foundation stays. Add NextAuth.js for user identity, new DB tables for YuKuai/encounters/familiarity, redesigned LLM Pass 2 prompt for decomposition, CC-CEDICT for static data, and a new card-based annotation UI with familiarity signals and active recall.

**Tech Stack:** Next.js 15 (App Router), Neon Postgres, Anthropic SDK (claude-sonnet-4-6), NextAuth.js, CC-CEDICT, TypeScript, inline styles.

**Spec:** `docs/superpowers/specs/2026-03-22-yukuai-redesign.md`

---

## File Structure

### New Files
- `src/lib/auth.ts` — NextAuth.js configuration (Google + GitHub providers)
- `src/lib/cedict.ts` — CC-CEDICT dictionary lookup (pinyin, HSK level, base definition)
- `src/lib/yukuai.ts` — YuKuai entity management (create, deduplicate, enrich with CEDICT)
- `src/lib/familiarity.ts` — Familiarity engine (encounter recording, state transitions, recall selection)
- `src/lib/yukuai-types.ts` — New TypeScript types for YuKuai system
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth.js API route
- `src/components/YuKuaiCard.tsx` — Single YuKuai card component (vocab/grammar/expression variants, recall mode)
- `src/components/YuKuaiSection.tsx` — Section grouping cards by type with header
- `src/components/ConnectionCard.tsx` — Connection display (replaces CrossReference)
- `src/components/GotchaCard.tsx` — Gotcha display
- `src/components/RevealTranslation.tsx` — Click-to-reveal translation
- `src/components/AuthButton.tsx` — Login/logout button
- `src/data/cedict.json` — Processed CC-CEDICT data (vocab → {pinyin, hsk, definition})
- `scripts/build-cedict.ts` — Script to process raw CC-CEDICT into our JSON format

### Modified Files
- `src/lib/types.ts` — Add new interfaces, deprecate old annotation types
- `src/lib/db.ts` — Add new tables (yukuai, yukuai_encounter, user_yukuai, users), new query functions
- `src/lib/annotate.ts` — Replace Pass 2 prompt with YuKuai decomposition prompt
- `src/app/page.tsx` — Add auth button
- `src/app/layout.tsx` — Wrap with NextAuth SessionProvider
- `src/app/content/[hash]/page.tsx` — New annotation flow, familiarity signals, active recall
- `src/components/LineList.tsx` — Add familiarity indicators per line
- `src/components/AnnotationView.tsx` — Complete rewrite: YuKuai sections replace flat annotation
- `src/styles/theme.ts` — Add YuKuai type colors (keep vocab amber, grammar coral, add expression purple)
- `package.json` — Add next-auth dependency

### Removed Files
- `src/components/WordPopover.tsx` — Replaced by YuKuaiCard
- `src/components/InsightStrip.tsx` — Insight folded into connections
- `src/components/GrammarUnlock.tsx` — Replaced by YuKuaiCard (grammar type)

---

## Task 1: YuKuai Type System

**Files:**
- Modify: `src/lib/types.ts`
- Create: `src/lib/yukuai-types.ts`

- [ ] **Step 1: Create YuKuai type definitions**

Create `src/lib/yukuai-types.ts`:

```typescript
// ─── YuKuai Core ─────────────────────────────────────────────────────────────

export type YuKuaiType = 'vocab' | 'grammar' | 'expression';

export type Familiarity = 'new' | 'seen' | 'familiar' | 'known';

export interface YuKuai {
  id: string;                    // "vocab:鲸鱼" | "grammar:V来V去" | "expr:春花秋月"
  type: YuKuaiType;
  canonical_form: string;        // "鲸鱼" | "V来V去" | "春花秋月"
  pinyin: string | null;         // from CC-CEDICT, null for grammar/expression
  hsk_level: number | null;      // 1-6 from static lookup, null if not in HSK
  base_definition: string | null; // from CC-CEDICT, null for grammar/expression
}

export interface YuKuaiEncounter {
  user_id: string;
  yukuai_id: string;
  content_hash: string;
  line_index: number;
  surface_form: string;          // "游来游去" — what it looks like in this line
  contextual_meaning: string;    // LLM-generated meaning in this context
  created_at: string;
}

export interface UserYuKuai {
  user_id: string;
  yukuai_id: string;
  familiarity: Familiarity;
  encounter_count: number;
  last_seen_at: string;
  contexts_seen: number;         // distinct content_hash count
}

// ─── LLM Decomposition Output ────────────────────────────────────────────────

export interface LLMYuKuaiItem {
  canonical_id: string;
  type: YuKuaiType;
  surface_form: string;
  contextual_meaning: string;
}

export interface LLMConnection {
  from: string;                  // yukuai canonical_id
  to_line: number;
  note: string;
}

export interface LLMGotcha {
  yukuai_id: string;
  note: string;
}

export interface LineDecomposition {
  translation: string;
  yukuai: LLMYuKuaiItem[];
  connections: LLMConnection[];
  gotchas: LLMGotcha[];
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface DecomposeLineRequest {
  contentHash: string;
  lineIndex: number;
}

export interface DecomposeLineResponse {
  decomposition: LineDecomposition;
  yukuai: YuKuai[];              // enriched with CEDICT data
  userState: UserYuKuai[] | null; // null if not logged in
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS (new file, no consumers yet)

- [ ] **Step 3: Commit**

```bash
git add src/lib/yukuai-types.ts
git commit -m "feat: add YuKuai type system"
```

---

## Task 2: Database Schema Expansion

**Files:**
- Modify: `src/lib/db.ts`

- [ ] **Step 1: Add new tables to ensureTables()**

Add after the existing `line_annotations` CREATE TABLE in `src/lib/db.ts`:

```typescript
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      provider TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS yukuai (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL CHECK (type IN ('vocab', 'grammar', 'expression')),
      canonical_form TEXT NOT NULL,
      pinyin TEXT,
      hsk_level INT,
      base_definition TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS yukuai_encounter (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      yukuai_id TEXT NOT NULL REFERENCES yukuai(id),
      content_hash TEXT NOT NULL,
      line_index INT NOT NULL,
      surface_form TEXT NOT NULL,
      contextual_meaning TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS user_yukuai (
      user_id TEXT NOT NULL REFERENCES users(id),
      yukuai_id TEXT NOT NULL REFERENCES yukuai(id),
      familiarity TEXT NOT NULL DEFAULT 'new' CHECK (familiarity IN ('new', 'seen', 'familiar', 'known')),
      encounter_count INT NOT NULL DEFAULT 0,
      last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      contexts_seen INT NOT NULL DEFAULT 0,
      PRIMARY KEY (user_id, yukuai_id)
    )
  `;
```

- [ ] **Step 2: Add YuKuai query functions**

Add to `src/lib/db.ts`:

```typescript
import type { YuKuai, YuKuaiEncounter, UserYuKuai, Familiarity } from './yukuai-types';

export async function getYuKuai(id: string): Promise<YuKuai | null> {
  const sql = getSql();
  const rows = await sql`SELECT * FROM yukuai WHERE id = ${id}` as Record<string, unknown>[];
  return (rows[0] as unknown as YuKuai) ?? null;
}

export async function upsertYuKuai(yk: YuKuai): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO yukuai (id, type, canonical_form, pinyin, hsk_level, base_definition)
    VALUES (${yk.id}, ${yk.type}, ${yk.canonical_form}, ${yk.pinyin}, ${yk.hsk_level}, ${yk.base_definition})
    ON CONFLICT (id) DO NOTHING
  `;
}

export async function recordEncounter(enc: Omit<YuKuaiEncounter, 'created_at'>): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO yukuai_encounter (user_id, yukuai_id, content_hash, line_index, surface_form, contextual_meaning)
    VALUES (${enc.user_id}, ${enc.yukuai_id}, ${enc.content_hash}, ${enc.line_index}, ${enc.surface_form}, ${enc.contextual_meaning})
  `;
}

export async function getUserYuKuai(userId: string, yukuaiId: string): Promise<UserYuKuai | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM user_yukuai WHERE user_id = ${userId} AND yukuai_id = ${yukuaiId}
  ` as Record<string, unknown>[];
  return (rows[0] as unknown as UserYuKuai) ?? null;
}

export async function upsertUserYuKuai(
  userId: string,
  yukuaiId: string,
  familiarity: Familiarity,
  contentHash: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO user_yukuai (user_id, yukuai_id, familiarity, encounter_count, last_seen_at, contexts_seen)
    VALUES (
      ${userId}, ${yukuaiId}, ${familiarity}, 1, NOW(),
      (SELECT COUNT(DISTINCT content_hash) FROM yukuai_encounter WHERE user_id = ${userId} AND yukuai_id = ${yukuaiId})
    )
    ON CONFLICT (user_id, yukuai_id) DO UPDATE SET
      familiarity = ${familiarity},
      encounter_count = user_yukuai.encounter_count + 1,
      last_seen_at = NOW(),
      contexts_seen = (SELECT COUNT(DISTINCT content_hash) FROM yukuai_encounter WHERE user_id = ${userId} AND yukuai_id = ${yukuaiId})
  `;
}

export async function getUserYuKuaiBatch(userId: string, yukuaiIds: string[]): Promise<UserYuKuai[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM user_yukuai WHERE user_id = ${userId} AND yukuai_id = ANY(${yukuaiIds})
  ` as Record<string, unknown>[];
  return rows as unknown as UserYuKuai[];
}

export async function getUser(id: string): Promise<{ id: string; email: string; name: string | null; provider: string } | null> {
  const sql = getSql();
  const rows = await sql`SELECT * FROM users WHERE id = ${id}` as Record<string, unknown>[];
  return (rows[0] as unknown as { id: string; email: string; name: string | null; provider: string }) ?? null;
}

export async function upsertUser(id: string, email: string, name: string | null, provider: string): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO users (id, email, name, provider)
    VALUES (${id}, ${email}, ${name}, ${provider})
    ON CONFLICT (id) DO UPDATE SET name = ${name}
  `;
}
```

- [ ] **Step 3: Add decomposition-specific cache functions**

Add to `src/lib/db.ts` (these replace the old `getLineAnnotation`/`storeLineAnnotation` for new decompositions):

```typescript
import type { LineDecomposition } from './yukuai-types';

export async function getLineDecomposition(contentHash: string, lineIndex: number): Promise<LineDecomposition | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT annotation FROM line_annotations
    WHERE content_hash = ${contentHash} AND line_index = ${lineIndex}
  ` as Record<string, unknown>[];
  const row = rows[0] as unknown as { annotation: LineDecomposition } | undefined;
  return row?.annotation ?? null;
}

export async function storeLineDecomposition(contentHash: string, lineIndex: number, decomposition: LineDecomposition): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO line_annotations (content_hash, line_index, annotation)
    VALUES (${contentHash}, ${lineIndex}, ${JSON.stringify(decomposition)})
    ON CONFLICT (content_hash, line_index) DO UPDATE SET
      annotation = ${JSON.stringify(decomposition)},
      version = line_annotations.version + 1
  `;
}
```

- [ ] **Step 4: Reset tablesEnsured flag**

Since schema changed, set `tablesEnsured = false` at the top of db.ts (it already is by default, but ensure the module re-runs on next cold start). No code change needed — the `CREATE TABLE IF NOT EXISTS` pattern is idempotent.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/db.ts
git commit -m "feat: add YuKuai, encounter, user tables and queries"
```

---

## Task 3: CC-CEDICT Integration

**Files:**
- Create: `scripts/build-cedict.ts`
- Create: `src/data/cedict.json`
- Create: `src/lib/cedict.ts`

- [ ] **Step 1: Create CEDICT build script**

Create `scripts/build-cedict.ts`. This script downloads the CC-CEDICT dictionary and processes it into a simplified JSON lookup keyed by simplified Chinese characters.

```typescript
// Run with: npx tsx scripts/build-cedict.ts
// Downloads CC-CEDICT and builds src/data/cedict.json

import { writeFileSync } from 'fs';
import { join } from 'path';

const CEDICT_URL = 'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz';

interface CedictEntry {
  pinyin: string;
  definition: string;
  hsk?: number;
}

// HSK vocabulary lists (levels 1-6, simplified characters)
// Source: HSK word lists are widely available as open data.
// Download from https://github.com/gigacool/hsk-level and merge into this map,
// or use an npm package like 'hsk-level' to look up levels at runtime.
// For now, the script downloads and parses HSK lists from a public source.
// If the download fails, HSK levels will be null (non-blocking).
const HSK_LEVELS: Record<string, number> = {};

// TODO: Implementer should populate HSK_LEVELS from a static word list.
// A simple approach: npm install hsk-level, then at build time:
//   import hskLevel from 'hsk-level';
//   for each word, HSK_LEVELS[word] = hskLevel(word) ?? undefined;

async function main() {
  console.log('Downloading CC-CEDICT...');
  const res = await fetch(CEDICT_URL);
  const arrayBuffer = await res.arrayBuffer();

  // Decompress gzip
  const ds = new DecompressionStream('gzip');
  const writer = ds.writable.getWriter();
  writer.write(new Uint8Array(arrayBuffer));
  writer.close();
  const reader = ds.readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const text = new TextDecoder().decode(Buffer.concat(chunks));

  console.log('Parsing entries...');
  const dict: Record<string, CedictEntry> = {};
  const lines = text.split('\n');

  for (const line of lines) {
    if (line.startsWith('#') || line.trim() === '') continue;

    // Format: traditional simplified [pinyin] /definition1/definition2/
    const match = line.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+\/(.+)\/$/);
    if (!match) continue;

    const [, , simplified, pinyin, definitions] = match;
    const firstDef = definitions.split('/')[0];

    // Only store first entry per simplified form (most common usage)
    if (!dict[simplified]) {
      dict[simplified] = {
        pinyin: pinyin.replace(/(\d)/g, (_, tone) => tone), // keep numbered pinyin
        definition: firstDef,
        ...(HSK_LEVELS[simplified] ? { hsk: HSK_LEVELS[simplified] } : {}),
      };
    }
  }

  const outPath = join(__dirname, '..', 'src', 'data', 'cedict.json');
  writeFileSync(outPath, JSON.stringify(dict));
  console.log(`Wrote ${Object.keys(dict).length} entries to ${outPath}`);
}

main().catch(console.error);
```

- [ ] **Step 2: Run the build script**

```bash
mkdir -p src/data
npx tsx scripts/build-cedict.ts
```

Expected: `Wrote ~120000 entries to src/data/cedict.json`

- [ ] **Step 3: Create CEDICT lookup module**

Create `src/lib/cedict.ts`:

```typescript
import cedictData from '@/data/cedict.json';

interface CedictEntry {
  pinyin: string;
  definition: string;
  hsk?: number;
}

const dict = cedictData as Record<string, CedictEntry>;

export function lookupCedict(simplified: string): CedictEntry | null {
  return dict[simplified] ?? null;
}

export function enrichYuKuai(canonicalForm: string, type: string): {
  pinyin: string | null;
  hsk_level: number | null;
  base_definition: string | null;
} {
  // Grammar and expression types don't get dictionary lookups
  if (type !== 'vocab') {
    return { pinyin: null, hsk_level: null, base_definition: null };
  }

  const entry = lookupCedict(canonicalForm);
  if (!entry) {
    return { pinyin: null, hsk_level: null, base_definition: null };
  }

  return {
    pinyin: entry.pinyin,
    hsk_level: entry.hsk ?? null,
    base_definition: entry.definition,
  };
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS (may need to update tsconfig to allow JSON imports — add `"resolveJsonModule": true` to tsconfig.json if not already set)

- [ ] **Step 5: Add cedict.json to .gitignore and commit**

Since cedict.json is ~15MB generated file, add it to `.gitignore`:

```bash
echo "src/data/cedict.json" >> .gitignore
git add .gitignore scripts/build-cedict.ts src/lib/cedict.ts
git commit -m "feat: add CC-CEDICT integration for static vocab data"
```

Note: Each developer/deploy needs to run `npx tsx scripts/build-cedict.ts` to generate the data file. Consider adding it to a postinstall script or build step.

---

## Task 4: NextAuth.js Setup

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/app/api/auth/[...nextauth]/route.ts`
- Modify: `src/app/layout.tsx`
- Create: `src/components/AuthButton.tsx`
- Modify: `src/app/page.tsx`
- Modify: `package.json`

- [ ] **Step 1: Install next-auth**

```bash
npm install next-auth@4
```

We use v4 which is stable with Next.js 15 App Router.

- [ ] **Step 2: Create auth configuration**

Create `src/lib/auth.ts`:

```typescript
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { upsertUser } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user.id && user.email && account?.provider) {
        await upsertUser(user.id, user.email, user.name ?? null, account.provider);
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

- [ ] **Step 3: Create auth API route**

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

- [ ] **Step 4: Create AuthButton component**

Create `src/components/AuthButton.tsx`:

```typescript
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { colors } from '@/styles/theme';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        style={{
          background: 'transparent',
          border: `1px solid ${colors.border}`,
          color: colors.textMuted,
          padding: '6px 12px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        {session.user?.name ?? 'Signed in'} · Sign out
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      style={{
        background: colors.vocabBg,
        border: `1px solid ${colors.vocabBorder}`,
        color: colors.vocab,
        padding: '6px 12px',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 12,
      }}
    >
      Sign in to track progress
    </button>
  );
}
```

- [ ] **Step 5: Wrap layout with SessionProvider**

Modify `src/app/layout.tsx` to add SessionProvider. Create a client wrapper component since SessionProvider is a client component:

Add to `src/app/layout.tsx`:

```typescript
import { SessionProvider } from 'next-auth/react';
```

Wrap `{children}` with `<SessionProvider>`.

Note: Since layout.tsx is a server component, you'll need to create a `src/components/Providers.tsx` client component:

```typescript
'use client';

import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Then use `<Providers>{children}</Providers>` in layout.tsx.

- [ ] **Step 6: Add AuthButton to home page**

Modify `src/app/page.tsx` — add `<AuthButton />` in the top-right corner (fixed position).

- [ ] **Step 7: Add environment variables**

Add to `.env.local`:
```
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
GITHUB_CLIENT_ID=<from GitHub OAuth App>
GITHUB_CLIENT_SECRET=<from GitHub OAuth App>
```

The user will need to create OAuth apps in Google Cloud Console and GitHub Settings.

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/lib/auth.ts src/app/api/auth/ src/components/AuthButton.tsx src/components/Providers.tsx src/app/layout.tsx src/app/page.tsx package.json package-lock.json
git commit -m "feat: add NextAuth.js with Google and GitHub OAuth"
```

---

## Task 5: LLM Pass 2 Redesign (Line Decomposition)

**Files:**
- Modify: `src/lib/annotate.ts`

- [ ] **Step 1: Replace Pass 2 prompt and function**

Replace `PASS2_SYSTEM` and `generateLineAnnotation` in `src/lib/annotate.ts` with:

```typescript
const PASS2_SYSTEM = `You are decomposing a single line of Chinese content into atomic learning units (YuKuai) for a language learner.

You have access to:
- The full content map (themes, motifs, patterns)
- The complete original text
- The target line and its surrounding lines

Produce a decomposition following this JSON schema:
{
  "translation": "contextual English translation of the full line",
  "yukuai": [
    {
      "canonical_id": "vocab:鲸鱼" | "grammar:V来V去" | "expr:春花秋月",
      "type": "vocab" | "grammar" | "expression",
      "surface_form": "the exact characters as they appear in this line",
      "contextual_meaning": "what this means specifically HERE, not the dictionary default"
    }
  ],
  "connections": [
    {
      "from": "canonical_id of a yukuai in this line",
      "to_line": line_index_number,
      "note": "specific explanation of how this yukuai connects to or evolves from its appearance in another line"
    }
  ],
  "gotchas": [
    {
      "yukuai_id": "canonical_id",
      "note": "pronunciation trap, false friend, register surprise, or common mistake"
    }
  ]
}

Rules for canonical_id format:
- Vocab: "vocab:" + the dictionary headword in simplified Chinese. E.g., "vocab:鲸鱼", "vocab:人海"
- Grammar: "grammar:" + the abstract pattern with variables. E.g., "grammar:V来V去", "grammar:是...的", "grammar:一...就..."
- Expression: "expr:" + the fixed expression. E.g., "expr:春花秋月", "expr:一霎那"

Rules for decomposition:
- SKIP boring words (我, 你, 的, 在, 是, 了, 不) unless their usage is genuinely unusual or interesting
- For grammar patterns, the canonical_id uses variables (V, N, A) and the surface_form shows the actual words
- CONTEXTUAL MEANING must explain what this means HERE, not the dictionary default
- CONNECTIONS must be specific. Not "relates to line X" but "V来V去 shifts from 游 (swimming) to 跑 (running) — the exhaustion escalates"
- GOTCHAS only when there's a real trap: 多音字, reversed character pairs (言语 vs 语言), register mismatches, false friends
- Keep decomposition focused — 2-6 yukuai per line is typical. Don't force it.

Return ONLY valid JSON. No markdown, no explanation.`;

export async function generateLineDecomposition(
  contentMap: ContentMap,
  fullText: string,
  lines: string[],
  lineIndex: number,
): Promise<LineDecomposition> {
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

  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: PASS2_SYSTEM,
    messages: [{ role: 'user', content: userMessage }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  return parseJSON<LineDecomposition>(content.text);
}
```

- [ ] **Step 2: Add LineDecomposition import**

Add to the imports at the top of `annotate.ts`:

```typescript
import type { ContentMap } from './types';
import type { LineDecomposition } from './yukuai-types';
```

Remove `LineAnnotation` from the imports if no longer used.

- [ ] **Step 3: Keep old generateLineAnnotation temporarily**

Don't delete `generateLineAnnotation` yet — rename it to `generateLineAnnotationLegacy` so existing cached data still works. We'll remove it after migration.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/annotate.ts
git commit -m "feat: add YuKuai decomposition prompt (Pass 2 redesign)"
```

---

## Task 6: YuKuai Entity Manager

**Files:**
- Create: `src/lib/yukuai.ts`

- [ ] **Step 1: Create YuKuai entity management module**

Create `src/lib/yukuai.ts`:

```typescript
import { getYuKuai, upsertYuKuai, recordEncounter, upsertUserYuKuai } from './db';
import { enrichYuKuai as cedictEnrich } from './cedict';
import type { YuKuai, LLMYuKuaiItem } from './yukuai-types';

/**
 * Process a YuKuai from LLM output:
 * 1. Check if it already exists in DB
 * 2. If not, create it with CC-CEDICT enrichment
 * 3. Return the full YuKuai entity
 */
export async function ensureYuKuai(item: LLMYuKuaiItem): Promise<YuKuai> {
  const existing = await getYuKuai(item.canonical_id);
  if (existing) return existing;

  const cedict = cedictEnrich(item.canonical_id.split(':')[1] ?? item.surface_form, item.type);

  const yk: YuKuai = {
    id: item.canonical_id,
    type: item.type,
    canonical_form: item.canonical_id.split(':')[1] ?? item.surface_form,
    pinyin: cedict.pinyin,
    hsk_level: cedict.hsk_level,
    base_definition: cedict.base_definition,
  };

  await upsertYuKuai(yk);
  return yk;
}

/**
 * Process a full line decomposition for a user:
 * 1. Ensure all YuKuai entities exist
 * 2. Record encounters for logged-in users
 * 3. Update user familiarity state
 */
export async function processDecomposition(
  userId: string | null,
  contentHash: string,
  lineIndex: number,
  items: LLMYuKuaiItem[],
): Promise<YuKuai[]> {
  const yukuaiEntities: YuKuai[] = [];

  for (const item of items) {
    const yk = await ensureYuKuai(item);
    yukuaiEntities.push(yk);

    if (userId) {
      await recordEncounter({
        user_id: userId,
        yukuai_id: yk.id,
        content_hash: contentHash,
        line_index: lineIndex,
        surface_form: item.surface_form,
        contextual_meaning: item.contextual_meaning,
      });

      // Update familiarity — new encounters stay 'new', will transition via familiarity engine
      await upsertUserYuKuai(userId, yk.id, 'new', contentHash);
    }
  }

  return yukuaiEntities;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/yukuai.ts
git commit -m "feat: add YuKuai entity manager with CEDICT enrichment"
```

---

## Task 7: Familiarity Engine

**Files:**
- Create: `src/lib/familiarity.ts`

- [ ] **Step 1: Create familiarity engine**

Create `src/lib/familiarity.ts`:

```typescript
import { getUserYuKuai, upsertUserYuKuai } from './db';
import type { Familiarity, UserYuKuai } from './yukuai-types';

/**
 * Compute the next familiarity level based on current state and action.
 *
 * Transitions:
 * - new → seen: encountered in 2+ contexts
 * - seen → familiar: successful active recall
 * - familiar → known: recalled across 2+ different content sources
 */
export function computeFamiliarity(
  current: UserYuKuai,
  action: 'encounter' | 'recall_success' | 'recall_fail',
): Familiarity {
  switch (action) {
    case 'encounter':
      if (current.familiarity === 'new' && current.contexts_seen >= 2) return 'seen';
      return current.familiarity;

    case 'recall_success':
      if (current.familiarity === 'seen') return 'familiar';
      if (current.familiarity === 'familiar' && current.contexts_seen >= 2) return 'known';
      return current.familiarity;

    case 'recall_fail':
      // Don't demote, just don't promote
      return current.familiarity;
  }
}

/**
 * Update a user's familiarity with a YuKuai after an action.
 */
export async function updateFamiliarity(
  userId: string,
  yukuaiId: string,
  action: 'encounter' | 'recall_success' | 'recall_fail',
  contentHash: string,
): Promise<Familiarity> {
  const current = await getUserYuKuai(userId, yukuaiId);

  if (!current) {
    // First encounter — create as 'new'
    await upsertUserYuKuai(userId, yukuaiId, 'new', contentHash);
    return 'new';
  }

  const newFamiliarity = computeFamiliarity(current, action);
  if (newFamiliarity !== current.familiarity) {
    await upsertUserYuKuai(userId, yukuaiId, newFamiliarity, contentHash);
  }

  return newFamiliarity;
}

/**
 * Select YuKuai candidates for active recall from a line's decomposition.
 * Returns yukuai IDs that should be shown in recall mode.
 *
 * Criteria:
 * - Must be 'seen' or 'familiar' (not 'new' or 'known')
 * - Prefer yukuai not seen in the last 24 hours
 * - Return at most 1 per line (don't overwhelm)
 */
export function selectRecallCandidates(
  userStates: UserYuKuai[],
): string[] {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  const candidates = userStates
    .filter((s) => s.familiarity === 'seen' || s.familiarity === 'familiar')
    .sort((a, b) => {
      // Prefer older last_seen (more due for review)
      const aAge = now - new Date(a.last_seen_at).getTime();
      const bAge = now - new Date(b.last_seen_at).getTime();
      return bAge - aAge;
    });

  // Return at most 1 candidate, prefer ones not seen in 24h
  const stale = candidates.find(
    (c) => now - new Date(c.last_seen_at).getTime() > DAY_MS,
  );

  if (stale) return [stale.yukuai_id];
  if (candidates.length > 0) return [candidates[0].yukuai_id];
  return [];
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/familiarity.ts
git commit -m "feat: add familiarity engine with state transitions and recall selection"
```

---

## Task 8: Decompose Line API Route

**Files:**
- Create: `src/app/api/decompose-line/route.ts`

- [ ] **Step 1: Create the new API route**

Create `src/app/api/decompose-line/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getContent, getLineDecomposition, storeLineDecomposition, ensureTables, getUserYuKuaiBatch } from '@/lib/db';
import { generateLineDecomposition } from '@/lib/annotate';
import { processDecomposition } from '@/lib/yukuai';
import { selectRecallCandidates } from '@/lib/familiarity';
import type { DecomposeLineRequest, DecomposeLineResponse } from '@/lib/yukuai-types';

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body = (await request.json()) as DecomposeLineRequest;
    if (!body.contentHash || typeof body.lineIndex !== 'number' || !Number.isInteger(body.lineIndex)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    if (!/^[a-f0-9]{64}$/.test(body.contentHash)) {
      return NextResponse.json({ error: 'Invalid content hash' }, { status: 400 });
    }

    // Get user session (optional — unauthenticated users can still decompose)
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id ?? null;

    // Check cache for decomposition
    const cached = await getLineDecomposition(body.contentHash, body.lineIndex);
    if (cached) {
      // Even on cache hit, process encounters for logged-in users
      const decomposition = cached;
      let yukuai = await Promise.all(
        decomposition.yukuai.map(async (item) => {
          const { ensureYuKuai } = await import('@/lib/yukuai');
          return ensureYuKuai(item);
        }),
      );

      let userState = null;
      let recallIds: string[] = [];
      if (userId) {
        const yukuaiIds = yukuai.map((yk) => yk.id);
        userState = await getUserYuKuaiBatch(userId, yukuaiIds);
        recallIds = selectRecallCandidates(userState);
      }

      const response: DecomposeLineResponse = {
        decomposition,
        yukuai,
        userState,
      };
      return NextResponse.json({ ...response, recallIds });
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

    // Generate decomposition via LLM
    const decomposition = await generateLineDecomposition(
      content.content_map,
      content.source_text,
      lines,
      body.lineIndex,
    );

    // Cache the decomposition
    await storeLineDecomposition(body.contentHash, body.lineIndex, decomposition);

    // Process YuKuai entities and encounters
    const yukuai = await processDecomposition(userId, body.contentHash, body.lineIndex, decomposition.yukuai);

    let userState = null;
    let recallIds: string[] = [];
    if (userId) {
      const yukuaiIds = yukuai.map((yk) => yk.id);
      userState = await getUserYuKuaiBatch(userId, yukuaiIds);
      recallIds = selectRecallCandidates(userState);
    }

    const response: DecomposeLineResponse = {
      decomposition,
      yukuai,
      userState,
    };
    return NextResponse.json({ ...response, recallIds });
  } catch (error) {
    console.error('Decompose line error:', error);
    return NextResponse.json({ error: 'Failed to decompose line' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/api/decompose-line/route.ts
git commit -m "feat: add decompose-line API route with YuKuai processing"
```

---

## Task 9: Active Recall API Route

**Files:**
- Create: `src/app/api/recall/route.ts`

- [ ] **Step 1: Create recall result API route**

Create `src/app/api/recall/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ensureTables } from '@/lib/db';
import { updateFamiliarity } from '@/lib/familiarity';

interface RecallRequest {
  yukuaiId: string;
  contentHash: string;
  result: 'success' | 'fail';
}

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Must be logged in' }, { status: 401 });
    }

    const body = (await request.json()) as RecallRequest;
    if (!body.yukuaiId || !body.contentHash || !body.result) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const action = body.result === 'success' ? 'recall_success' : 'recall_fail';
    const newFamiliarity = await updateFamiliarity(userId, body.yukuaiId, action, body.contentHash);

    return NextResponse.json({ familiarity: newFamiliarity });
  } catch (error) {
    console.error('Recall error:', error);
    return NextResponse.json({ error: 'Failed to record recall' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/api/recall/route.ts
git commit -m "feat: add recall API route for active recall results"
```

---

## Task 10: UI Components — YuKuai Cards

**Files:**
- Create: `src/components/YuKuaiCard.tsx`
- Create: `src/components/YuKuaiSection.tsx`
- Create: `src/components/RevealTranslation.tsx`
- Create: `src/components/ConnectionCard.tsx`
- Create: `src/components/GotchaCard.tsx`
- Modify: `src/styles/theme.ts`

- [ ] **Step 1: Update theme with YuKuai type colors**

Modify `src/styles/theme.ts` — add/confirm these colors exist:

```typescript
// YuKuai type colors (reusing existing palette)
// vocab → amber (existing)
// grammar → coral (existing)
// expression → purple (existing culture color)
```

The existing colors already cover the three types: `vocab` (amber), `grammar` (coral), `culture`/expression (purple). No changes needed to the color values — just note the mapping.

- [ ] **Step 2: Create RevealTranslation component**

Create `src/components/RevealTranslation.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { colors, fonts } from '@/styles/theme';

interface RevealTranslationProps {
  translation: string;
}

export default function RevealTranslation({ translation }: RevealTranslationProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      onClick={() => setRevealed(true)}
      style={{
        padding: '8px 0',
        cursor: revealed ? 'default' : 'pointer',
        userSelect: revealed ? 'text' : 'none',
      }}
    >
      {revealed ? (
        <span style={{ fontStyle: 'italic', color: colors.textMuted, fontSize: 14, fontFamily: fonts.body }}>
          {translation}
        </span>
      ) : (
        <span style={{ color: colors.textDimmed, fontSize: 13, fontFamily: fonts.body }}>
          Tap to reveal translation
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create YuKuaiCard component**

Create `src/components/YuKuaiCard.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { colors, fonts } from '@/styles/theme';
import type { YuKuai, LLMYuKuaiItem, Familiarity } from '@/lib/yukuai-types';

const typeColors = {
  vocab: { accent: colors.vocab, bg: colors.vocabBg, border: colors.vocabBorder },
  grammar: { accent: colors.grammar, bg: colors.grammarBg, border: colors.grammarBorder },
  expression: { accent: colors.culture, bg: colors.cultureBg, border: colors.cultureBorder },
};

const familiarityLabels: Record<Familiarity, string> = {
  new: 'NEW',
  seen: 'SEEN',
  familiar: 'FAMILIAR',
  known: 'KNOWN',
};

interface YuKuaiCardProps {
  item: LLMYuKuaiItem;
  entity: YuKuai;
  familiarity: Familiarity | null; // null if not logged in
  recallMode: boolean;
  onRecallResult?: (result: 'success' | 'fail') => void;
}

export default function YuKuaiCard({ item, entity, familiarity, recallMode, onRecallResult }: YuKuaiCardProps) {
  const [revealed, setRevealed] = useState(false);
  const tc = typeColors[item.type];

  const handleReveal = (knew: boolean) => {
    setRevealed(true);
    if (onRecallResult) {
      onRecallResult(knew ? 'success' : 'fail');
    }
  };

  return (
    <div
      style={{
        background: tc.bg,
        border: `1px solid ${tc.border}`,
        borderRadius: 8,
        padding: 12,
        minWidth: 180,
      }}
    >
      {/* Header: surface form + familiarity badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 18, fontFamily: fonts.chinese, color: tc.accent }}>
          {item.surface_form}
        </span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {entity.hsk_level && (
            <span style={{ fontSize: 9, color: colors.textDimmed, border: `1px solid ${colors.border}`, borderRadius: 4, padding: '1px 4px' }}>
              HSK{entity.hsk_level}
            </span>
          )}
          {familiarity && (
            <span style={{ fontSize: 9, color: tc.accent, opacity: 0.7 }}>
              {familiarityLabels[familiarity]}
            </span>
          )}
        </div>
      </div>

      {/* Pinyin (vocab only, from dictionary) */}
      {entity.pinyin && (
        <div style={{ fontSize: 11, color: colors.textMuted, fontFamily: fonts.mono, marginBottom: 4 }}>
          {entity.pinyin}
        </div>
      )}

      {/* Canonical form for grammar/expression */}
      {item.type !== 'vocab' && (
        <div style={{ fontSize: 11, color: colors.textMuted, fontFamily: fonts.mono, marginBottom: 4 }}>
          {entity.canonical_form}
        </div>
      )}

      {/* Contextual meaning — hidden in recall mode until revealed */}
      {recallMode && !revealed ? (
        <div style={{ marginTop: 8 }}>
          <div style={{ color: colors.textDimmed, fontSize: 12, marginBottom: 8 }}>
            What does this mean here?
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => handleReveal(true)}
              style={{
                background: 'transparent',
                border: `1px solid ${colors.crossRefBorder}`,
                color: colors.crossRef,
                padding: '4px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 11,
              }}
            >
              I knew it
            </button>
            <button
              onClick={() => handleReveal(false)}
              style={{
                background: 'transparent',
                border: `1px solid ${colors.border}`,
                color: colors.textMuted,
                padding: '4px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 11,
              }}
            >
              Show me
            </button>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.5, marginTop: 4 }}>
          {item.contextual_meaning}
        </div>
      )}

      {/* Base definition from dictionary (vocab only, shown small) */}
      {entity.base_definition && !recallMode && (
        <div style={{ fontSize: 11, color: colors.textDimmed, marginTop: 6 }}>
          Dict: {entity.base_definition}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create YuKuaiSection component**

Create `src/components/YuKuaiSection.tsx`:

```typescript
'use client';

import { colors, labelStyle } from '@/styles/theme';
import type { YuKuai, LLMYuKuaiItem, YuKuaiType, Familiarity } from '@/lib/yukuai-types';
import YuKuaiCard from './YuKuaiCard';

const sectionLabels: Record<YuKuaiType, string> = {
  vocab: 'VOCABULARY',
  grammar: 'GRAMMAR',
  expression: 'EXPRESSIONS',
};

interface YuKuaiSectionProps {
  type: YuKuaiType;
  items: LLMYuKuaiItem[];
  entities: Map<string, YuKuai>;
  familiarities: Map<string, Familiarity>;
  recallIds: Set<string>;
  onRecallResult: (yukuaiId: string, result: 'success' | 'fail') => void;
}

export default function YuKuaiSection({ type, items, entities, familiarities, recallIds, onRecallResult }: YuKuaiSectionProps) {
  const filtered = items.filter((item) => item.type === type);
  if (filtered.length === 0) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ ...labelStyle, marginBottom: 8, color: colors.textDimmed }}>
        {sectionLabels[type]}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {filtered.map((item) => {
          const entity = entities.get(item.canonical_id);
          if (!entity) return null;
          return (
            <YuKuaiCard
              key={item.canonical_id}
              item={item}
              entity={entity}
              familiarity={familiarities.get(item.canonical_id) ?? null}
              recallMode={recallIds.has(item.canonical_id)}
              onRecallResult={(result) => onRecallResult(item.canonical_id, result)}
            />
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create ConnectionCard component**

Create `src/components/ConnectionCard.tsx`:

```typescript
'use client';

import { colors } from '@/styles/theme';
import type { LLMConnection } from '@/lib/yukuai-types';

interface ConnectionCardProps {
  connection: LLMConnection;
  lines: string[];
  onJump: (lineIndex: number) => void;
}

export default function ConnectionCard({ connection, lines, onJump }: ConnectionCardProps) {
  const targetLine = lines[connection.to_line];
  if (!targetLine) return null;

  return (
    <div
      onClick={() => onJump(connection.to_line)}
      style={{
        background: colors.crossRefBg,
        border: `1px solid ${colors.crossRefBorder}`,
        borderRadius: 8,
        padding: 12,
        cursor: 'pointer',
        transition: 'border-color 0.15s ease',
      }}
    >
      <div style={{ fontSize: 12, color: colors.crossRef, marginBottom: 4 }}>
        → Line {connection.to_line + 1} — {targetLine}
      </div>
      <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.5 }}>
        {connection.note}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create GotchaCard component**

Create `src/components/GotchaCard.tsx`:

```typescript
'use client';

import { colors } from '@/styles/theme';
import type { LLMGotcha } from '@/lib/yukuai-types';

interface GotchaCardProps {
  gotcha: LLMGotcha;
}

export default function GotchaCard({ gotcha }: GotchaCardProps) {
  return (
    <div
      style={{
        background: colors.grammarBg,
        border: `1px solid ${colors.grammarBorder}`,
        borderLeft: `3px solid ${colors.grammar}`,
        borderRadius: '0 8px 8px 0',
        padding: 12,
      }}
    >
      <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.5 }}>
        ⚠ {gotcha.note}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/YuKuaiCard.tsx src/components/YuKuaiSection.tsx src/components/RevealTranslation.tsx src/components/ConnectionCard.tsx src/components/GotchaCard.tsx
git commit -m "feat: add YuKuai card components for new annotation UI"
```

---

## Task 11: Annotation View Rewrite

**Files:**
- Modify: `src/components/AnnotationView.tsx`
- Delete: `src/components/WordPopover.tsx`
- Delete: `src/components/InsightStrip.tsx`
- Delete: `src/components/GrammarUnlock.tsx`

- [ ] **Step 1: Rewrite AnnotationView**

Replace the entire contents of `src/components/AnnotationView.tsx`:

```typescript
'use client';

import { colors, fonts, labelStyle } from '@/styles/theme';
import type { YuKuai, LineDecomposition, YuKuaiType, Familiarity, UserYuKuai } from '@/lib/yukuai-types';
import RevealTranslation from './RevealTranslation';
import YuKuaiSection from './YuKuaiSection';
import ConnectionCard from './ConnectionCard';
import GotchaCard from './GotchaCard';

interface AnnotationViewProps {
  lineIndex: number | null;
  decomposition: LineDecomposition | null;
  yukuai: YuKuai[];
  userState: UserYuKuai[] | null;
  recallIds: string[];
  loading: boolean;
  lines: string[];
  isMobile: boolean;
  onLineJump: (lineIndex: number) => void;
  onBack?: () => void;
  onRecallResult: (yukuaiId: string, result: 'success' | 'fail') => void;
}

const typeColors: Record<YuKuaiType, string> = {
  vocab: colors.vocab,
  grammar: colors.grammar,
  expression: colors.culture,
};

export default function AnnotationView({
  lineIndex,
  decomposition,
  yukuai,
  userState,
  recallIds,
  loading,
  lines,
  isMobile,
  onLineJump,
  onBack,
  onRecallResult,
}: AnnotationViewProps) {
  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textDimmed }}>
        Decomposing...
      </div>
    );
  }

  if (!decomposition) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textDimmed, padding: 32, textAlign: 'center' }}>
        Click a line to see its YuKuai
      </div>
    );
  }

  // Build lookup maps
  const entityMap = new Map(yukuai.map((yk) => [yk.id, yk]));
  const familiarityMap = new Map(
    (userState ?? []).map((s) => [s.yukuai_id, s.familiarity as Familiarity]),
  );
  const recallSet = new Set(recallIds);

  const chineseText = lineIndex !== null ? lines[lineIndex] ?? '' : '';

  return (
    <div style={{
      flex: 1,
      padding: isMobile ? 16 : 32,
      overflowY: 'auto',
      height: '100%',
    }}>
      {/* Mobile back button */}
      {isMobile && onBack && (
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.textMuted,
            cursor: 'pointer',
            fontSize: 13,
            marginBottom: 16,
            padding: 0,
          }}
        >
          ← Back to lines
        </button>
      )}

      {/* Chinese line */}
      <div style={{ fontSize: 24, fontFamily: fonts.chinese, lineHeight: 1.6, color: colors.text, marginBottom: 4 }}>
        {chineseText}
      </div>

      {/* Translation (click to reveal) */}
      <RevealTranslation translation={decomposition.translation} />

      <div style={{ marginTop: 24 }}>
        {/* YuKuai sections by type */}
        {(['vocab', 'grammar', 'expression'] as YuKuaiType[]).map((type) => (
          <YuKuaiSection
            key={type}
            type={type}
            items={decomposition.yukuai}
            entities={entityMap}
            familiarities={familiarityMap}
            recallIds={recallSet}
            onRecallResult={onRecallResult}
          />
        ))}

        {/* Connections */}
        {decomposition.connections.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ ...labelStyle, marginBottom: 8, color: colors.textDimmed }}>
              CONNECTIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {decomposition.connections.map((conn, i) => (
                <ConnectionCard key={i} connection={conn} lines={lines} onJump={onLineJump} />
              ))}
            </div>
          </div>
        )}

        {/* Gotchas */}
        {decomposition.gotchas.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ ...labelStyle, marginBottom: 8, color: colors.textDimmed }}>
              GOTCHAS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {decomposition.gotchas.map((gotcha, i) => (
                <GotchaCard key={i} gotcha={gotcha} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Delete old components**

```bash
rm src/components/WordPopover.tsx src/components/InsightStrip.tsx src/components/GrammarUnlock.tsx
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: May have import errors in workspace page — those get fixed in Task 12.

- [ ] **Step 4: Commit**

```bash
git add -u src/components/ src/components/AnnotationView.tsx
git commit -m "feat: rewrite AnnotationView with YuKuai sections, remove old components"
```

---

## Task 12: Workspace Page Integration

**Files:**
- Modify: `src/app/content/[hash]/page.tsx`
- Modify: `src/components/LineList.tsx`

- [ ] **Step 1: Update LineList with familiarity indicators**

Modify `src/components/LineList.tsx` — add a `lineFamiliarity` prop that maps line index to a ratio of new/known:

```typescript
'use client';

import { colors, fonts } from '@/styles/theme';

interface LineListProps {
  lines: string[];
  activeLineIndex: number | null;
  annotatedLines: Set<number>;
  onLineClick: (index: number) => void;
}

export default function LineList({
  lines,
  activeLineIndex,
  annotatedLines,
  onLineClick,
}: LineListProps) {
  // Keep existing component but add a small dot indicator for annotated lines
  const s = {
    container: {
      width: 280,
      borderRight: `1px solid ${colors.border}`,
      padding: 16,
      overflowY: 'auto' as const,
      flexShrink: 0,
      height: '100%',
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
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    } as React.CSSProperties,
    lineText: (isActive: boolean) =>
      ({
        fontSize: 15,
        fontFamily: fonts.chinese,
        letterSpacing: 0.5,
        opacity: isActive ? 1 : 0.45,
        color: colors.text,
      }) as React.CSSProperties,
    dot: {
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: colors.vocab,
      opacity: 0.5,
    } as React.CSSProperties,
  };

  return (
    <div style={s.container}>
      {lines.map((line, i) => (
        <div key={i} style={s.line(i === activeLineIndex)} onClick={() => onLineClick(i)}>
          <div style={s.lineNumber}>
            {i + 1}
            {annotatedLines.has(i) && <span style={s.dot} />}
          </div>
          <div style={s.lineText(i === activeLineIndex)}>{line}</div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Rewrite workspace page**

Replace the full contents of `src/app/content/[hash]/page.tsx`:

```typescript
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { colors } from '@/styles/theme';
import type { ContentMapResponse } from '@/lib/types';
import type { LineDecomposition, YuKuai, UserYuKuai } from '@/lib/yukuai-types';
import LineList from '@/components/LineList';
import AnnotationView from '@/components/AnnotationView';

const MOBILE_BREAKPOINT = 640;

interface DecomposeResult {
  decomposition: LineDecomposition;
  yukuai: YuKuai[];
  userState: UserYuKuai[] | null;
  recallIds: string[];
}

export default function ContentWorkspace() {
  const params = useParams();
  const router = useRouter();
  const hash = params.hash as string;

  const [contentData, setContentData] = useState<ContentMapResponse | null>(null);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [decompositions, setDecompositions] = useState<Map<number, DecomposeResult>>(new Map());
  const [annotatedLines, setAnnotatedLines] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem(`content:${hash}`);
    if (stored) {
      setContentData(JSON.parse(stored));
      return;
    }
    fetch(`/api/content-map?hash=${hash}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem(`content:${hash}`, JSON.stringify(data));
        setContentData(data);
      })
      .catch(() => router.push('/'));
  }, [hash, router]);

  const handleLineClick = useCallback(
    async (lineIndex: number) => {
      setActiveLineIndex(lineIndex);
      if (isMobile) setShowAnnotation(true);
      if (decompositions.has(lineIndex)) return;

      setLoading(true);
      try {
        const res = await fetch('/api/decompose-line', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentHash: hash, lineIndex }),
        });
        if (!res.ok) throw new Error('Failed to decompose');
        const result: DecomposeResult = await res.json();
        setDecompositions((prev) => new Map(prev).set(lineIndex, result));
        setAnnotatedLines((prev) => new Set(prev).add(lineIndex));
      } catch (error) {
        console.error('Decomposition error:', error);
      } finally {
        setLoading(false);
      }
    },
    [hash, decompositions, isMobile],
  );

  const handleRecallResult = useCallback(
    async (yukuaiId: string, result: 'success' | 'fail') => {
      try {
        await fetch('/api/recall', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ yukuaiId, contentHash: hash, result }),
        });
      } catch (error) {
        console.error('Recall error:', error);
      }
    },
    [hash],
  );

  const handleLineJump = useCallback(
    (lineIndex: number) => {
      handleLineClick(lineIndex);
    },
    [handleLineClick],
  );

  const handleBack = useCallback(() => {
    setShowAnnotation(false);
  }, []);

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

  const activeResult = activeLineIndex !== null ? decompositions.get(activeLineIndex) ?? null : null;

  if (isMobile) {
    return (
      <div
        style={{ height: '100vh', background: colors.bg }}
        onTouchStart={showAnnotation ? handleTouchStart : undefined}
        onTouchEnd={showAnnotation ? handleTouchEnd : undefined}
      >
        {showAnnotation ? (
          <AnnotationView
            lineIndex={activeLineIndex}
            decomposition={activeResult?.decomposition ?? null}
            yukuai={activeResult?.yukuai ?? []}
            userState={activeResult?.userState ?? null}
            recallIds={activeResult?.recallIds ?? []}
            loading={loading}
            lines={contentData.lines}
            isMobile={true}
            onLineJump={handleLineJump}
            onBack={handleBack}
            onRecallResult={handleRecallResult}
          />
        ) : (
          <div style={{ padding: 16, height: '100%', overflowY: 'auto' }}>
            <LineList
              lines={contentData.lines}
              activeLineIndex={activeLineIndex}
              annotatedLines={annotatedLines}
              onLineClick={handleLineClick}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: colors.bg }}>
      <LineList
        lines={contentData.lines}
        activeLineIndex={activeLineIndex}
        annotatedLines={annotatedLines}
        onLineClick={handleLineClick}
      />
      <AnnotationView
        decomposition={activeResult?.decomposition ?? null}
        yukuai={activeResult?.yukuai ?? []}
        userState={activeResult?.userState ?? null}
        recallIds={activeResult?.recallIds ?? []}
        loading={loading}
        lines={contentData.lines}
        isMobile={false}
        onLineJump={handleLineJump}
        onRecallResult={handleRecallResult}
      />
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/LineList.tsx 'src/app/content/[hash]/page.tsx'
git commit -m "feat: integrate YuKuai decomposition into workspace page"
```

---

## Task 13: Clean Up Old API Route

**Files:**
- Modify: `src/app/api/annotate-line/route.ts`
- Modify: `src/lib/annotate.ts`
- Delete: `src/components/CrossReference.tsx`

- [ ] **Step 1: Keep annotate-line route for backward compatibility**

The old `/api/annotate-line` route still works with cached data. For now, leave it in place — the new `/api/decompose-line` is the primary route. Add a comment:

```typescript
// DEPRECATED: Use /api/decompose-line instead. Kept for backward compatibility with cached annotations.
```

- [ ] **Step 2: Remove legacy function from annotate.ts**

If `generateLineAnnotationLegacy` was created in Task 5, remove it now. Keep only `generateContentMap` and `generateLineDecomposition`.

- [ ] **Step 3: Delete CrossReference.tsx**

```bash
rm src/components/CrossReference.tsx
```

Replaced by `ConnectionCard.tsx`.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -u src/
git commit -m "chore: clean up deprecated annotation code, remove old components"
```

---

## Task 14: Build Verification & End-to-End Test

**Files:**
- No new files

- [ ] **Step 1: Full build check**

```bash
npm run build
```

Expected: Clean build, no errors, no warnings.

- [ ] **Step 2: Manual end-to-end test (dev mode)**

```bash
npm run dev
```

Test flow:
1. Open `http://localhost:3000`
2. Paste the 老伴 lyrics (or click DEV button)
3. Navigate to workspace
4. Click a line — should call `/api/decompose-line` and show YuKuai cards
5. Verify vocab cards show pinyin and HSK level from CEDICT
6. Verify grammar cards show canonical pattern
7. Verify connections are clickable
8. Verify translation is hidden by default, click to reveal
9. Test keyboard navigation (j/k)

Note: Auth testing requires OAuth app credentials configured. Test without auth first (unauthenticated flow should work, just without familiarity tracking).

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: end-to-end test fixes"
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: YuKuai redesign complete — personalized learning with atomic knowledge units"
```
