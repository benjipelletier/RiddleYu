'use client';

import { useEffect, useMemo, useState } from 'react';
import { ScrubBpm } from './ScrubBpm';

export interface SkillSummary {
  skillId: string;
  skillName: string;
  tracksBpm: boolean;
  lhGroup: 'shells' | 'chords' | 'bass' | null;
  lhPart: string | null;
  rhPart: string | null;
  mode: string;
  lastBpm: number | null;
  bestBpm: number | null;
  lastPracticedAt: string | null;
  sessionsCount: number;
  history: { practicedAt: string; bpm: number | null }[];
}

const LH_GROUP_ORDER: ('shells' | 'chords' | 'bass')[] = ['shells', 'chords', 'bass'];
const LH_GROUP_LABEL: Record<string, string> = {
  shells: 'Shells',
  chords: 'Chords',
  bass: 'Bass',
};
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
const LH_PART_ORDER = ['3-7s', 'stock', 'willy', 'sustained-bass', 'half-bass', 'quarter-bass'];
const RH_PART_ORDER = ['3-7s', 'stock', 'melody', 'solo'];

function daysLabel(iso: string | null): string {
  if (!iso) return 'never';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return '1d';
  if (days < 30) return `${days}d`;
  return `${Math.round(days / 30)}mo`;
}

interface GroupedLh {
  group: 'shells' | 'chords' | 'bass';
  lhPart: string;
  cells: SkillSummary[];
}

function groupByLh(skills: SkillSummary[]): GroupedLh[] {
  const byLh = new Map<string, SkillSummary[]>();
  for (const sk of skills) {
    if (!sk.lhPart || !sk.lhGroup) continue;
    const arr = byLh.get(sk.lhPart) ?? [];
    arr.push(sk);
    byLh.set(sk.lhPart, arr);
  }
  const groups: GroupedLh[] = [];
  for (const lhPart of LH_PART_ORDER) {
    const cells = byLh.get(lhPart);
    if (!cells || cells.length === 0) continue;
    cells.sort((a, b) => RH_PART_ORDER.indexOf(a.rhPart ?? '') - RH_PART_ORDER.indexOf(b.rhPart ?? ''));
    groups.push({ group: cells[0].lhGroup as 'shells' | 'chords' | 'bass', lhPart, cells });
  }
  return groups;
}

interface Pending { bpm: number; }

