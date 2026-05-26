'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { relativeShort, styleAccent } from '@jazz/lib/format';

export interface HeroStandard {
  id: string;
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  isMinor: boolean;
  targetBpm: number;
  bpmSource: string;
  lastPracticedAt: string | null;
  sessionsCount: number;
  skillsLoggedCount: number;
}

export function VinylHero({
  total,
  known,
  totalSessions,
  query,
  setQuery,
  items,
}: {
  total: number;
  known: number;
  totalSessions: number;
  query: string;
  setQuery: (q: string) => void;
  items: HeroStandard[];
}) {
  const router = useRouter();

  // Featured: most recently practiced. Fallback: first item with sessions, else first item.
  const featured =
    [...items]
      .filter(s => s.lastPracticedAt)
      .sort((a, b) => (b.lastPracticedAt ?? '').localeCompare(a.lastPracticedAt ?? ''))[0] ??
    items.find(s => s.sessionsCount > 0) ??
    items[0];

  const closeToTarget = items.find(s => s.sessionsCount > 0 && s.skillsLoggedCount >= 5 && s.skillsLoggedCount < 10);
  const untouched = items.find(s => s.sessionsCount === 0);
  const ballad = items.find(s => s.style?.includes('Ballad') && s.sessionsCount > 0)
    ?? items.find(s => s.style?.includes('Ballad'));

  function pickRandom() {
    if (items.length === 0) return;
    const r = items[Math.floor(Math.random() * items.length)];
    router.push(`/jazz/standards/${r.id}`);
  }

  return (
    <section className="hero hero-vinyl">
      <div className="vh-grid">
        <Link href={featured ? `/jazz/standards/${featured.id}` : '/jazz/standards'} className="vh-feature">
          <div className="vh-feature-eyebrow">pick up where you left off</div>
          <div className="vh-feature-main">
            <div className="vh-spindle">
              <svg viewBox="0 0 64 64" className="vh-disc" aria-hidden="true">
                <circle cx={32} cy={32} r={30} className="vh-disc-outer" />
                <circle cx={32} cy={32} r={22} className="vh-disc-mid" fill="none" />
                <circle cx={32} cy={32} r={14} className="vh-disc-label" />
                <circle cx={32} cy={32} r={2.5} className="vh-disc-spindle" />
              </svg>
            </div>
            <div className="vh-feature-text">
              <div className="vh-title">{featured?.title ?? 'No tunes yet'}</div>
              <div className="vh-comp">{featured?.composer ?? 'pick one to start'}</div>
              <div className="vh-meta">
                {featured && (
                  <>
                    {featured.style && <span className={`style-pill ${styleAccent(featured.style)}`}>{featured.style}</span>}
                    <span className="vh-meta-sep">·</span>
                    <span>{featured.skillsLoggedCount}/10 skills</span>
                    <span className="vh-meta-sep">·</span>
                    <span>last played {relativeShort(featured.lastPracticedAt)}</span>
                  </>
                )}
              </div>
            </div>
            <div className="vh-feature-cta">resume →</div>
          </div>
        </Link>

        <div className="vh-side">
          <button className="vh-pick" onClick={pickRandom}>
            <div className="vh-pick-icon vh-shuffle">⤭</div>
            <div className="vh-pick-text">
              <div className="vh-pick-label">drop the needle</div>
              <div className="vh-pick-sub">random tune from the book</div>
            </div>
          </button>
          {closeToTarget && (
            <Link href={`/jazz/standards/${closeToTarget.id}`} className="vh-pick">
              <div className="vh-pick-icon">◐</div>
              <div className="vh-pick-text">
                <div className="vh-pick-label">finish the set</div>
                <div className="vh-pick-sub">&ldquo;{closeToTarget.title}&rdquo; · {closeToTarget.skillsLoggedCount}/10</div>
              </div>
            </Link>
          )}
          {untouched && (
            <Link href={`/jazz/standards/${untouched.id}`} className="vh-pick">
              <div className="vh-pick-icon">＋</div>
              <div className="vh-pick-text">
                <div className="vh-pick-label">try something new</div>
                <div className="vh-pick-sub">&ldquo;{untouched.title}&rdquo; · never played</div>
              </div>
            </Link>
          )}
          {ballad && (
            <Link href={`/jazz/standards/${ballad.id}`} className="vh-pick">
              <div className="vh-pick-icon">♪</div>
              <div className="vh-pick-text">
                <div className="vh-pick-label">cool it down</div>
                <div className="vh-pick-sub">a ballad · &ldquo;{ballad.title}&rdquo;</div>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="vh-stats">
        <span><b>{total.toLocaleString()}</b> tracks</span>
        <span className="vh-stats-dot">●</span>
        <span><b>{known}</b> in your book</span>
        <span className="vh-stats-dot">●</span>
        <span><b>{totalSessions}</b> takes</span>
      </div>

      <div className="search">
        <span className="search-label">search</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="search the book…"
          className="search-input"
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery('')}>clear</button>
        )}
      </div>
    </section>
  );
}
