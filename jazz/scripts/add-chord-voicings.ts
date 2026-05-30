// One-off migration: add chord_voicings for saving Willy Special (and
// future) voicings per chord symbol.
//
// Usage: JAZZ_DATABASE_URL=... npx tsx jazz/scripts/add-chord-voicings.ts
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.JAZZ_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('JAZZ_DATABASE_URL is required');
  process.exit(1);
}
const sql = neon(DATABASE_URL);

async function main() {
  console.log('Creating chord_voicings...');
  await sql`
    CREATE TABLE IF NOT EXISTS chord_voicings (
      id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      chord_symbol        TEXT NOT NULL,
      base_symbol         TEXT NOT NULL,
      voicing_type        TEXT NOT NULL DEFAULT 'willy',
      notes               INT[] NOT NULL,
      label               TEXT,
      sort_order          INT NOT NULL DEFAULT 0,
      origin_standard_id  UUID REFERENCES standards(id) ON DELETE SET NULL,
      created_by          TEXT,
      created_at          TIMESTAMPTZ DEFAULT NOW(),
      updated_at          TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_chord_voicings_symbol ON chord_voicings(chord_symbol, voicing_type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_chord_voicings_base   ON chord_voicings(base_symbol, voicing_type)`;

  const count = await sql`SELECT count(*)::int AS c FROM chord_voicings`;
  console.log(`Done. chord_voicings has ${(count[0] as { c: number }).c} rows.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
