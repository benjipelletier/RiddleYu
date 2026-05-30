'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { keyName, relativeShort, styleAccent } from '@jazz/lib/format';

interface Item {
  id: string;
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  isMinor: boolean;
  lastPracticedAt: string | null;
  sessionsCount: number;
  skillsLoggedCount: number;
}

const PILL_COUNT = 6;
const RECENT_WINDOW_DAYS = 30;

export function ActivelyPracticing({ items }: { items: Item[] }) {
  const top = useMemo(() => {
    const now = Date.now();
    const cutoff = now - RECENT_WINDOW_DAYS * 86_400_000;
    return [...items]
      .filter(s => s.lastPracticedAt && new Date(s.lastPracticedAt).getTime() >= cutoff)
      .sort((a, b) => (b.lastPracticedAt ?? '').localeCompare(a.lastPracticedAt ?? ''))
      .slice(0, PILL_COUNT);
  }, [items]);

  if (top.length === 0) return null;

  return (
    <section className="ap-strip">
      <header className="ap-head">
        <span className="ap-eyebrow">actively in the shed</span>
        <span className="ap-count">{top.length} song{top.length === 1 ? '' : 's'} · last {RECENT_WINDOW_DAYS} days</span>
      </header>
      <ul className="ap-list">
        {top.map(s => {
          // Coverage = % of the 10-skill matrix you've touched in this song.
          // Drives the background fill so the card itself reads as a progress bar.
          const pct = Math.min(100, Math.round((s.skillsLoggedCount / 10) * 100));
          const complete = s.skillsLoggedCount >= 10;
          return (
            <li key={s.id}>
              <Link
                href={`/jazz/standards/${s.id}`}
                className={`ap-card ${complete ? 'ap-card-complete' : ''}`}
                style={{ ['--ap-fill-pct' as string]: `${pct}%` }}
              >
                <div className="ap-card-fill" aria-hidden="true" />
                <div className="ap-card-content">
                  <div className="ap-card-when">{relativeShort(s.lastPracticedAt)}</div>
                  <div className="ap-card-title">{s.title}</div>
                  {s.composer && <div className="ap-card-comp">{s.composer}</div>}
                  <div className="ap-card-foot">
                    {s.style && <span className={`style-pill ${styleAccent(s.style)}`}>{s.style}</span>}
                    <span className="ap-card-key">{keyName(s.homeKey, s.isMinor)}</span>
                  </div>
                  <div className="ap-card-stats">
                    <span><b>{s.sessionsCount}</b> sheds</span>
                    <span className="ap-stats-sep">·</span>
                    <span><b>{s.skillsLoggedCount}</b>/10 skills</span>
                    <span className="ap-card-pct">{pct}%</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
