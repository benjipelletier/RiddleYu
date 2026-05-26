// One-off migration: backfill standards.form from jazz/data/standards.json.
// Usage: JAZZ_DATABASE_URL=... npx tsx jazz/scripts/migrate-form.ts
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = process.env.JAZZ_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('JAZZ_DATABASE_URL is required');
  process.exit(1);
}
const sql = neon(DATABASE_URL);

interface Rec {
  title: string;
  composer: string | null;
  form: string | null;
}

async function main() {
  const path = join(__dirname, '..', 'data', 'standards.json');
  const records: Rec[] = JSON.parse(readFileSync(path, 'utf-8'));
  const withForm = records.filter(r => r.form);
  console.log(`Updating ${withForm.length}/${records.length} rows with form info...`);
  let updated = 0;
  const BATCH = 50;
  for (let i = 0; i < withForm.length; i += BATCH) {
    const batch = withForm.slice(i, i + BATCH);
    await Promise.all(batch.map(async r => {
      const res = await sql`
        UPDATE standards
        SET form = ${r.form}
        WHERE title = ${r.title}
          AND (composer IS NOT DISTINCT FROM ${r.composer})
      `;
      // Neon returns RowList with length; not strictly needed to inspect.
      updated += res.length ?? 1;
    }));
    if (i % 200 === 0 && i > 0) console.log(`  ${i}/${withForm.length}`);
  }
  console.log(`Done. (best-effort count: ${updated})`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
