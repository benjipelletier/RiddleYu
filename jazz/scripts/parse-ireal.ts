// Usage: npx tsx jazz/scripts/parse-ireal.ts
// Reads jazz/charts_raw/jazz.ireal, parses every song via ireal-reader,
// emits jazz/data/standards.json and jazz/data/standards.summary.json.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { parseIRealUri } from '../lib/parse-ireal';

function main() {
  const repoRoot = join(__dirname, '..', '..');
  const inputPath = join(repoRoot, 'jazz', 'charts_raw', 'jazz.ireal');
  const dataDir = join(repoRoot, 'jazz', 'data');
  const outputPath = join(dataDir, 'standards.json');
  const summaryPath = join(dataDir, 'standards.summary.json');

  if (!existsSync(inputPath)) {
    console.error(`Input not found: ${inputPath}`);
    process.exit(1);
  }

  const raw = readFileSync(inputPath, 'utf-8');
  const { playlistName, records, failed } = parseIRealUri(raw);
  console.log(`Playlist: ${playlistName ?? '(unnamed)'} — ${records.length + failed.length} songs`);

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(records, null, 2));
  writeFileSync(
    summaryPath,
    JSON.stringify(
      records.map(r => ({
        title: r.title,
        composer: r.composer,
        style: r.style,
        homeKey: r.homeKey,
        targetBpm: r.targetBpm,
        bpmSource: r.bpmSource,
        bars: r.chartData.length,
      })),
      null,
      2,
    ),
  );
  console.log(`Wrote ${records.length} standards to ${outputPath}`);
  console.log(`Summary: ${summaryPath}`);
  if (failed.length > 0) {
    console.log(`Skipped ${failed.length}:`);
    for (const f of failed.slice(0, 10)) console.log(`  - ${f.title}: ${f.reason}`);
  }
}

main();
