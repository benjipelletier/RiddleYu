// Run with: npx tsx scripts/build-cedict.ts
// Downloads CC-CEDICT and builds src/data/cedict.json

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createGunzip } from 'zlib';
import { get } from 'https';

const CEDICT_URL = 'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz';

interface CedictEntry {
  pinyin: string;
  definition: string;
  hsk?: number;
}

const HSK_LEVELS: Record<string, number> = {};

function downloadAndDecompress(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      const gz = createGunzip();
      const chunks: Buffer[] = [];
      res.pipe(gz);
      gz.on('data', (chunk: Buffer) => chunks.push(chunk));
      gz.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      gz.on('error', reject);
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading CC-CEDICT...');
  const text = await downloadAndDecompress(CEDICT_URL);

  console.log('Parsing entries...');
  const dict: Record<string, CedictEntry> = {};
  const lines = text.split('\n');

  for (const line of lines) {
    if (line.startsWith('#') || line.trim() === '') continue;

    // Format: traditional simplified [pinyin] /definition1/definition2/
    const match = line.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+\/(.+)\/\s*$/);
    if (!match) continue;

    const [, , simplified, pinyin, definitions] = match;
    const firstDef = definitions.split('/')[0];

    // Only store first entry per simplified form (most common usage)
    if (!dict[simplified]) {
      dict[simplified] = {
        pinyin: pinyin,
        definition: firstDef,
        ...(HSK_LEVELS[simplified] ? { hsk: HSK_LEVELS[simplified] } : {}),
      };
    }
  }

  const outDir = join(process.cwd(), 'src', 'data');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'cedict.json');
  writeFileSync(outPath, JSON.stringify(dict));
  console.log(`Wrote ${Object.keys(dict).length} entries to ${outPath}`);
}

main().catch(console.error);
