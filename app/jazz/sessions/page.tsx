'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { styleAccent, keyName } from '@jazz/lib/format';

interface SessionItem {
  id: string;
  standardId: string;
  title: string;
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

export default function WoodshedPage() {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/jazz/sessions?limit=200')
      .then(r => r.json())
      .then(res => {
        setSessions(res.items ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function deleteSession(e: React.MouseEvent, sessionId: string, title: string) {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Delete this session on "${title}"? This can't be undone.`)) return;
    setDeleting(sessionId);
    const res = await fetch(`/api/jazz/sessions/${sessionId}`, { method: 'DELETE' });
    setDeleting(null);
    if (res.ok) {
      setSessions(prev => prev.filter(s => s.id !== sessionId));
    } else {
      const body = await res.json().catch(() => ({}));
      window.alert(`Couldn't delete: ${body.error ?? `HTTP ${res.status}`}`);
    }
  }

  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const last7 = sessions.filter(s => dayOffset(s.startedAt) < 7).length;
    const last30 = sessions.filter(s => dayOffset(s.startedAt) < 30).length;
    const totalMinutes = sessions.reduce((m, s) => m + durationMin(s), 0);
    const totalHours = Math.round(totalMinutes / 60);
    return { totalSessions, last7, last30, totalMinutes, totalHours };
  }, [sessions]);

  const daySet = useMemo(() => new Set(sessions.map(s => dayOffset(s.startedAt))), [sessions]);
  const streak = useMemo(() => {
    let n = 0;
    while (daySet.has(n)) n++;
    return n;
  }, [daySet]);

  const byTitle = useMemo(() => {
    const m = new Map<string, number>();
    sessions.forEach(s => m.set(s.title, (m.get(s.title) ?? 0) + 1));
    return m;
  }, [sessions]);
  const topStandard = useMemo(() => {
    const arr = [...byTitle.entries()].sort((a, b) => b[1] - a[1])[0];
    return arr ? { title: arr[0], count: arr[1] } : null;
  }, [byTitle]);

  // 12-week heatmap
  const WEEKS = 12;
  const heatmap = useMemo(() => {
    const weeks: { dayOffset: number; count: number; date: Date }[][] = [];
    for (let w = WEEKS - 1; w >= 0; w--) {
      const week: typeof weeks[number] = [];
      for (let d = 6; d >= 0; d--) {
        const off = w * 7 + d;
        const count = sessions.filter(s => dayOffset(s.startedAt) === off).length;
        const date = new Date(Date.now() - off * 86_400_000);
        week.push({ dayOffset: off, count, date });
      }
      weeks.push(week);
    }
    return weeks;
  }, [sessions]);
  const maxCount = Math.max(1, ...heatmap.flat().map(d => d.count));

  const groups = useMemo(() => {
    const m = new Map<number, { dayOffset: number; date: Date; items: SessionItem[] }>();
    sessions.forEach(s => {
      const off = dayOffset(s.startedAt);
      if (!m.has(off)) m.set(off, { dayOffset: off, date: new Date(s.startedAt), items: [] });
      m.get(off)!.items.push(s);
    });
    return [...m.values()].sort((a, b) => a.dayOffset - b.dayOffset).slice(0, 14);
  }, [sessions]);

  return (
    <main className="sessions">
      <section className="sess-hero">
        <div className="sess-hero-left">
          <div className="sess-eyebrow">your shed ledger</div>
          <h1 className="sess-title" style={{ fontFamily: 'Righteous' }}>Woodshed</h1>
          <div className="sess-tagline">
            {streak > 0 ? (
              <>
                <b>{streak}</b> day streak — keep it going
              </>
            ) : sessions.length === 0 && !loading ? (
              <>no shed logged yet — hit the library to begin</>
            ) : (
              <>hit the shed to begin a streak</>
            )}
          </div>
        </div>
        <div className="sess-hero-right">
          <div className="sess-stat">
            <div className="sess-stat-label">all time</div>
            <div className="sess-stat-val">
              {stats.totalSessions}
              <span className="sess-stat-unit">takes</span>
            </div>
          </div>
          <div className="sess-stat">
            <div className="sess-stat-label">this week</div>
            <div className="sess-stat-val">
              {stats.last7}
              <span className="sess-stat-unit">takes</span>
            </div>
          </div>
          <div className="sess-stat">
            <div className="sess-stat-label">last 30d</div>
            <div className="sess-stat-val">
              {stats.last30}
              <span className="sess-stat-unit">takes</span>
            </div>
          </div>
          <div className="sess-stat">
            <div className="sess-stat-label">time at the bench</div>
            <div className="sess-stat-val">
              {stats.totalHours}
              <span className="sess-stat-unit">hrs</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sess-heatmap">
        <div className="sh-header">
          <div className="sh-title">last 12 weeks</div>
          <div className="sh-legend">
            <span className="sh-legend-label">less</span>
            <span className="sh-cell s0"></span>
            <span className="sh-cell s1"></span>
            <span className="sh-cell s2"></span>
            <span className="sh-cell s3"></span>
            <span className="sh-cell s4"></span>
            <span className="sh-legend-label">more</span>
          </div>
        </div>
        <div className="sh-grid">
          <div className="sh-days">
            <div>Mon</div><div></div><div>Wed</div><div></div><div>Fri</div><div></div><div>Sun</div>
          </div>
          <div className="sh-weeks">
            {heatmap.map((week, wi) => (
              <div key={wi} className="sh-week">
                {week.map(day => {
                  const lvl = day.count === 0 ? 0 : Math.min(4, Math.ceil(day.count / Math.max(1, maxCount / 4)));
                  const dateStr = day.date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
                  return (
                    <span
                      key={day.dayOffset}
                      className={`sh-cell s${lvl}`}
                      title={`${day.count} shed${day.count === 1 ? '' : 's'} · ${dateStr}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {topStandard && (
        <section className="sess-highlights">
          <div className="sh-h-card">
            <div className="sh-h-eyebrow">most worked this run</div>
            <div className="sh-h-title">{topStandard.title}</div>
            <div className="sh-h-sub">
              <b>{topStandard.count}</b> takes
            </div>
          </div>
          <div className="sh-h-card">
            <div className="sh-h-eyebrow">avg shed</div>
            <div className="sh-h-title">
              {stats.totalSessions > 0 ? Math.round(stats.totalMinutes / stats.totalSessions) : 0}
              <span className="sess-stat-unit"> min</span>
            </div>
            <div className="sh-h-sub">across {stats.totalSessions} sheds</div>
          </div>
          <div className="sh-h-card">
            <div className="sh-h-eyebrow">tunes touched</div>
            <div className="sh-h-title">{byTitle.size}</div>
            <div className="sh-h-sub">in your active book</div>
          </div>
        </section>
      )}

      <section className="sess-feed">
        <div className="sess-feed-head">
          <h2 className="sess-feed-title">activity</h2>
          <span className="sess-feed-sub">
            {groups.length} {groups.length === 1 ? 'day' : 'days'} shown
          </span>
        </div>
        <div className="sess-feed-list">
          {loading && <div className="empty">loading…</div>}
          {!loading && groups.length === 0 && <div className="empty">no shed sessions yet.</div>}
          {groups.map(g => (
            <div key={g.dayOffset} className="sess-day">
              <div className="sess-day-head">
                <span className="sess-day-label">{fmtDay(g.date)}</span>
                <span className="sess-day-rule"></span>
                <span className="sess-day-count">
                  {g.items.length} take{g.items.length === 1 ? '' : 's'}
                </span>
              </div>
              {g.items.map(it => (
                <Link key={it.id} href={`/jazz/standards/${it.standardId}`} className="sess-take">
                  <div className="sess-take-time">
                    <span className="sess-take-bullet" style={{ background: 'var(--accent)' }}></span>
                  </div>
                  <div className="sess-take-main">
                    <div className="sess-take-title">
                      {it.title}
                      {it.practiceKey != null && (
                        <span className={`key-pill k-${((it.practiceKey % 12) + 12) % 12}`}>
                          {keyName(it.practiceKey)}
                        </span>
                      )}
                    </div>
                    <div className="sess-take-meta">
                      {it.notes && <span className="sess-take-comp">{it.notes}</span>}
                    </div>
                  </div>
                  <div className="sess-take-stats">
                    <div className="sess-take-skills">
                      <b>{it.itemCount}</b> skills
                    </div>
                    {durationMin(it) > 0 && (
                      <div className="sess-take-dur">
                        {durationMin(it)}
                        <span className="sess-stat-unit"> min</span>
                      </div>
                    )}
                    {it.topBpm != null && (
                      <div className="sess-take-bpm">
                        {it.topBpm}
                        <span className="sess-stat-unit"> bpm</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="sess-take-delete"
                    disabled={deleting === it.id}
                    onClick={e => deleteSession(e, it.id, it.title)}
                    aria-label="Delete this session"
                    title="Delete this session"
                  >
                    {deleting === it.id ? '…' : '×'}
                  </button>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
