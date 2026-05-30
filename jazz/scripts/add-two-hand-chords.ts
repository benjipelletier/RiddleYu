// One-off migration: add a new "Comping" section to the trio matrix with
// two-handed voicings (Drop-2 voicings, Block chords). These don't fit
// the LH × RH split used by the other sections, so they share a single
// lh_part = 'two-hand' bucket within a new lh_group = 'comping'.
//
// Usage: JAZZ_DATABASE_URL=... npx tsx jazz/scripts/add-two-hand-chords.ts
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.JAZZ_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('JAZZ_DATABASE_URL is required');
  process.exit(1);
}
const sql = neon(DATABASE_URL);

const NEW_SKILLS: { name: string; rh_part: string; sort_order: number }[] = [
  { name: 'Drop-2 voicings', rh_part: 'drop2', sort_order: 16 },
  { name: 'Block chords',    rh_part: 'block', sort_order: 17 },
];

async function main() {
  for (const sk of NEW_SKILLS) {
    const existing = await sql`
      SELECT id FROM checklist_skills
      WHERE lh_group = 'comping' AND lh_part = 'two-hand' AND rh_part = ${sk.rh_part}
    `;
    if (existing.length > 0) {
      console.log(`Skipping ${sk.name} (already exists).`);
      continue;
    }
    await sql`
      INSERT INTO checklist_skills (name, sort_order, lh_group, lh_part, rh_part, mode, tracks_bpm)
      VALUES (${sk.name}, ${sk.sort_order}, 'comping', 'two-hand', ${sk.rh_part}, 'trio', TRUE)
    `;
    console.log(`Inserted ${sk.name}.`);
  }

  const count = await sql`SELECT count(*)::int AS c FROM checklist_skills`;
  console.log(`Done. checklist_skills now has ${(count[0] as { c: number }).c} rows.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
