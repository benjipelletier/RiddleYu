import { keyIntToName } from './music-utils';

const ROOT_TO_INT: Record<string, number> = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4, 'E#': 5, 'F': 5, 'F#': 6, 'Gb': 6,
  'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10,
  'B': 11, 'Cb': 11, 'B#': 0,
};

const ROOT_REGEX = /^([A-G][#b]?)(.*)/;

function transposeRoot(root: string, semitones: number): string {
  const rootInt = ROOT_TO_INT[root];
  if (rootInt === undefined) return root;
  const newInt = ((rootInt + semitones) % 12 + 12) % 12;
  return keyIntToName(newInt);
}

export function transposeChord(chordSymbol: string, semitones: number): string {
  if (!chordSymbol || chordSymbol === 'N.C.' || chordSymbol === 'NC') {
    return chordSymbol;
  }

  // Handle slash chords: e.g. C^7/G
  const slashIdx = chordSymbol.indexOf('/');
  if (slashIdx > 0) {
    const mainPart = chordSymbol.substring(0, slashIdx);
    const bassPart = chordSymbol.substring(slashIdx + 1);
    if (/^[A-G][#b]?$/.test(bassPart)) {
      return transposeChord(mainPart, semitones) + '/' + transposeRoot(bassPart, semitones);
    }
    return transposeChord(mainPart, semitones) + '/' + bassPart;
  }

  const match = chordSymbol.match(ROOT_REGEX);
  if (!match) return chordSymbol;

  const [, root, quality] = match;
  return transposeRoot(root, semitones) + quality;
}

export function transposeMeasures(measures: string[][], semitones: number): string[][] {
  if (semitones === 0) return measures;
  return measures.map(measure =>
    measure.map(chord => transposeChord(chord, semitones))
  );
}
