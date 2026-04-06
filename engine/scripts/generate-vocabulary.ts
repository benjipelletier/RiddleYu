/**
 * Generates vocabulary.ts from raw HSK word list data.
 *
 * Usage: npx tsx scripts/generate-vocabulary.ts
 *
 * Reads raw HSK data files, deduplicates, assigns HSK levels and semantic fields,
 * then writes scripts/data/vocabulary.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface RawEntry {
  surface_form: string;
  pinyin: string;
  gloss: string;
}

interface VocabEntry {
  surface_form: string;
  pinyin: string;
  primary_gloss: string;
  unit_type: 'word' | 'collocation' | 'fixed_expression' | 'chengyu';
  hsk_level: number;
  registers: string[];
  complexity_tier: number;
  fields: string[];
}

// Parse "surface | pinyin | gloss" format
function parseLine(line: string): RawEntry | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('|')) return null;

  const parts = trimmed.split('|').map(p => p.trim());
  if (parts.length < 3) return null;

  const surface_form = parts[0];
  const pinyin = parts[1];
  const gloss = parts.slice(2).join('; ');

  // Basic validation: first part should contain Chinese characters
  if (!/[\u4e00-\u9fff]/.test(surface_form)) return null;

  return { surface_form, pinyin, gloss };
}

function parseFile(filepath: string): Map<string, RawEntry> {
  const content = fs.readFileSync(filepath, 'utf-8');
  const entries = new Map<string, RawEntry>();

  for (const line of content.split('\n')) {
    const entry = parseLine(line);
    if (entry && !entries.has(entry.surface_form)) {
      entries.set(entry.surface_form, entry);
    }
  }

  return entries;
}

// Semantic field assignment based on gloss keywords
const FIELD_RULES: [string, RegExp][] = [
  ['emotions', /happy|sad|angry|fear|worry|anxious|excit|emotion|mood|feel|sorrow|joy|depress|nervous|proud|shy|embarrass|hate|love(?! romantic)|miss|lonely|regret|satisfy|disappoint|comfort|upset|jealous|envy|griev|cheerful|bitter|pleased|fond|content|scare|fright|alarm|panic|annoyed|irritat|reluctan|willing|eager|passion/i],
  ['relationships', /friend|family|mother|father|parent|child|son|daughter|brother|sister|wife|husband|marry|wedding|relative|uncle|aunt|grandm|grandf|neighbor|colleague|classmate|acquaint|lover|couple|relation|social|polite|greet|respect|introduce|guest|host|surname|name.*person/i],
  ['food_cooking', /food|eat|drink|cook|dish|rice|noodle|meat|fruit|vegetab|restaurant|kitchen|taste|flavor|delicious|hungry|full.*eat|meal|breakfast|lunch|dinner|sugar|sweet|sour|spicy|salt|egg|chicken|fish|beef|mutton|tea|coffee|beer|wine|milk|juice|bread|cake|soup|watermelon|banana|apple|grape|tomato|chopstick|bowl|cup|plate|menu|order.*food|snack|steam|fry|boil|roast|bake|ingredient/i],
  ['health_medicine', /health|hospital|doctor|medic|sick|ill|disease|fever|cold.*sick|body|exercise|pain|hurt|head.*ache|stomach|blood|heart.*organ|lung|sleep.*disorder|diet|weight|fat|thin|cure|treat|patient|symptom|drug|pill|inject|surger|physical|mental.*health|diagnos|prescri|pharmacy|dent|eye.*doctor|nurse/i],
  ['nature', /nature|weather|rain|snow|wind|cloud|sun|moon|star|tree|flower|grass|mountain|river|lake|sea|ocean|animal|bird|cat|dog|horse|fish.*animal|garden|plant|forest|desert|island|earth|sky|air|water.*natural|spring.*season|summer|autumn|fall.*season|winter|season|warm|cold.*weather|hot.*weather|storm|thunder/i],
  ['travel', /travel|trip|tour|hotel|airport|station|train|bus|plane|fly|drive|taxi|ticket|passport|luggage|suitcase|map|direction|road|path|bridge|transport|subway|metro|bicycle|car|ship|boat|visit.*place|vacation|scenery|scenic|abroad|foreign/i],
  ['work_business', /work|job|company|office|business|meeting|salary|employ|career|profession|manage|boss|trade|economy|market|price|money|bank|invest|profit|loss|contract|project|customer|client|industry|factory|produce|product|export|import|advertis|commercial/i],
  ['technology', /computer|internet|phone|mobile|online|software|data|program|website|digital|email|network|technolog|machine|electronic|device|screen|keyboard|download|upload|video|camera|print|science|research|experiment|invent|develop.*tech|robot|artificial/i],
  ['politics_law', /politic|government|law|legal|court|judge|police|crime|prison|right|freedom|vote|elect|president|minister|rule|regulat|policy|society|citizen|nation|country.*gov|public|official|power|authority|democracy|party.*polit|tax|constitution|reform/i],
  ['history_culture', /history|histor|culture|cultur|tradition|ancient|dynasty|temple|museum|literature|literary|poem|poetry|novel|art|paint|classic|philosophy|confuci|buddhis|religion|ceremony|festival|celebrate|custom|heritage|legend|myth|civiliz|emperor|king|queen|war.*hist/i],
  ['music_arts', /music|song|sing|dance|perform|concert|instrument|piano|guitar|play.*music|melody|rhythm|opera|theater|actor|actress|film|movie|show|stage|drama|art.*perform|entertain|band|orchestra/i],
  ['daily_life', /daily|every.*day|morning|evening|night|afternoon|today|tomorrow|yesterday|week|month|year|time|hour|minute|clock|home|house|room|door|window|bed|table|chair|clothes|wear|dress|shoe|hat|wash|clean|cook|shop|buy|sell|open|close|sit|stand|walk|run|sleep|wake|rest|wait|look|see|hear|speak|talk|say|tell|ask|answer|read|write|learn|teach|study|school|class|test|exam/i],
];

function assignFields(gloss: string, surface: string): string[] {
  const fields: string[] = [];

  for (const [field, pattern] of FIELD_RULES) {
    if (pattern.test(gloss)) {
      fields.push(field);
    }
  }

  // Default to daily_life if no field matched
  if (fields.length === 0) {
    fields.push('daily_life');
  }

  // Cap at 2 fields
  return fields.slice(0, 2);
}

function determineUnitType(surface: string, gloss: string): 'word' | 'collocation' | 'fixed_expression' | 'chengyu' {
  if (surface.length === 4 && !/[\u0000-\u007f]/.test(surface)) {
    // 4-char Chinese could be chengyu
    const lowerGloss = gloss.toLowerCase();
    if (lowerGloss.includes('idiom') || lowerGloss.includes('proverb')) {
      return 'chengyu';
    }
    // Many 4-char compounds are chengyu even without explicit labeling
    return 'chengyu';
  }
  if (surface.includes('…') || surface.includes('...')) return 'fixed_expression';
  return 'word';
}

function determineRegisters(hsk: number, gloss: string): string[] {
  const lower = gloss.toLowerCase();

  if (lower.includes('informal') || lower.includes('colloquial') || lower.includes('slang')) {
    return ['spoken', 'informal'];
  }
  if (lower.includes('formal') || lower.includes('literary') || lower.includes('classical')) {
    return ['formal', 'written'];
  }
  if (lower.includes('written')) {
    return ['written', 'neutral'];
  }

  if (hsk <= 2) return ['neutral'];
  if (hsk <= 3) return ['neutral'];
  if (hsk === 4) return ['neutral'];
  // HSK 5 has more variety
  return ['neutral'];
}

function main() {
  const hsk4Path = path.join(__dirname, '../.cache/hsk4-raw.txt');
  const hsk5Path = path.join(__dirname, '../.cache/hsk5-raw.txt');

  // Also parse HSK 3 data from inline (already fetched)
  const hsk3Path = path.join(__dirname, '../.cache/hsk3-raw.txt');

  // Check if cache files exist
  if (!fs.existsSync(hsk4Path) || !fs.existsSync(hsk5Path) || !fs.existsSync(hsk3Path)) {
    console.error('Missing cache files. Copy raw HSK data to .cache/hsk3-raw.txt, .cache/hsk4-raw.txt, .cache/hsk5-raw.txt');
    process.exit(1);
  }

  const hsk3Words = parseFile(hsk3Path);
  const hsk4Words = parseFile(hsk4Path);
  const hsk5Words = parseFile(hsk5Path);

  console.log(`Parsed: HSK3=${hsk3Words.size}, HSK4=${hsk4Words.size}, HSK5=${hsk5Words.size}`);

  // HSK levels are cumulative. Determine per-level words:
  // HSK 1-2 words: we don't have separate HSK1/HSK2 files, so we'll estimate
  // HSK 3 words = all in hsk3 file (which is cumulative HSK 1-3)
  // HSK 4-only words = in hsk4 but not in hsk3
  // HSK 5-only words = in hsk5 but not in hsk4

  // For HSK 1-3 split: HSK1 ~150, HSK2 ~150, HSK3 ~300
  // We'll assign roughly: first 150 alphabetically as HSK1, next 150 as HSK2, rest as HSK3
  // This isn't perfect but works for our purposes
  const hsk3List = Array.from(hsk3Words.values());
  const hsk1Count = 150;
  const hsk2Count = 150;

  const entries: VocabEntry[] = [];
  const seen = new Set<string>();

  // HSK 1-3 from hsk3 file
  for (let i = 0; i < hsk3List.length; i++) {
    const raw = hsk3List[i];
    if (seen.has(raw.surface_form)) continue;
    seen.add(raw.surface_form);

    let hsk_level: number;
    if (i < hsk1Count) hsk_level = 1;
    else if (i < hsk1Count + hsk2Count) hsk_level = 2;
    else hsk_level = 3;

    entries.push({
      surface_form: raw.surface_form,
      pinyin: raw.pinyin,
      primary_gloss: raw.gloss.split(';')[0].trim().replace(/CL:.*$/, '').trim(),
      unit_type: determineUnitType(raw.surface_form, raw.gloss),
      hsk_level,
      registers: determineRegisters(hsk_level, raw.gloss),
      complexity_tier: Math.min(hsk_level, 3),
      fields: assignFields(raw.gloss, raw.surface_form),
    });
  }

  // HSK 4-only words
  for (const [surface, raw] of hsk4Words) {
    if (seen.has(surface)) continue;
    seen.add(surface);

    entries.push({
      surface_form: raw.surface_form,
      pinyin: raw.pinyin,
      primary_gloss: raw.gloss.split(';')[0].trim().replace(/CL:.*$/, '').trim(),
      unit_type: determineUnitType(raw.surface_form, raw.gloss),
      hsk_level: 4,
      registers: determineRegisters(4, raw.gloss),
      complexity_tier: 4,
      fields: assignFields(raw.gloss, raw.surface_form),
    });
  }

  // HSK 5-only words
  for (const [surface, raw] of hsk5Words) {
    if (seen.has(surface)) continue;
    seen.add(surface);

    entries.push({
      surface_form: raw.surface_form,
      pinyin: raw.pinyin,
      primary_gloss: raw.gloss.split(';')[0].trim().replace(/CL:.*$/, '').trim(),
      unit_type: determineUnitType(raw.surface_form, raw.gloss),
      hsk_level: 5,
      registers: determineRegisters(5, raw.gloss),
      complexity_tier: 5,
      fields: assignFields(raw.gloss, raw.surface_form),
    });
  }

  // Generate output
  const levelCounts = [0, 0, 0, 0, 0, 0];
  for (const e of entries) levelCounts[e.hsk_level]++;
  console.log(`Total: ${entries.length} words`);
  console.log(`HSK1: ${levelCounts[1]}, HSK2: ${levelCounts[2]}, HSK3: ${levelCounts[3]}, HSK4: ${levelCounts[4]}, HSK5: ${levelCounts[5]}`);

  const output = `export interface VocabEntry {
  surface_form: string;
  pinyin: string;
  primary_gloss: string;
  unit_type: 'word' | 'collocation' | 'fixed_expression' | 'chengyu';
  hsk_level: number;
  registers: string[];
  complexity_tier: number;
  fields: string[];
}

export const VOCABULARY: VocabEntry[] = ${JSON.stringify(entries, null, 2)};
`;

  const outPath = path.join(__dirname, 'data/vocabulary.ts');
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`Wrote ${outPath}`);
}

main();
