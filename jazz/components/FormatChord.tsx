export function FormatChord({ chord }: { chord: string }) {
  // "F-7" → "F" + small italic "m7"; "F^7" → "F" + "maj7", etc.
  const m = chord.match(/^([A-G][b#]?)(.*)$/);
  if (!m) return <span>{chord}</span>;
  const suffix = m[2]
    .replace(/^-/, 'm')
    .replace(/^M7?/, 'maj7')
    .replace(/\^/, 'maj')
    .replace(/^h/, 'ø')
    .replace(/^o/, '°');
  return (
    <span>
      <span className="chord-root">{m[1]}</span>
      <span className="chord-suffix">{suffix}</span>
    </span>
  );
}
