'use client';

import { useMemo } from 'react';
import { transposeMeasures } from '@jazz/lib/transpose';

function FormatChord({ chord }: { chord: string }) {
  // "F-7" → "F" + small italic "m7"; "EbM" → "Eb" + "maj7", etc.
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

interface SectionInfo {
  letter: string;
  instance: number;
  totalForLetter: number;
  isFirstBar: boolean;
}

const BARS_PER_ROW = 4;

export function ChordChart({
  measures,
  homeKey,
  viewingKey,
  form,
}: {
  measures: string[][];
  homeKey: number;
  viewingKey: number;
  form: string | null;
}) {
  const shift = ((viewingKey - homeKey) % 12 + 12) % 12;
  const bars = useMemo(() => transposeMeasures(measures, shift), [measures, shift]);

  const sectionPerBar: (SectionInfo | null)[] = useMemo(() => {
    const out: (SectionInfo | null)[] = new Array(bars.length).fill(null);
    if (!form) return out;
    const letters = form.replace(/[^A-Za-z]/g, '');
    if (!letters || letters.length < 2 || letters.length > 8) return out;
    const segLen = Math.floor(bars.length / letters.length);
    if (segLen < 2) return out;
    const counts: Record<string, number> = {};
    const labels: { letter: string; instance: number; totalForLetter: number }[] = [];
    for (const L of letters) {
      counts[L] = (counts[L] || 0) + 1;
      labels.push({ letter: L, instance: counts[L], totalForLetter: 0 });
    }
    labels.forEach(l => (l.totalForLetter = counts[l.letter]));
    for (let i = 0; i < bars.length; i++) {
      const segIdx = Math.min(letters.length - 1, Math.floor(i / segLen));
      const startOfSeg = segIdx * segLen;
      out[i] = {
        letter: labels[segIdx].letter,
        instance: labels[segIdx].instance,
        totalForLetter: labels[segIdx].totalForLetter,
        isFirstBar: i === startOfSeg,
      };
    }
    return out;
  }, [bars.length, form]);

  // Pre-group bars into rows of N, capturing any section that starts in that row.
  const rows = useMemo(() => {
    const out: { startIdx: number; bars: string[][]; label: SectionInfo | null }[] = [];
    for (let i = 0; i < bars.length; i += BARS_PER_ROW) {
      const rowBars = bars.slice(i, i + BARS_PER_ROW);
      const label = rowBars
        .map((_, j) => sectionPerBar[i + j])
        .find((s): s is SectionInfo => !!s && s.isFirstBar) ?? null;
      out.push({ startIdx: i, bars: rowBars, label });
    }
    return out;
  }, [bars, sectionPerBar]);

  return (
    <div className="chart">
      <div className="chart-rows">
        {rows.map((row, ri) => (
          <div key={ri} className="chart-row">
            <div className="chart-row-label">
              {row.label && (
                <span className="bar-section-label" data-letter={row.label.letter}>
                  {row.label.letter}
                  {row.label.totalForLetter > 1 ? row.label.instance : ''}
                </span>
              )}
            </div>
            <div className="row-bars">
              {row.bars.map((bar, j) => {
                const i = row.startIdx + j;
                return (
                  <div key={i} className={`bar ${bar.length >= 3 ? 'bar-dense' : ''}`}>
                    <span className="bar-num">{i + 1}</span>
                    <div className="bar-chords">
                      {bar.map((c, k) => (
                        <span key={k} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                          <FormatChord chord={c} />
                          {k < bar.length - 1 && <span className="bar-sep" />}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* fill empty cells so the last row keeps the 4-col grid edges */}
              {Array.from({ length: BARS_PER_ROW - row.bars.length }).map((_, k) => (
                <div key={`empty-${k}`} className="bar bar-empty" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
