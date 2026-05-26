'use client';

import { useState } from 'react';
import { KeyPicker } from './KeyPicker';
import { keyName } from '@jazz/lib/format';

interface Skill {
  id: string;
  name: string;
  tracksBpm: boolean;
  lhGroup?: 'shells' | 'chords' | 'bass' | null;
  lhPart?: string | null;
  rhPart?: string | null;
}

const LH_PART_LABEL: Record<string, string> = {
  '3-7s': '3-7s',
  'stock': 'Stock voicings',
  'willy': 'Willy Special',
  'sustained-bass': 'Sustained bass',
  'half-bass': 'Half-bass',
  'quarter-bass': 'Quarter-bass',
};
const RH_PART_LABEL: Record<string, string> = {
  '3-7s': '3-7s',
  'stock': 'stock chords',
  'melody': 'melody',
  'solo': 'solo',
};
const LH_GROUP_LABEL: Record<string, string> = {
  shells: 'Shells',
  chords: 'Chords',
  bass: 'Bass',
};
const LH_PART_ORDER = ['3-7s', 'stock', 'willy', 'sustained-bass', 'half-bass', 'quarter-bass'];
const RH_PART_ORDER = ['3-7s', 'stock', 'melody', 'solo'];
const LH_GROUP_ORDER: ('shells' | 'chords' | 'bass')[] = ['shells', 'chords', 'bass'];

function groupSkills(skills: Skill[]) {
  // Map: lh_part → cells, in stable order.
  const byLh = new Map<string, Skill[]>();
  for (const sk of skills) {
    if (!sk.lhPart || !sk.lhGroup) continue;
    const arr = byLh.get(sk.lhPart) ?? [];
    arr.push(sk);
    byLh.set(sk.lhPart, arr);
  }
  const groupedByGroup: Record<string, { lhPart: string; cells: Skill[] }[]> = { shells: [], chords: [], bass: [] };
  for (const lhPart of LH_PART_ORDER) {
    const cells = byLh.get(lhPart);
    if (!cells) continue;
    cells.sort((a, b) => RH_PART_ORDER.indexOf(a.rhPart ?? '') - RH_PART_ORDER.indexOf(b.rhPart ?? ''));
    const group = cells[0].lhGroup as string;
    groupedByGroup[group].push({ lhPart, cells });
  }
  return groupedByGroup;
}

interface ItemState {
  enabled: boolean;
  bpm: string;
}

export function PracticeSessionForm({
  standardId,
  standardTitle,
  homeKey,
  practiceKey,
  targetBpm,
  skills,
  onClose,
  onSubmitted,
}: {
  standardId: string;
  standardTitle: string;
  homeKey: number;
  practiceKey: number;
  targetBpm: number;
  skills: Skill[];
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const [items, setItems] = useState<Record<string, ItemState>>(() => {
    const init: Record<string, ItemState> = {};
    for (const s of skills) init[s.id] = { enabled: false, bpm: s.tracksBpm ? String(targetBpm) : '' };
    return init;
  });
  const [notes, setNotes] = useState('');
  const [key, setKey] = useState(practiceKey);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enabledCount = Object.values(items).filter(x => x.enabled).length;

  function update(id: string, patch: Partial<ItemState>) {
    setItems(p => ({ ...p, [id]: { ...p[id], ...patch } }));
  }

  async function submit() {
    if (enabledCount === 0) return;
    setSubmitting(true);
    setError(null);
    const payload = {
      standardId,
      practiceKey: key,
      notes: notes.trim() || null,
      items: skills
        .filter(s => items[s.id].enabled)
        .map(s => ({
          skillId: s.id,
          bpm: s.tracksBpm && items[s.id].bpm.trim() ? parseInt(items[s.id].bpm) : null,
        })),
    };
    try {
      const res = await fetch('/api/jazz/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? `HTTP ${res.status}`);
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch (e) {
      setError(String(e));
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="modal-bg" onClick={onClose}>
        <div className="modal modal-success" onClick={e => e.stopPropagation()}>
          <div className="success-mark">✓</div>
          <h2 className="success-title">Shed logged.</h2>
          <p className="success-sub">
            {enabledCount} {enabledCount === 1 ? 'skill' : 'skills'} on <em>{standardTitle}</em>, in {keyName(key)}.
          </p>
          <button className="btn btn-primary" onClick={() => { onClose(); onSubmitted(); }}>
            back to chart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <div className="modal-eyebrow">Log a shed sesh</div>
            <h2 className="modal-title">{standardTitle}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </header>

        <div className="modal-body">
          <div className="modal-section">
            <label className="field-label">Shed key</label>
            <KeyPicker selected={key} homeKey={homeKey} onChange={setKey} compact />
          </div>

          <div className="modal-section">
            <div className="field-label-row">
              <label className="field-label">Skills shed</label>
              <span className="field-hint">{enabledCount} of {skills.length} selected</span>
            </div>
            <div className="modal-skills modal-skills-grouped">
              {(() => {
                const grouped = groupSkills(skills);
                return LH_GROUP_ORDER.map(group => {
                  const cards = grouped[group];
                  if (!cards || cards.length === 0) return null;
                  return (
                    <div key={group} className="modal-group">
                      <div className="modal-group-head">{LH_GROUP_LABEL[group]}</div>
                      {cards.map(({ lhPart, cells }) => (
                        <div key={lhPart} className="modal-lh-block">
                          <div className="modal-lh-title">LH plays {LH_PART_LABEL[lhPart]}</div>
                          {cells.map(sk => {
                            const it = items[sk.id];
                            const partner = RH_PART_LABEL[sk.rhPart ?? ''] ?? sk.name;
                            return (
                              <div key={sk.id} className={`modal-skill ${it.enabled ? 'on' : ''}`}>
                                <button className="modal-check" onClick={() => update(sk.id, { enabled: !it.enabled })}>
                                  <span className="check-box">{it.enabled && <span className="check-tick">✓</span>}</span>
                                  <span className="check-name">with RH {partner}</span>
                                </button>
                                {sk.tracksBpm ? (
                                  <div className="modal-bpm">
                                    <input
                                      type="number"
                                      value={it.bpm}
                                      min={20}
                                      max={400}
                                      disabled={!it.enabled}
                                      onChange={e => update(sk.id, { bpm: e.target.value })}
                                    />
                                    <span className="modal-bpm-unit">bpm</span>
                                  </div>
                                ) : (
                                  <span className="modal-bpm-na">—</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          <div className="modal-section">
            <label className="field-label">Notes (optional)</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. struggled with the bridge, B section much better today…"
              className="modal-textarea"
            />
          </div>

          {error && <div className="modal-section" style={{ color: 'var(--accent-ink)', fontSize: 13 }}>{error}</div>}
        </div>

        <footer className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit} disabled={enabledCount === 0 || submitting}>
            {submitting ? 'Logging…' : `Log ${enabledCount || ''} skill${enabledCount === 1 ? '' : 's'}`.trim()}
          </button>
        </footer>
      </div>
    </div>
  );
}
