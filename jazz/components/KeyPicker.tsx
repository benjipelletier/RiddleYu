'use client';

import { NOTE_NAMES } from '@jazz/lib/format';

export interface KeyProgress {
  skillsLogged: number;
  skillsAtTarget: number;
  sessions: number;
}

export function KeyPicker({
  selected,
  homeKey,
  onChange,
  compact = false,
  progressByKey,
}: {
  selected: number;
  homeKey: number;
  onChange: (key: number) => void;
  compact?: boolean;
  progressByKey?: Record<number, KeyProgress>;
}) {
  return (
    <div className={`key-picker ${compact ? 'key-picker-compact' : ''}`}>
      {Array.from({ length: 12 }).map((_, k) => {
          const prog = progressByKey?.[k];
          const className = k === selected ? 'kp on' : k === homeKey ? 'kp home' : 'kp';
          return (
            <button
              key={k}
              className={className}
              onClick={() => onChange(k)}
              title={
                prog
                  ? `${NOTE_NAMES[k]} · ${prog.skillsLogged}/10 skills · ${prog.sessions} session${prog.sessions === 1 ? '' : 's'}`
                  : NOTE_NAMES[k]
              }
            >
              {NOTE_NAMES[k]}
              {prog && prog.skillsLogged > 0 && (
                <span className={`kp-progress ${prog.skillsAtTarget >= 10 ? 'kp-progress-full' : ''}`}>
                  <span className="kp-progress-fill" style={{ width: `${(prog.skillsLogged / 10) * 100}%` }} />
                </span>
              )}
            </button>
          );
        })}
    </div>
  );
}
