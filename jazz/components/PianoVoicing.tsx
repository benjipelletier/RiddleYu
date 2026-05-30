'use client';

import { useMemo } from 'react';

const DEFAULT_START_MIDI = 36; // C2
const DEFAULT_END_MIDI = 60;   // C4 inclusive (2 octaves + final C)

const BLACK_PCS = new Set([1, 3, 6, 8, 10]);
function isBlack(midi: number): boolean {
  return BLACK_PCS.has(((midi % 12) + 12) % 12);
}
function octaveLabel(midi: number): number {
  return Math.floor(midi / 12) - 1; // MIDI 60 = C4
}

interface Props {
  notes: number[];
  editable?: boolean;
  onChange?: (notes: number[]) => void;
  height?: number;
  startMidi?: number;
  endMidi?: number;
}

export function PianoVoicing({
  notes,
  editable = false,
  onChange,
  height = 60,
  startMidi = DEFAULT_START_MIDI,
  endMidi = DEFAULT_END_MIDI,
}: Props) {
  const noteSet = useMemo(() => new Set(notes), [notes]);
  const whiteW = 14;
  const blackW = 9;
  const blackH = Math.round(height * 0.6);

  const { whites, blacks, totalW } = useMemo(() => {
    const w: number[] = [];
    for (let m = startMidi; m <= endMidi; m++) {
      if (!isBlack(m)) w.push(m);
    }
    const tw = w.length * whiteW;
    const b: { midi: number; x: number }[] = [];
    w.forEach((m, i) => {
      if (m + 1 <= endMidi && isBlack(m + 1)) {
        b.push({ midi: m + 1, x: (i + 1) * whiteW - blackW / 2 });
      }
    });
    return { whites: w, blacks: b, totalW: tw };
  }, [startMidi, endMidi]);

  function toggle(midi: number) {
    if (!editable || !onChange) return;
    const s = new Set(notes);
    if (s.has(midi)) s.delete(midi);
    else s.add(midi);
    onChange(Array.from(s).sort((a, b) => a - b));
  }

  return (
    <svg
      className={`pv-piano ${editable ? 'pv-piano-edit' : ''}`}
      width={totalW}
      height={height}
      viewBox={`0 0 ${totalW} ${height}`}
      aria-label="piano voicing"
    >
      {whites.map((m, i) => {
        const active = noteSet.has(m);
        return (
          <rect
            key={m}
            className={`pv-white ${active ? 'pv-white-active' : ''}`}
            x={i * whiteW}
            y={0}
            width={whiteW - 0.5}
            height={height}
            rx={1}
            onClick={() => toggle(m)}
          />
        );
      })}
      {/* Octave markers at every C past the first */}
      {whites.map((m, i) =>
        i > 0 && m % 12 === 0 ? (
          <line
            key={`oc-${m}`}
            className="pv-octave"
            x1={i * whiteW}
            y1={blackH}
            x2={i * whiteW}
            y2={height}
          />
        ) : null,
      )}
      {blacks.map(({ midi, x }) => {
        const active = noteSet.has(midi);
        return (
          <rect
            key={midi}
            className={`pv-black ${active ? 'pv-black-active' : ''}`}
            x={x}
            y={0}
            width={blackW}
            height={blackH}
            rx={1}
            onClick={() => toggle(midi)}
          />
        );
      })}
      {/* C labels (C2, C3, C4) */}
      {whites.map((m, i) =>
        m % 12 === 0 ? (
          <text
            key={`lbl-${m}`}
            className="pv-label"
            x={i * whiteW + (whiteW - 0.5) / 2}
            y={height - 4}
            textAnchor="middle"
          >
            C{octaveLabel(m)}
          </text>
        ) : null,
      )}
    </svg>
  );
}
