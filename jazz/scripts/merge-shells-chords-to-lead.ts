// One-off migration: merge the Shells and Chords sections into a single
// "Lead" section. Both are LH voicings under a RH that carries melody or
// solo — practically the same activity from a logging perspective.
//
// Usage: JAZZ_DATABASE_URL=... npx tsx jazz/scripts/merge-shells-chords-to-lead.ts
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.JAZZ_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('JAZZ_DATABASE_URL is required');
  process.exit(1);
}
const sql = neon(DATABASE_URL);

async function main() {
  const updated = await sql`
    UPDATE checklist_skills
    SET lh_group = 'lead'
    WHERE lh_group IN ('shells', 'chords')
    RETURNING name
  `;
  console.log(`Re-grouped ${updated.length} rows into 'lead'.`);

  const rows = await sql`
    SELECT lh_group, lh_part, rh_part, name, sort_order
    FROM checklist_skills
    ORDER BY sort_order
  `;
  console.log(JSON.stringify(rows, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