export function SkillLogPanel({
  skills,
  targetBpm,
  standardId,
  viewingKey,
  signedIn,
  onCommitted,
  onToast,
}: {
  skills: SkillSummary[];
  targetBpm: number;
  standardId: string;
  viewingKey: number;
  signedIn: boolean;
  onCommitted?: () => void;
  onToast?: (msg: string) => void;
}) {
  const groups = useMemo(() => groupByLh(skills), [skills]);
  const byGroup = useMemo(() => {
    const m: Record<string, GroupedLh[]> = { shells: [], chords: [], bass: [] };
    for (const g of groups) m[g.group].push(g);
    return m;
  }, [groups]);

  const [editMode, setEditMode] = useState(false);
  const [pending, setPending] = useState<Record<string, Pending>>({});
  const [committing, setCommitting] = useState(false);

  // Exit edit mode + clear pending when standard/key changes.
  useEffect(() => {
    setEditMode(false);
    setPending({});
  }, [standardId, viewingKey]);

  function setBpmFor(skillId: string, bpm: number) {
    setPending(p => ({ ...p, [skillId]: { bpm } }));
  }
  function discard() {
    setPending({});
    setEditMode(false);
  }

  const pendingCount = Object.keys(pending).length;

  async function commit() {
    if (pendingCount === 0 || !signedIn) return;
    setCommitting(true);
    const items = Object.entries(pending).map(([skillId, p]) => ({ skillId, bpm: p.bpm }));
    try {
      const res = await fetch('/api/jazz/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ standardId, practiceKey: viewingKey, items }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        onToast?.(`Couldn't log: ${body.error ?? `HTTP ${res.status}`}`);
        setCommitting(false);
        return;
      }
      onToast?.(items.length === 1 ? `Logged 1 skill at ${items[0].bpm} bpm` : `Logged ${items.length} skills`);
      setPending({});
      setEditMode(false);
      setCommitting(false);
      onCommitted?.();
    } catch (e) {
      onToast?.(`Error: ${e}`);
      setCommitting(false);
    }
  }

  return (
    <section className="skill-card">
      <header className="skill-header">
        <div className="skill-header-info">
          <h2 className="skill-title">Shed Matrix</h2>
          <span className="skill-sub">{skills.length} skills · trio style</span>
        </div>
        <div className="skill-header-action">
          {!editMode && (
            <button
              className="btn-edit-shed"
              disabled={!signedIn}
              onClick={() => setEditMode(true)}
              title={signedIn ? 'Log a shed sesh' : 'Sign in to log practice'}
            >
              + Edit shed
            </button>
          )}
          {editMode && pendingCount === 0 && (
            <button className="btn-edit-shed btn-edit-shed-done" onClick={() => setEditMode(false)}>
              Done
            </button>
          )}
          {editMode && pendingCount > 0 && (
            <div className="commit-cluster">
              <button className="commit-bar-clear" onClick={discard} title="discard pending edits" aria-label="discard">×</button>
              <button
                className="btn commit-bar-go"
                disabled={!signedIn || committing}
                onClick={commit}
              >
                {committing ? 'Logging…' : `Log shed sesh (${pendingCount})`}
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={`skill-matrix ${editMode ? 'skill-matrix-editing' : ''}`}>
        {LH_GROUP_ORDER.map(group => {
          const groupCards = byGroup[group];
          if (!groupCards || groupCards.length === 0) return null;
          return (
            <div key={group} className="skill-group">
              <div className="skill-group-head">{LH_GROUP_LABEL[group]}</div>
              {groupCards.map(({ lhPart, cells }) => (
                <div key={lhPart} className="lh-card">
                  <div className="lh-card-head">
                    <span className="lh-card-title">LH plays {LH_PART_LABEL[lhPart]}</span>
                  </div>
                  <div className="lh-card-rows">
                    {cells.map(sk => {
                      const p = pending[sk.skillId];
                      const bpmDefault = sk.lastBpm ?? targetBpm;
                      const bpmValue = p?.bpm ?? bpmDefault;
                      return (
                        <div key={sk.skillId} className={`lh-card-row ${p ? 'lh-card-row-pending' : ''}`}>
                          <span className="rh-label">
                            <span className="rh-with">with</span> RH {RH_PART_LABEL[sk.rhPart ?? '']}
                          </span>
                          <span className="rh-stat rh-stat-best">
                            <span className="rs-num">{sk.bestBpm ?? '—'}</span>
                            {sk.bestBpm != null && <span className="rs-unit">bpm</span>}
                            <span className="rs-tag">best</span>
                          </span>
                          <span className="rh-stat rh-stat-reps">
                            <span className="rs-num">{sk.sessionsCount}</span>
                            <span className="rs-tag">{sk.sessionsCount === 1 ? 'rep' : 'reps'}</span>
                          </span>
                          <span className="rh-stat rh-stat-when">
                            <span className="rs-num">{daysLabel(sk.lastPracticedAt)}</span>
                          </span>
                          {editMode && (
                            <ScrubBpm
                              value={bpmValue}
                              defaultValue={bpmDefault}
                              pending={!!p}
                              onChange={(v) => setBpmFor(sk.skillId, v)}
                              onClear={() => setBpmFor(sk.skillId, bpmDefault)}
                              onToggle={() => {
                                // Tap toggles "include in this commit" at the
                                // displayed value — lets you log a skill at
                                // the same BPM as last time without scrubbing.
                                if (p) {
                                  setPending(prev => {
                                    const { [sk.skillId]: _omit, ...rest } = prev;
                                    return rest;
                                  });
                                } else {
                                  setBpmFor(sk.skillId, bpmValue);
                                }
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        <div className="skill-group skill-group-coming">
          <span className="cs-eyebrow">Solo Piano · in construction</span>
        </div>
      </div>
    </section>
  );
}
