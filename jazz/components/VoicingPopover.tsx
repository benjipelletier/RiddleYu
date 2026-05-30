'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PianoVoicing } from './PianoVoicing';
import { FormatChord } from './FormatChord';
import { normalizeChordSymbol } from '@jazz/lib/chord-symbol';

export interface Voicing {
  id: string;
  chordSymbol: string;
  voicingType: string;
  notes: number[];
  label: string | null;
  sortOrder: number;
  originStandard: { id: string; title: string } | null;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  chord: string;
  voicings: Voicing[];
  standardId: string;
  signedIn: boolean;
  anchor: DOMRect;
  onClose: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onCreated: (v: Voicing) => void;
  onUpdated: (v: Voicing) => void;
  onDeleted: (id: string) => void;
}

interface DraftState {
  // 'new' for unsaved adds; voicing id for edits.
  key: string;
  notes: number[];
}

export function VoicingPopover({
  chord,
  voicings,
  standardId,
  signedIn,
  anchor,
  onClose,
  onPointerEnter,
  onPointerLeave,
  onCreated,
  onUpdated,
  onDeleted,
}: Props) {
  const popRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; flipped: boolean } | null>(null);
  const [drafts, setDrafts] = useState<Record<string, DraftState>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Reset position whenever the anchor changes so we hide-and-recompute.
  useLayoutEffect(() => {
    setPos(null);
  }, [anchor]);

  // Position below the chord, flipping above if not enough room.
  useLayoutEffect(() => {
    if (!mounted || !popRef.current) return;
    const rect = popRef.current.getBoundingClientRect();
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const margin = 8;

    let left = anchor.left + anchor.width / 2 - rect.width / 2;
    left = Math.max(margin, Math.min(left, vpW - rect.width - margin));

    let top = anchor.bottom + 6;
    let flipped = false;
    if (top + rect.height > vpH - margin) {
      const altTop = anchor.top - rect.height - 6;
      if (altTop >= margin) {
        top = altTop;
        flipped = true;
      }
    }
    setPos({ top, left, flipped });
  }, [mounted, anchor, voicings.length, drafts]);

  // Close on click outside or Esc.
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!popRef.current) return;
      if (popRef.current.contains(e.target as Node)) return;
      onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    // Defer for one tick so the opening click doesn't immediately close it.
    const t = setTimeout(() => {
      document.addEventListener('mousedown', onDown);
      document.addEventListener('keydown', onKey);
    }, 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  function startEdit(v: Voicing) {
    setDrafts(d => ({ ...d, [v.id]: { key: v.id, notes: [...v.notes] } }));
  }
  function cancelEdit(key: string) {
    setDrafts(d => {
      const { [key]: _gone, ...rest } = d;
      return rest;
    });
  }
  function addNew() {
    setDrafts(d => ({ ...d, new: { key: 'new', notes: [] } }));
  }
  function updateDraft(key: string, patch: Partial<DraftState>) {
    setDrafts(d => ({ ...d, [key]: { ...d[key], ...patch } }));
  }

  async function saveNew() {
    const draft = drafts.new;
    if (!draft || draft.notes.length === 0) return;
    setBusy('new');
    try {
      const res = await fetch('/api/jazz/voicings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chordSymbol: chord,
          notes: draft.notes,
          originStandardId: standardId,
        }),
      });
      if (!res.ok) {
        setBusy(null);
        return;
      }
      const created = (await res.json()) as Voicing;
      onCreated(created);
      cancelEdit('new');
    } finally {
      setBusy(null);
    }
  }

  async function saveEdit(id: string) {
    const draft = drafts[id];
    if (!draft) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/jazz/voicings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: draft.notes,
        }),
      });
      if (!res.ok) {
        setBusy(null);
        return;
      }
      const updated = (await res.json()) as Voicing;
      onUpdated(updated);
      cancelEdit(id);
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    setBusy(id);
    try {
      const res = await fetch(`/api/jazz/voicings/${id}`, { method: 'DELETE' });
      if (res.ok) onDeleted(id);
    } finally {
      setBusy(null);
    }
  }

  if (!mounted) return null;

  const content = (
    <div
      ref={popRef}
      className={`voicing-pop ${pos?.flipped ? 'voicing-pop-flipped' : ''}`}
      style={{
        top: pos?.top ?? 0,
        left: pos?.left ?? 0,
        visibility: pos ? 'visible' : 'hidden',
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      role="dialog"
    >
      <div className="voicing-pop-head">
        <span className="voicing-pop-chord"><FormatChord chord={chord} /></span>
        <span className="voicing-pop-sub">LH Willy Special</span>
      </div>

      <div className="voicing-pop-body">
        {voicings.length === 0 && !drafts.new && (
          <div className="voicing-pop-empty">
            {signedIn ? 'No voicings yet.' : 'No voicings yet.'}
          </div>
        )}

        {(() => {
          // All returned voicings share the same base_symbol as the hovered
          // chord. Group them by chord_symbol so each altered variant gets
          // its own section. The "exact" section (chord_symbol matches the
          // hovered chord after slash-strip) has no label; the others are
          // labeled "also from <SYMBOL>". Within each section, sub-group
          // by origin standard so "from <STANDARD>" only shows once.
          const exactSym = normalizeChordSymbol(chord);
          const byChord = new Map<string, Voicing[]>();
          for (const v of voicings) {
            const arr = byChord.get(v.chordSymbol) ?? [];
            arr.push(v);
            byChord.set(v.chordSymbol, arr);
          }
          const sections: { kind: 'exact' | 'related'; symbol: string; items: Voicing[] }[] = [];
          const exactItems = byChord.get(exactSym);
          if (exactItems && exactItems.length > 0) {
            sections.push({ kind: 'exact', symbol: exactSym, items: exactItems });
          }
          const relatedSyms = Array.from(byChord.keys())
            .filter(s => s !== exactSym)
            .sort((a, b) => a.localeCompare(b));
          for (const sym of relatedSyms) {
            sections.push({ kind: 'related', symbol: sym, items: byChord.get(sym)! });
          }

          function groupByOrigin(items: Voicing[]) {
            const groups: { key: string; origin: Voicing['originStandard']; items: Voicing[] }[] = [];
            const seen = new Map<string, number>();
            for (const v of items) {
              const key = v.originStandard?.id ?? '__none__';
              const idx = seen.get(key);
              if (idx == null) {
                seen.set(key, groups.length);
                groups.push({ key, origin: v.originStandard, items: [v] });
              } else {
                groups[idx].items.push(v);
              }
            }
            return groups;
          }

          return sections.map(section => (
            <div key={section.symbol} className={`voicing-section voicing-section-${section.kind}`}>
              {section.kind === 'related' && (
                <div className="voicing-section-head">
                  also from <FormatChord chord={section.symbol} />
                </div>
              )}
              {groupByOrigin(section.items).map(g => (
                <div key={g.key} className="voicing-group">
                  {g.items.map(v => {
                    const draft = drafts[v.id];
                    const editing = !!draft;
                    return (
                      <div key={v.id} className={`voicing-row ${editing ? 'voicing-row-edit' : ''}`}>
                        <div className="voicing-piano-wrap">
                          <PianoVoicing
                            notes={editing ? draft.notes : v.notes}
                            editable={editing}
                            onChange={(n) => updateDraft(v.id, { notes: n })}
                          />
                        </div>
                        {signedIn && (
                          <div className="voicing-row-actions">
                            {editing ? (
                              <>
                                <button
                                  className="voicing-btn voicing-btn-primary"
                                  disabled={busy === v.id || draft.notes.length === 0}
                                  onClick={() => saveEdit(v.id)}
                                >
                                  {busy === v.id ? '…' : 'save'}
                                </button>
                                <button
                                  className="voicing-btn"
                                  onClick={() => cancelEdit(v.id)}
                                >
                                  cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="voicing-btn voicing-btn-icon"
                                  title="edit"
                                  onClick={() => startEdit(v)}
                                >
                                  ✎
                                </button>
                                <button
                                  className="voicing-btn voicing-btn-icon voicing-btn-danger"
                                  title="delete"
                                  disabled={busy === v.id}
                                  onClick={() => remove(v.id)}
                                >
                                  ×
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {g.origin && (
                    <div className="voicing-group-origin">
                      <span className="voicing-origin-prefix">from</span>
                      <Link
                        href={`/jazz/standards/${g.origin.id}`}
                        className="voicing-origin"
                      >
                        {g.origin.title}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ));
        })()}

        {drafts.new && (
          <div className="voicing-row voicing-row-edit voicing-row-new">
            <div className="voicing-piano-wrap">
              <PianoVoicing
                notes={drafts.new.notes}
                editable
                onChange={(n) => updateDraft('new', { notes: n })}
              />
            </div>
            <div className="voicing-row-actions">
              <button
                className="voicing-btn voicing-btn-primary"
                disabled={busy === 'new' || drafts.new.notes.length === 0}
                onClick={saveNew}
              >
                {busy === 'new' ? '…' : 'save'}
              </button>
              <button className="voicing-btn" onClick={() => cancelEdit('new')}>
                cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {signedIn && !drafts.new && (
        <div className="voicing-pop-foot">
          <button className="voicing-btn voicing-btn-add" onClick={addNew}>
            + Add voicing
          </button>
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}
