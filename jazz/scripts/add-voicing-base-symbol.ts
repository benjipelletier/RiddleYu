// One-off migration: add base_symbol column to chord_voicings so that
// altered dominants (E7b9, E7#9, E7alt) share voicings BOTH ways with
// their base form (E7). Backfills existing rows.
//
// Usage: JAZZ_DATABASE_URL=... npx tsx jazz/scripts/add-voicing-base-symbol.ts
import { neon } from '@neondatabase/serverless';
import { baseChordSymbol } from '../lib/chord-symbol';

const DATABASE_URL = process.env.JAZZ_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('JAZZ_DATABASE_URL is required');
  process.exit(1);
}
const sql = neon(DATABASE_URL);

async function main() {
  console.log('Adding base_symbol column...');
  await sql`ALTER TABLE chord_voicings ADD COLUMN IF NOT EXISTS base_symbol TEXT`;

  console.log('Backfilling base_symbol for existing rows...');
  const rows = await sql`SELECT id, chord_symbol FROM chord_voicings WHERE base_symbol IS NULL OR base_symbol = ''`;
  let n = 0;
  for (const r of rows as { id: string; chord_symbol: string }[]) {
    const base = baseChordSymbol(r.chord_symbol);
    await sql`UPDATE chord_voicings SET base_symbol = ${base} WHERE id = ${r.id}`;
    n++;
  }
  console.log(`  Backfilled ${n} rows.`);

  console.log('Setting NOT NULL constraint + index...');
  await sql`ALTER TABLE chord_voicings ALTER COLUMN base_symbol SET NOT NULL`;
  await sql`CREATE INDEX IF NOT EXISTS idx_chord_voicings_base ON chord_voicings(base_symbol, voicing_type)`;

  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
