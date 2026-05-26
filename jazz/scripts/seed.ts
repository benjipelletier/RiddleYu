// Usage:
//   JAZZ_DATABASE_URL=postgres://... npx tsx jazz/scripts/seed.ts
//
// Seeds standards + checklist_skills. User identities are managed by Neon Auth
// (Stack) and live in neon_auth.users_sync — they are NOT seeded here. The
// owner user record will be created the first time you sign in via Stack.
//
// Idempotent: re-running won't duplicate rows.
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = process.env.JAZZ_DATABASE_URL;
if (!DATABASE_URL) {
  console.error('JAZZ_DATABASE_URL is required');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

interface StandardRecord {
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  isMinor: boolean;
  sourceBpm: number | null;
  targetBpm: number;
  bpmSource: 'ireal' | 'style_heuristic' | 'manual';
  timeSignature: string;
  form: string | null;
  chartData: string[][];
}

async function runSchema() {
  const schema = readFileSync(join(__dirname, '..', 'db', 'schema.sql'), 'utf-8');
  // Strip line comments before splitting so a leading comment block doesn't
  // get glued onto the first CREATE TABLE.
  const stripped = schema
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');
  const statements = stripped
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);
  for (const stmt of statements) {
    await sql.query(stmt);
  }
  console.log(`Schema applied (${statements.length} statements).`);
}

// Trio-mode matrix: LH technique × valid RH partners.
// 6 LH techniques (in 3 groups) × ~2-3 RH partners each = 15 cells.
const TRIO_CELLS: {
  name: string; lh_group: string; lh_part: string; rh_part: string;
}[] = [
  // Shells
  { name: 'LH 3-7s · RH melody',          lh_group: 'shells', lh_part: '3-7s',           rh_part: 'melody' },
  { name: 'LH 3-7s · RH solo',            lh_group: 'shells', lh_part: '3-7s',           rh_part: 'solo'   },
  // Chords
  { name: 'LH Stock · RH melody',         lh_group: 'chords', lh_part: 'stock',          rh_part: 'melody' },
  { name: 'LH Stock · RH solo',           lh_group: 'chords', lh_part: 'stock',          rh_part: 'solo'   },
  { name: 'LH Willy Special · RH melody', lh_group: 'chords', lh_part: 'willy',          rh_part: 'melody' },
  { name: 'LH Willy Special · RH solo',   lh_group: 'chords', lh_part: 'willy',          rh_part: 'solo'   },
  // Bass
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

async function seedSkills() {
  const existing = await sql`SELECT count(*)::int AS c FROM checklist_skills`;
  if ((existing[0] as { c: number }).c > 0) {
    console.log('Checklist skills already exist, skipping.');
    return;
  }
  let i = 1;
  for (const c of TRIO_CELLS) {
    await sql`
      INSERT INTO checklist_skills (name, sort_order, lh_group, lh_part, rh_part, mode, tracks_bpm)
      VALUES (${c.name}, ${i}, ${c.lh_group}, ${c.lh_part}, ${c.rh_part}, 'trio', TRUE)
    `;
    i++;
  }
  console.log(`Checklist skills seeded (${TRIO_CELLS.length} trio-mode cells).`);
}

async function seedStandards() {
  const dataPath = join(__dirname, '..', 'data', 'standards.json');
  const records: StandardRecord[] = JSON.parse(readFileSync(dataPath, 'utf-8'));

  const existing = await sql`SELECT count(*)::int AS c FROM standards`;
  const existingCount = (existing[0] as { c: number }).c;
  if (existingCount > 0) {
    console.log(`Standards already exist (${existingCount}), skipping.`);
    return;
  }

  console.log(`Inserting ${records.length} standards...`);
  let inserted = 0;
  const BATCH = 50;
  for (let i = 0; i < records.length; i += BATCH) {
    const batch = records.slice(i, i + BATCH);
    await Promise.all(batch.map(r => sql`
      INSERT INTO standards (
        title, composer, style, home_key, is_minor,
        source_bpm, target_bpm, bpm_source,
        time_signature, form, chart_data
      ) VALUES (
        ${r.title}, ${r.composer}, ${r.style}, ${r.homeKey}, ${r.isMinor},
        ${r.sourceBpm}, ${r.targetBpm}, ${r.bpmSource},
        ${r.timeSignature}, ${r.form}, ${JSON.stringify(r.chartData)}::jsonb
      )
      ON CONFLICT (title, composer) DO NOTHING
    `));
    inserted += batch.length;
    if (inserted % 200 === 0) console.log(`  ${inserted}/${records.length}`);
  }
  console.log(`Standards seeded: ${inserted}`);
}

async function main() {
  console.log('Seeding jazz DB...');
  await runSchema();
  await seedSkills();
  await seedStandards();
  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
