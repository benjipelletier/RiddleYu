import { neon } from '@neondatabase/serverless';
import type { ContentMap, ContentMetadata, LineAnnotation, ContentRow } from './types';
import type { YuKuai, YuKuaiEncounter, UserYuKuai, Familiarity, LineDecomposition } from './yukuai-types';

let _sql: ReturnType<typeof neon> | null = null;
function getSql() {
  if (!_sql) {
    _sql = neon(process.env.DATABASE_URL!);
  }
  return _sql;
}

// ─── Schema Setup ────────────────────────────────────────────────────────────

let tablesEnsured = false;

export async function ensureTables() {
  if (tablesEnsured) return;
  const sql = getSql();
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
  tablesEnsured = true;
}

// ─── Content Map ─────────────────────────────────────────────────────────────

export async function getContent(contentHash: string): Promise<ContentRow | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM contents WHERE content_hash = ${contentHash}
  ` as Record<string, unknown>[];
  return (rows[0] as unknown as ContentRow) ?? null;
}

export async function storeContent(
  contentHash: string,
  sourceText: string,
  contentMap: ContentMap,
  metadata: ContentMetadata,
): Promise<void> {
  const sql = getSql();
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
  const sql = getSql();
  const rows = await sql`
    SELECT annotation FROM line_annotations
    WHERE content_hash = ${contentHash} AND line_index = ${lineIndex}
  ` as Record<string, unknown>[];
  const row = rows[0] as unknown as { annotation: LineAnnotation } | undefined;
  return row?.annotation ?? null;
}

export async function storeLineAnnotation(
  contentHash: string,
  lineIndex: number,
  annotation: LineAnnotation,
): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO line_annotations (content_hash, line_index, annotation)
    VALUES (${contentHash}, ${lineIndex}, ${JSON.stringify(annotation)})
    ON CONFLICT (content_hash, line_index) DO UPDATE SET
      annotation = ${JSON.stringify(annotation)},
      version = line_annotations.version + 1
  `;
}

// ─── YuKuai ──────────────────────────────────────────────────────────────────

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

// ─── Line Decomposition Cache ────────────────────────────────────────────────

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
