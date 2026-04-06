/**
 * Seed script for the 知识引擎 database.
 *
 * Idempotent: truncates all tables and re-seeds from scratch.
 *
 * Usage: npm run seed
 */

import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';
import * as path from 'path';
import { VOCABULARY } from './data/vocabulary';
import { FIELDS } from './data/fields';
import { GRAMMAR } from './data/grammar';

// Load env
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL not set. Create .env.local with DATABASE_URL=...');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

// --- Learner profile: field strength determines confidence ---
const FIELD_STRENGTHS: Record<string, number> = {
  emotions: 0.78,
  daily_life: 0.85,
  relationships: 0.76,
  music_arts: 0.82,
  food_cooking: 0.60,
  nature: 0.55,
  travel: 0.55,
  history_culture: 0.50,
  work_business: 0.35,
  technology: 0.30,
  politics_law: 0.15,
  health_medicine: 0.20,
};

// HSK level modifiers (higher level = lower base confidence)
const HSK_MODIFIERS: Record<number, number> = {
  1: 0.20,  // boost
  2: 0.15,
  3: 0.05,
  4: -0.10,
  5: -0.25,
};

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function noise(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// Seeded random for reproducibility
let seed = 42;
function seededRandom() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

function seededNoise(min: number, max: number) {
  return min + seededRandom() * (max - min);
}

interface ConfidenceResult {
  recognition: number;
  production: number;
  register_awareness: number;
  collocational_prec: number;
  recognition_uncertainty: number;
  production_uncertainty: number;
  register_uncertainty: number;
  collocational_uncertainty: number;
  peak_recognition: number;
  peak_production: number;
  learning_state: string;
  context_breadth: number;
  encounter_count: number;
}

function generateConfidence(hsk_level: number, fields: string[]): ConfidenceResult {
  // Base from strongest field
  const fieldStrength = Math.max(...fields.map(f => FIELD_STRENGTHS[f] ?? 0.3));
  const hskMod = HSK_MODIFIERS[hsk_level] ?? 0;

  const baseRec = clamp(fieldStrength + hskMod + seededNoise(-0.15, 0.15), 0, 0.98);
  // Production always lags recognition
  const prodGap = 0.15 + seededRandom() * 0.25;
  const baseProd = clamp(baseRec - prodGap, 0, baseRec);
  // Register awareness and collocational precision lag further
  const regAware = clamp(baseRec * (0.3 + seededRandom() * 0.35), 0, 1);
  const collocPrec = clamp(baseRec * (0.2 + seededRandom() * 0.3), 0, 1);

  // Uncertainty: inversely correlated with confidence + encounter count
  const baseUncertainty = clamp(1.0 - baseRec * 0.8 + seededNoise(-0.1, 0.1), 0.05, 1.0);

  // Peak is at or slightly above current (some words may have decayed)
  const peakRec = clamp(baseRec + seededRandom() * 0.1, baseRec, 1.0);
  const peakProd = clamp(baseProd + seededRandom() * 0.05, baseProd, peakRec);

  // Learning state from peak recognition
  let learning_state: string;
  if (peakRec < 0.6) {
    learning_state = 'new';
  } else if (baseRec >= 0.5) {
    learning_state = 'acquired';
  } else if (baseRec >= 0.3) {
    learning_state = 'decaying';
  } else {
    learning_state = 'forgotten';
  }

  // Context breadth and encounter count correlate with confidence
  const encounter_count = Math.max(0, Math.round(baseRec * 40 + seededNoise(-5, 10)));
  const context_breadth = Math.min(encounter_count, Math.max(0, Math.round(baseRec * 8 + seededNoise(-1, 2))));

  return {
    recognition: Math.round(baseRec * 1000) / 1000,
    production: Math.round(baseProd * 1000) / 1000,
    register_awareness: Math.round(regAware * 1000) / 1000,
    collocational_prec: Math.round(collocPrec * 1000) / 1000,
    recognition_uncertainty: Math.round(baseUncertainty * 1000) / 1000,
    production_uncertainty: Math.round(clamp(baseUncertainty + 0.1, 0.05, 1.0) * 1000) / 1000,
    register_uncertainty: Math.round(clamp(baseUncertainty + 0.2, 0.1, 1.0) * 1000) / 1000,
    collocational_uncertainty: Math.round(clamp(baseUncertainty + 0.25, 0.1, 1.0) * 1000) / 1000,
    peak_recognition: Math.round(peakRec * 1000) / 1000,
    peak_production: Math.round(peakProd * 1000) / 1000,
    learning_state,
    context_breadth,
    encounter_count,
  };
}

async function runSchema() {
  console.log('Running schema...');
  const schemaSQL = fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf-8');
  // Split on semicolons and run each statement
  const statements = schemaSQL
    .split(';')
    .map(s => s.replace(/--.*$/gm, '').trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    await sql.query(stmt);
  }
  console.log('Schema created.');
}

async function truncateAll() {
  console.log('Truncating all tables...');
  await sql.query('TRUNCATE encounters, edges, characters, lexical_units, grammar_constructions, semantic_fields, content_learner_overlay, content_grammar, content_tokens, content_segments, content_items CASCADE');
  console.log('Tables truncated.');
}

async function seedFields(): Promise<Map<string, string>> {
  console.log('Seeding semantic fields...');
  const fieldIds = new Map<string, string>();

  for (const f of FIELDS) {
    const rows = await sql.query(
      `INSERT INTO semantic_fields (name, name_zh, description) VALUES ($1, $2, $3) RETURNING id`,
      [f.name, f.name_zh, f.description]
    );
    fieldIds.set(f.name, rows[0].id);
  }

  console.log(`  Seeded ${FIELDS.length} fields.`);
  return fieldIds;
}

async function seedGrammar(): Promise<Map<string, string>> {
  console.log('Seeding grammar constructions...');
  const grammarIds = new Map<string, string>();

  const now = new Date();
  for (const g of GRAMMAR) {
    const lastReinforced = new Date(now.getTime() - (5 + Math.random() * 25) * 86400000);
    const rows = await sql.query(
      `INSERT INTO grammar_constructions (pattern_name, pattern_template, description, comprehension, production, complexity_tier, common_errors, last_reinforced)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [g.pattern_name, g.pattern_template, g.description, g.comprehension, g.production, g.complexity_tier, JSON.stringify(g.common_errors), lastReinforced.toISOString()]
    );
    grammarIds.set(g.pattern_name, rows[0].id);
  }

  console.log(`  Seeded ${GRAMMAR.length} grammar constructions.`);
  return grammarIds;
}

async function seedLexicalUnits(fieldIds: Map<string, string>): Promise<Map<string, { id: string; surface: string; fields: string[]; conf: ConfidenceResult }>> {
  console.log('Seeding lexical units...');
  const nodeMap = new Map<string, { id: string; surface: string; fields: string[]; conf: ConfidenceResult }>();

  const now = new Date();
  const batchSize = 50;

  for (let i = 0; i < VOCABULARY.length; i += batchSize) {
    const batch = VOCABULARY.slice(i, i + batchSize);

    for (const v of batch) {
      const conf = generateConfidence(v.hsk_level, v.fields);
      const daysAgoRec = Math.round(1 + seededRandom() * 28);
      const daysAgoProd = Math.round(3 + seededRandom() * 28);
      const lastRec = conf.recognition > 0.1 ? new Date(now.getTime() - daysAgoRec * 86400000) : null;
      const lastProd = conf.production > 0.1 ? new Date(now.getTime() - daysAgoProd * 86400000) : null;

      const chars = [...v.surface_form].filter(c => /[\u4e00-\u9fff]/.test(c));

      const rows = await sql.query(
        `INSERT INTO lexical_units (
          surface_form, pinyin, primary_gloss, unit_type,
          recognition, production, register_awareness, collocational_prec,
          recognition_uncertainty, production_uncertainty, register_uncertainty, collocational_uncertainty,
          learning_state,
          last_reinforced_recognition, last_reinforced_production,
          peak_recognition, peak_production,
          frequency_rank, registers, complexity_tier, component_chars,
          context_breadth, encounter_count
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING id`,
        [
          v.surface_form, v.pinyin, v.primary_gloss, v.unit_type,
          conf.recognition, conf.production, conf.register_awareness, conf.collocational_prec,
          conf.recognition_uncertainty, conf.production_uncertainty, conf.register_uncertainty, conf.collocational_uncertainty,
          conf.learning_state,
          lastRec?.toISOString() ?? null, lastProd?.toISOString() ?? null,
          conf.peak_recognition, conf.peak_production,
          v.hsk_level * 200 + i, `{${v.registers.join(',')}}`, v.complexity_tier, `{${chars.join(',')}}`,
          conf.context_breadth, conf.encounter_count,
        ]
      );

      nodeMap.set(v.surface_form, {
        id: rows[0].id,
        surface: v.surface_form,
        fields: v.fields,
        conf,
      });
    }

    if ((i + batchSize) % 500 === 0 || i + batchSize >= VOCABULARY.length) {
      console.log(`  ${Math.min(i + batchSize, VOCABULARY.length)}/${VOCABULARY.length} words...`);
    }
  }

  console.log(`  Seeded ${VOCABULARY.length} lexical units.`);
  return nodeMap;
}

async function seedCharacters(nodeMap: Map<string, { id: string; surface: string; fields: string[]; conf: ConfidenceResult }>): Promise<Map<string, string>> {
  console.log('Seeding characters...');
  const charMap = new Map<string, string>();
  const charWordsMap = new Map<string, { recognition: number }[]>();

  // Collect all unique characters and their containing words
  for (const [surface, node] of nodeMap) {
    for (const c of surface) {
      if (/[\u4e00-\u9fff]/.test(c)) {
        if (!charWordsMap.has(c)) charWordsMap.set(c, []);
        charWordsMap.get(c)!.push({ recognition: node.conf.recognition });
      }
    }
  }

  for (const [char, words] of charWordsMap) {
    const knownWords = words.filter(w => w.recognition > 0.5);
    const familiarity = knownWords.length > 0
      ? (1 - Math.exp(-0.3 * knownWords.length)) *
        (knownWords.reduce((s, w) => s + w.recognition, 0) / knownWords.length)
      : 0;

    const rows = await sql.query(
      `INSERT INTO characters (character, pinyin_readings, familiarity, known_word_count)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [char, '{}', Math.round(familiarity * 1000) / 1000, knownWords.length]
    );
    charMap.set(char, rows[0].id);
  }

  console.log(`  Seeded ${charMap.size} characters.`);
  return charMap;
}

async function seedEdges(
  nodeMap: Map<string, { id: string; surface: string; fields: string[]; conf: ConfidenceResult }>,
  fieldIds: Map<string, string>,
  charMap: Map<string, string>,
  grammarIds: Map<string, string>,
) {
  console.log('Seeding edges...');
  let edgeCount = 0;

  // 1. belongs_to_field edges
  for (const [surface, node] of nodeMap) {
    for (const fieldName of node.fields) {
      const fieldId = fieldIds.get(fieldName);
      if (!fieldId) continue;
      await sql.query(
        `INSERT INTO edges (source_id, target_id, source_type, target_type, edge_type, metadata, weight)
         VALUES ($1, $2, 'lexical', 'field', 'belongs_to_field', $3, 1.0)
         ON CONFLICT (source_id, target_id, edge_type) DO NOTHING`,
        [node.id, fieldId, JSON.stringify({ centrality: 0.5 + seededRandom() * 0.5 })]
      );
      edgeCount++;
    }
  }
  console.log(`  ${edgeCount} belongs_to_field edges...`);

  // 2. contains_char edges
  let charEdges = 0;
  for (const [surface, node] of nodeMap) {
    const chars = [...surface].filter(c => /[\u4e00-\u9fff]/.test(c));
    for (let pos = 0; pos < chars.length; pos++) {
      const charId = charMap.get(chars[pos]);
      if (!charId) continue;
      await sql.query(
        `INSERT INTO edges (source_id, target_id, source_type, target_type, edge_type, metadata, weight)
         VALUES ($1, $2, 'lexical', 'character', 'contains_char', $3, 1.0)
         ON CONFLICT (source_id, target_id, edge_type) DO NOTHING`,
        [node.id, charId, JSON.stringify({ position: pos })]
      );
      charEdges++;
    }
  }
  edgeCount += charEdges;
  console.log(`  ${charEdges} contains_char edges...`);

  // 3. shares_character edges (sample — cap at 5000)
  let shareEdges = 0;
  const nodeList = Array.from(nodeMap.values());
  const charToNodes = new Map<string, string[]>();
  for (const node of nodeList) {
    for (const c of node.surface) {
      if (/[\u4e00-\u9fff]/.test(c)) {
        if (!charToNodes.has(c)) charToNodes.set(c, []);
        charToNodes.get(c)!.push(node.id);
      }
    }
  }

  for (const [char, nodeIds] of charToNodes) {
    if (nodeIds.length < 2) continue;
    // Sample pairs from this character's nodes
    const maxPairs = Math.min(3, nodeIds.length - 1);
    for (let i = 0; i < Math.min(nodeIds.length, 5); i++) {
      for (let j = i + 1; j < Math.min(i + maxPairs + 1, nodeIds.length); j++) {
        if (shareEdges >= 5000) break;
        await sql.query(
          `INSERT INTO edges (source_id, target_id, source_type, target_type, edge_type, metadata, weight)
           VALUES ($1, $2, 'lexical', 'lexical', 'shares_character', $3, 0.5)
           ON CONFLICT (source_id, target_id, edge_type) DO NOTHING`,
          [nodeIds[i], nodeIds[j], JSON.stringify({ character: char })]
        );
        shareEdges++;
      }
      if (shareEdges >= 5000) break;
    }
    if (shareEdges >= 5000) break;
  }
  edgeCount += shareEdges;
  console.log(`  ${shareEdges} shares_character edges...`);

  // 4. requires_grammar edges (connect words to grammar patterns they commonly use)
  const grammarWordAssociations: Record<string, string[]> = {
    '把 construction': ['把', '放', '拿', '送', '带', '搬', '打扫', '关', '开', '换', '写', '做'],
    '被 passive': ['被', '打', '骗', '批评', '偷', '吃', '发现', '选择', '影响'],
    '是...的 focus': ['是', '来', '去', '做', '买', '学'],
    '连...都/也': ['连', '都', '也'],
    '越来越': ['越', '好', '多', '大', '快', '冷', '热'],
    '比 comparison': ['比', '高', '大', '多', '好', '快', '远'],
    '虽然...但是': ['虽然', '但是'],
    '不但...而且': ['而且'],
  };

  let grammarEdges = 0;
  for (const [pattern, words] of Object.entries(grammarWordAssociations)) {
    const gId = grammarIds.get(pattern);
    if (!gId) continue;
    for (const word of words) {
      const node = nodeMap.get(word);
      if (!node) continue;
      await sql.query(
        `INSERT INTO edges (source_id, target_id, source_type, target_type, edge_type, metadata, weight)
         VALUES ($1, $2, 'lexical', 'grammar', 'requires_grammar', $3, 1.0)
         ON CONFLICT (source_id, target_id, edge_type) DO NOTHING`,
        [node.id, gId, JSON.stringify({ example: `${word} in ${pattern}` })]
      );
      grammarEdges++;
    }
  }
  edgeCount += grammarEdges;
  console.log(`  ${grammarEdges} requires_grammar edges...`);

  console.log(`  Total: ${edgeCount} edges.`);
}

async function seedEncounters(nodeMap: Map<string, { id: string; surface: string; fields: string[]; conf: ConfidenceResult }>) {
  console.log('Seeding encounters (30-day history)...');
  const now = new Date();
  let total = 0;

  const signalTypes = [
    { type: 'recognized_in_context', positive: true, updatesRec: true },
    { type: 'failed_to_recognize', positive: false, updatesRec: true },
    { type: 'produced_correctly', positive: true, updatesProd: true },
    { type: 'assessment_pass', positive: true, updatesRec: true },
    { type: 'assessment_fail', positive: false, updatesRec: true },
  ];

  const sourceTypes = ['annotation', 'calibration', 'assessment', 'production'];

  // Collect all encounters into batches for bulk insert
  const BATCH_SIZE = 100;
  let batch: any[][] = [];

  async function flushBatch() {
    if (batch.length === 0) return;
    // Build multi-row VALUES clause
    const placeholders: string[] = [];
    const params: any[] = [];
    for (let i = 0; i < batch.length; i++) {
      const offset = i * 7;
      placeholders.push(`($${offset+1}, 'lexical', $${offset+2}, $${offset+3}, $${offset+4}, $${offset+5}, $${offset+6}, $${offset+7})`);
      params.push(...batch[i]);
    }
    await sql.query(
      `INSERT INTO encounters (node_id, node_type, signal_type, signal_strength, source_type, updates_recognition, updates_production, created_at)
       VALUES ${placeholders.join(', ')}`,
      params
    );
    batch = [];
  }

  for (const [surface, node] of nodeMap) {
    const count = node.conf.encounter_count;
    if (count === 0) continue;

    for (let e = 0; e < count; e++) {
      const daysAgo = Math.round(seededRandom() * seededRandom() * 29);
      const timestamp = new Date(now.getTime() - daysAgo * 86400000 - seededRandom() * 86400000);

      const isPositive = seededRandom() < node.conf.recognition;
      const signal = isPositive
        ? signalTypes.filter(s => s.positive)[Math.floor(seededRandom() * 2)]
        : signalTypes.filter(s => !s.positive)[Math.floor(seededRandom() * 2)];

      const source = sourceTypes[Math.floor(seededRandom() * sourceTypes.length)];
      const strength = isPositive ? 0.2 + seededRandom() * 0.3 : 0.25 + seededRandom() * 0.25;

      batch.push([
        node.id,
        signal.type,
        Math.round(strength * 1000) / 1000,
        source,
        signal.updatesRec ?? false,
        signal.updatesProd ?? false,
        timestamp.toISOString(),
      ]);
      total++;

      if (batch.length >= BATCH_SIZE) {
        await flushBatch();
      }
    }

    if (total % 2000 === 0 && total > 0) {
      console.log(`  ${total} encounters...`);
    }
  }

  await flushBatch();
  console.log(`  Seeded ${total} encounters.`);
}

async function updateAggregates(fieldIds: Map<string, string>) {
  console.log('Updating field aggregates...');

  for (const [name, id] of fieldIds) {
    await sql.query(`
      UPDATE semantic_fields SET
        node_count = sub.cnt,
        avg_recognition = sub.avg_rec,
        avg_production = sub.avg_prod,
        coverage_pct = sub.coverage,
        updated_at = now()
      FROM (
        SELECT
          COUNT(*) as cnt,
          AVG(lu.recognition) as avg_rec,
          AVG(lu.production) as avg_prod,
          COUNT(*) FILTER (WHERE lu.recognition > 0.5)::float / GREATEST(COUNT(*), 1) as coverage
        FROM edges e
        JOIN lexical_units lu ON lu.id = e.source_id
        WHERE e.target_id = $1 AND e.edge_type = 'belongs_to_field'
      ) sub
      WHERE semantic_fields.id = $1
    `, [id]);
  }

  console.log('  Field aggregates updated.');
}

async function main() {
  console.log('=== 知识引擎 Seed Script ===\n');

  await runSchema();
  await truncateAll();

  const fieldIds = await seedFields();
  const grammarIds = await seedGrammar();
  const nodeMap = await seedLexicalUnits(fieldIds);
  const charMap = await seedCharacters(nodeMap);
  await seedEdges(nodeMap, fieldIds, charMap, grammarIds);
  await seedEncounters(nodeMap);
  await updateAggregates(fieldIds);

  console.log('\n=== Seed complete! ===');

  // Print summary
  const [nodes] = await sql.query('SELECT COUNT(*) as c FROM lexical_units');
  const [chars] = await sql.query('SELECT COUNT(*) as c FROM characters');
  const [edges] = await sql.query('SELECT COUNT(*) as c FROM edges');
  const [encounters] = await sql.query('SELECT COUNT(*) as c FROM encounters');
  const [grammar] = await sql.query('SELECT COUNT(*) as c FROM grammar_constructions');
  const [fields] = await sql.query('SELECT COUNT(*) as c FROM semantic_fields');

  console.log(`
Summary:
  Lexical units:  ${nodes.c}
  Characters:     ${chars.c}
  Edges:          ${edges.c}
  Encounters:     ${encounters.c}
  Grammar:        ${grammar.c}
  Fields:         ${fields.c}
  `);
}

main().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
