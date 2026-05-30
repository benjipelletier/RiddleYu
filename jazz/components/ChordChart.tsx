'use client';

import { useMemo, useRef, useState } from 'react';
import { transposeMeasures } from '@jazz/lib/transpose';
import { VoicingPopover, type Voicing } from './VoicingPopover';
import { FormatChord } from './FormatChord';

interface SectionInfo {
  letter: string;
  instance: number;
  totalForLetter: number;
  isFirstBar: boolean;
}

const BARS_PER_ROW = 4;
const CLOSE_GRACE_MS = 150;

interface OpenState {
  chord: string;
  anchor: DOMRect;
}

export function ChordChart({
  measures,
  homeKey,
  viewingKey,
  form,
  voicings,
  signedIn,
  standardId,
  onVoicingsChange,
}: {
  measures: string[][];
  homeKey: number;
  viewingKey: number;
  form: string | null;
  voicings?: Record<string, Voicing[]>;
  signedIn?: boolean;
  standardId?: string;
  onVoicingsChange?: (next: Record<string, Voicing[]>) => void;
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

  const [open, setOpen] = useState<OpenState | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_GRACE_MS);
  };

  const openFor = (chord: string, anchor: DOMRect) => {
    cancelClose();
    setOpen({ chord, anchor });
  };

  function mutate(chord: string, fn: (list: Voicing[]) => Voicing[]) {
    if (!onVoicingsChange) return;
    const current = voicings?.[chord] ?? [];
    const next = { ...(voicings ?? {}) };
    next[chord] = fn(current);
    onVoicingsChange(next);
  }

  const currentVoicings = open ? voicings?.[open.chord] ?? [] : [];

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
                      {bar.map((c, k) => {
                        const hasVoicings = (voicings?.[c]?.length ?? 0) > 0;
                        const isOpen = open?.chord === c;
                        return (
                          <span
                            key={k}
                            className={`chord-cell ${hasVoicings ? 'chord-cell-has' : ''} ${isOpen ? 'chord-cell-open' : ''}`}
                            onPointerEnter={(e) => {
                              if (e.pointerType !== 'mouse') return;
                              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                              openFor(c, rect);
                            }}
                            onPointerLeave={(e) => {
                              if (e.pointerType !== 'mouse') return;
                              scheduleClose();
                            }}
                            onClick={(e) => {
                              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                              openFor(c, rect);
                            }}
                          >
                            <FormatChord chord={c} />
                            {k < bar.length - 1 && <span className="bar-sep" />}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {Array.from({ length: BARS_PER_ROW - row.bars.length }).map((_, k) => (
                <div key={`empty-${k}`} className="bar bar-empty" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {open && standardId && (
        <VoicingPopover
          chord={open.chord}
          voicings={currentVoicings}
          signedIn={!!signedIn}
          standardId={standardId}
          anchor={open.anchor}
          onClose={() => setOpen(null)}
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
          onCreated={(v) => mutate(open.chord, (list) => [...list, v])}
          onUpdated={(v) =>
            mutate(open.chord, (list) => list.map(x => (x.id === v.id ? v : x)))
          }
          onDeleted={(id) =>
            mutate(open.chord, (list) => list.filter(x => x.id !== id))
          }
        />
      )}
    </div>
  );
}
