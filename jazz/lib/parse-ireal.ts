import { seedBpm, type BpmSource } from './style-bpm';

// ireal-reader is CJS and has no types.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const iRealReader: (raw: string) => { name?: string; songs: IRealSong[] } = require('ireal-reader');

interface IRealSong {
  title: string;
  composer: string | null;
  style: string | null;
  key: string | null;
  transpose: number | null;
  compStyle: string | null;
  bpm: number | null;
  repeats: number | null;
  music: {
    timeSignature: string | null;
    raw: string;
    measures: string[][];
  };
}

export interface StandardRecord {
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  isMinor: boolean;
  sourceBpm: number | null;
  targetBpm: number;
  bpmSource: BpmSource;
  timeSignature: string;
  form: string | null;
  chartData: string[][];
}

export interface ParseResult {
  playlistName: string | null;
  records: StandardRecord[];
  failed: { title: string; reason: string }[];
}

const NOTE_TO_INT: Record<string, number> = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4, 'E#': 5, 'F': 5, 'F#': 6, 'Gb': 6,
  'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10,
  'B': 11, 'Cb': 11, 'B#': 0,
};

function parseKey(key: string | null): { homeKey: number; isMinor: boolean } {
  if (!key) return { homeKey: 0, isMinor: false };
  const isMinor = key.endsWith('-');
  const root = isMinor ? key.slice(0, -1) : key;
  const homeKey = NOTE_TO_INT[root] ?? 0;
  return { homeKey, isMinor };
}

function normalizeTimeSignature(ts: string | null): string {
  if (!ts) return '4/4';
  if (ts.length === 2) return `${ts[0]}/${ts[1]}`;
  if (ts.length === 3) return `${ts.slice(0, 2)}/${ts[2]}`;
  return '4/4';
}

// iReal-Pro marks section starts with `*A`, `*B`, etc. We keep the uppercase
// markers for a letters-only form string; lowercase markers (intro/verse) are
// already expanded in the measures array.
function extractForm(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const markers = [...raw.matchAll(/\*([A-Z])/g)].map(m => m[1]);
  if (markers.length === 0) return null;
  return markers.join('');
}

function formatComposer(name: string | null): string | null {
  if (!name) return null;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 2 && !name.includes(',') && !name.includes('-')) {
    return `${parts[1]} ${parts[0]}`;
  }
  return name.trim();
}

function buildRecord(song: IRealSong): StandardRecord {
  const { homeKey, isMinor } = parseKey(song.key);
  const { targetBpm, sourceBpm, bpmSource } = seedBpm(song.bpm, song.style);
  return {
    title: (song.title ?? '').trim(),
    composer: formatComposer(song.composer),
    style: song.style ? song.style.trim() : null,
    homeKey,
    isMinor,
    sourceBpm,
    targetBpm,
    bpmSource,
    timeSignature: normalizeTimeSignature(song.music.timeSignature),
    form: extractForm(song.music.raw),
    chartData: song.music.measures,
  };
}

export function parseIRealUri(raw: string): ParseResult {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('irealb://') && !trimmed.startsWith('irealbook://')) {
    throw new Error('Input must start with irealb:// or irealbook://');
  }

  const playlist = iRealReader(trimmed);
  const records: StandardRecord[] = [];
  const failed: { title: string; reason: string }[] = [];

  for (const song of playlist.songs) {
    try {
      const rec = buildRecord(song);
      if (!rec.title) {
        failed.push({ title: '(empty)', reason: 'no title' });
        continue;
      }
      if (!rec.chartData || rec.chartData.length === 0) {
        failed.push({ title: rec.title, reason: 'no measures' });
        continue;
      }
      records.push(rec);
    } catch (err) {
      failed.push({ title: song.title ?? '(unknown)', reason: String(err) });
    }
  }

  return { playlistName: playlist.name ?? null, records, failed };
}
