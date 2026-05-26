const NOTE_NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_NAMES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Prefer flats for jazz
export const NOTE_NAMES = NOTE_NAMES_FLAT;

const NAME_TO_INT: Record<string, number> = {};
for (let i = 0; i < 12; i++) {
  NAME_TO_INT[NOTE_NAMES_SHARP[i]] = i;
  NAME_TO_INT[NOTE_NAMES_FLAT[i]] = i;
}
NAME_TO_INT['Cb'] = 11;
NAME_TO_INT['E#'] = 5;
NAME_TO_INT['Fb'] = 4;
NAME_TO_INT['B#'] = 0;

export function keyNameToInt(name: string): number {
  const val = NAME_TO_INT[name];
  if (val === undefined) throw new Error(`Unknown key name: ${name}`);
  return val;
}

export function keyIntToName(key: number): string {
  return NOTE_NAMES[((key % 12) + 12) % 12];
}

export function transpositionShift(homeKey: number, viewingKey: number): number {
  return ((viewingKey - homeKey) % 12 + 12) % 12;
}
