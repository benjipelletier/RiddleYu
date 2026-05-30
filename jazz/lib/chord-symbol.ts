// Normalize a chord symbol for voicing lookup/storage.
// Slash chords share voicings with their bass-less counterpart:
//   "C6/G"  → "C6"
//   "Bb-7/D"→ "Bb-7"
//   "C7"    → "C7" (no slash)
// We only strip when the part after "/" looks like a bass note
// (A–G + optional accidental).
export function normalizeChordSymbol(chord: string): string {
  const trimmed = chord.trim();
  const m = trimmed.match(/^(.+?)\/([A-G][b#]?)$/);
  return m ? m[1] : trimmed;
}

// Strip trailing alterations (b9, #9, b5, #5, #11, b13, alt) to get the
// "base" chord — the common voicing shape underneath altered dominants and
// the like. Slash bass is also stripped (via normalizeChordSymbol).
//   "E7b9"     → "E7"
//   "E7b9#11"  → "E7"
//   "C7alt"    → "C7"
//   "C6/G"     → "C6"
//   "F-7"      → "F-7"  (no alterations)
// Note: iReal encodes half-diminished as "h"/"ø", not "m7b5", so the trailing
// "b5" strip won't typically misfire on real chart data.
const ALT_RE = /(?:alt|(?:b|#)(?:9|5|11|13))$/i;
export function baseChordSymbol(chord: string): string {
  let s = normalizeChordSymbol(chord);
  while (true) {
    const m = s.match(ALT_RE);
    if (!m || m.index === 0) break;
    s = s.slice(0, m.index);
  }
  return s;
}
