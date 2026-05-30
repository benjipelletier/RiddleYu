// One-off migration: prune the matrix.
//   - Drop Sustained-bass × 3 and Half-bass × 3 (keep Quarter-bass × 3).
//   - Replace the two separate comping skills (Drop-2 voicings + Block
//     chords) with a single combined row "Drop-2s / block chords" since
//     in practice they're freely mixed within a comping session.
//
// Practice items referencing deleted skills are removed via the
// ON DELETE CASCADE on practice_session_items.skill_id.
//
// Usage: JAZZ_DATABASE_URL=... npx tsx jazz/scripts/prune-skill-matrix.ts
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.JAZZ_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('JAZZ_DATABASE_URL is required');
  process.exit(1);
}
const sql = neon(DATABASE_URL);

async function main() {
  console.log('Removing sustained-bass and half-bass rows...');
  const removedBass = await sql`
    DELETE FROM checklist_skills
    WHERE lh_group = 'bass' AND lh_part IN ('sustained-bass', 'half-bass')
    RETURNING name
  `;
  console.log(`  Removed ${removedBass.length} bass rows.`);

  console.log('Removing separate comping rows (will be replaced)...');
  const removedComping = await sql`
    DELETE FROM checklist_skills
    WHERE lh_group = 'comping'
    RETURNING name
  `;
  console.log(`  Removed ${removedComping.length} comping rows.`);

  console.log('Inserting combined "Drop-2s / block chords"...');
  await sql`
    INSERT INTO checklist_skills (name, sort_order, lh_group, lh_part, rh_part, mode, tracks_bpm)
    VALUES ('Drop-2s / block chords', 16, 'comping', 'two-hand', 'combined', 'trio', TRUE)
  `;

  const count = await sql`SELECT count(*)::int AS c FROM checklist_skills`;
  console.log(`Done. checklist_skills now has ${(count[0] as { c: number }).c} rows.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
