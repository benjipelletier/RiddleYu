'use client';

import { useEffect, useMemo, useState } from 'react';
import { keyName } from '@jazz/lib/format';

interface SessionItem {
  id: string;
  standardId: string;
  practiceKey: number | null;
  startedAt: string;
  endedAt: string | null;
  notes: string | null;
  itemCount: number;
  topBpm: number | null;
}

function dayOffset(iso: string): number {
  const then = new Date(iso);
  then.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((now.getTime() - then.getTime()) / 86_400_000);
}

function durationMin(s: SessionItem): number {
  if (!s.endedAt) return 0;
  return Math.max(0, Math.round((new Date(s.endedAt).getTime() - new Date(s.startedAt).getTime()) / 60_000));
}

function fmtDay(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const diff = Math.round((today.getTime() - d.getTime()) / 86_400_000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return d.toLocaleDateString('en', { weekday: 'long' });
  return d.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' });
}

export function SongSessionsList({
  standardId,
  refreshKey,
  onChanged,
}: {
  standardId: string;
  /** Bump from the parent to force a refetch (e.g., after a commit). */
  refreshKey?: number;
  /** Called after a successful delete so the parent can refresh skill stats. */
  onChanged?: () => void;
}) {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/jazz/sessions?standardId=${encodeURIComponent(standardId)}&limit=100`)
      .then(r => r.json())
      .then(res => {
        setSessions(res.items ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [standardId, refreshKey]);

  const groups = useMemo(() => {
    const m = new Map<number, { dayOffset: number; date: Date; items: SessionItem[] }>();
    sessions.forEach(s => {
      const off = dayOffset(s.startedAt);
      if (!m.has(off)) m.set(off, { dayOffset: off, date: new Date(s.startedAt), items: [] });
      m.get(off)!.items.push(s);
    });
    return [...m.values()].sort((a, b) => a.dayOffset - b.dayOffset);
  }, [sessions]);

  async function deleteSession(e: React.MouseEvent, sessionId: string) {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Delete this session? This can't be undone.")) return;
    setDeleting(sessionId);
    const res = await fetch(`/api/jazz/sessions/${sessionId}`, { method: 'DELETE' });
    setDeleting(null);
    if (res.ok) {
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      onChanged?.();
    } else {
      const body = await res.json().catch(() => ({}));
      window.alert(`Couldn't delete: ${body.error ?? `HTTP ${res.status}`}`);
    }
  }

  return (
    <div className="song-sessions">
      <header className="song-sessions-head">
        <h3 className="song-sessions-title">Sessions on this tune</h3>
        <span className="song-sessions-count">
          {loading ? '…' : `${sessions.length} ${sessions.length === 1 ? 'take' : 'takes'}`}
        </span>
      </header>

      {!loading && sessions.length === 0 ? (
        <div className="song-sessions-empty">No sessions logged yet — your shed will show up here.</div>
      ) : (
        <div className="song-sessions-list">
          {groups.map(g => (
            <div key={g.dayOffset} className="sess-day">
              <div className="sess-day-head">
                <span className="sess-day-label">{fmtDay(g.date)}</span>
                <span className="sess-day-rule"></span>
                <span className="sess-day-count">{g.items.length} take{g.items.length === 1 ? '' : 's'}</span>
              </div>
              {g.items.map(it => (
                <div key={it.id} className="sess-take sess-take-compact">
                  <div className="sess-take-time">
                    <span className="sess-take-time-text">{fmtTime(it.startedAt)}</span>
                  </div>
                  <div className="sess-take-main">
                    <div className="sess-take-meta">
                      {it.practiceKey != null && (
                        <span className={`key-pill k-${((it.practiceKey % 12) + 12) % 12}`}>
                          {keyName(it.practiceKey)}
                        </span>
                      )}
                      {it.notes && <span className="sess-take-comp">{it.notes}</span>}
                    </div>
                  </div>
                  <div className="sess-take-stats">
                    <div className="sess-take-skills"><b>{it.itemCount}</b> skills</div>
                    {durationMin(it) > 0 && (
                      <div className="sess-take-dur">
                        {durationMin(it)}<span className="sess-stat-unit"> min</span>
                      </div>
                    )}
                    {it.topBpm != null && (
                      <div className="sess-take-bpm">
                        {it.topBpm}<span className="sess-stat-unit"> bpm</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="sess-take-delete"
                    disabled={deleting === it.id}
                    onClick={e => deleteSession(e, it.id)}
                    aria-label="Delete this session"
                    title="Delete this session"
                  >
                    {deleting === it.id ? '…' : '×'}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
