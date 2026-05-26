// One-off migration: switch checklist_skills from the old 10-skill checklist
// to the new trio-mode matrix (15 cells, LH × RH). Wipes existing
// practice_sessions + items (user authorized this).
//
// Usage: JAZZ_DATABASE_URL=... npx tsx jazz/scripts/migrate-skill-matrix.ts
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.JAZZ_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('JAZZ_DATABASE_URL is required');
  process.exit(1);
}
const sql = neon(DATABASE_URL);

const TRIO_CELLS: { name: string; lh_group: string; lh_part: string; rh_part: string }[] = [
  { name: 'LH 3-7s · RH melody',          lh_group: 'shells', lh_part: '3-7s',           rh_part: 'melody' },
  { name: 'LH 3-7s · RH solo',            lh_group: 'shells', lh_part: '3-7s',           rh_part: 'solo'   },
  { name: 'LH Stock · RH melody',         lh_group: 'chords', lh_part: 'stock',          rh_part: 'melody' },
  { name: 'LH Stock · RH solo',           lh_group: 'chords', lh_part: 'stock',          rh_part: 'solo'   },
  { name: 'LH Willy Special · RH melody', lh_group: 'chords', lh_part: 'willy',          rh_part: 'melody' },
  { name: 'LH Willy Special · RH solo',   lh_group: 'chords', lh_part: 'willy',          rh_part: 'solo'   },
  { name: 'Sustained bass · RH 3-7s',     lh_group: 'bass',   lh_part: 'sustained-bass', rh_part: '3-7s'   },
  { name: 'Sustained bass · RH stock',    lh_group: 'bass',   lh_part: 'sustained-bass', rh_part: 'stock'  },
  { name: 'Sustained bass · RH melody',   lh_group: 'bass',   lh_part: 'sustained-bass', rh_part: 'melody' },
  { name: 'Half-bass · RH 3-7s',          lh_group: 'bass',   lh_part: 'half-bass',      rh_part: '3-7s'   },
  { name: 'Half-bass · RH stock',         lh_group: 'bass',   lh_part: 'half-bass',      rh_part: 'stock'  },
  { name: 'Half-bass · RH melody',        lh_group: 'bass',   lh_part: 'half-bass',      rh_part: 'melody' },
  { name: 'Quarter-bass · RH 3-7s',       lh_group: 'bass',   lh_part: 'quarter-bass',   rh_part: '3-7s'   },
  { name: 'Quarter-bass · RH stock',      lh_group: 'bass',   lh_part: 'quarter-bass',   rh_part: 'stock'  },
  { name: 'Quarter-bass · RH melody',     lh_group: 'bass',   lh_part: 'quarter-bass',   rh_part: 'melody' },
];

async function main() {
  console.log('Adding matrix columns to checklist_skills...');
  await sql`ALTER TABLE checklist_skills ADD COLUMN IF NOT EXISTS lh_group TEXT`;
  await sql`ALTER TABLE checklist_skills ADD COLUMN IF NOT EXISTS lh_part TEXT`;
  await sql`ALTER TABLE checklist_skills ADD COLUMN IF NOT EXISTS rh_part TEXT`;
  await sql`ALTER TABLE checklist_skills ADD COLUMN IF NOT EXISTS mode TEXT NOT NULL DEFAULT 'trio'`;

  console.log('Wiping existing practice sessions + items (cascades to items)...');
  await sql`TRUNCATE practice_sessions CASCADE`;

  console.log('Removing old checklist skills...');
  await sql`DELETE FROM checklist_skills`;

  console.log(`Inserting ${TRIO_CELLS.length} matrix cells...`);
  let i = 1;
  for (const c of TRIO_CELLS) {
    await sql`
      INSERT INTO checklist_skills (name, sort_order, lh_group, lh_part, rh_part, mode, tracks_bpm)
      VALUES (${c.name}, ${i}, ${c.lh_group}, ${c.lh_part}, ${c.rh_part}, 'trio', TRUE)
    `;
    i++;
  }

  const count = await sql`SELECT count(*)::int AS c FROM checklist_skills`;
  console.log(`Done. checklist_skills has ${(count[0] as { c: number }).c} rows.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
