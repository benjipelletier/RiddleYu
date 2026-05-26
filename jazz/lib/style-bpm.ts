export type BpmSource = 'ireal' | 'style_heuristic' | 'manual';

const STYLE_BPM: Record<string, number> = {
  'Ballad': 70,
  'Slow Swing': 90,
  'Medium Slow': 100,
  'Slow Rock': 80,
  'Medium Swing': 130,
  'Bossa Nova': 130,
  'Even 8ths': 130,
  'Even 16ths': 120,
  'Rock Pop': 120,
  'Calypso': 130,
  'Funk': 110,
  'Latin': 140,
  'Latin-Swing': 140,
  'Afro': 140,
  'Waltz': 140,
  'Samba': 160,
  'Medium Up Swing': 170,
  'Up Tempo Swing': 220,
};

const DEFAULT_BPM = 120;

export function bpmForStyle(style: string | null | undefined): number {
  if (!style) return DEFAULT_BPM;
  return STYLE_BPM[style] ?? DEFAULT_BPM;
}

export function seedBpm(
  irealBpm: number | null | undefined,
  style: string | null | undefined,
): { targetBpm: number; sourceBpm: number | null; bpmSource: BpmSource } {
  if (irealBpm && irealBpm > 0) {
    return { targetBpm: irealBpm, sourceBpm: irealBpm, bpmSource: 'ireal' };
  }
  return { targetBpm: bpmForStyle(style), sourceBpm: null, bpmSource: 'style_heuristic' };
}
