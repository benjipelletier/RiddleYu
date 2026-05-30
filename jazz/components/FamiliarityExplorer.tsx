'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NOTE_NAMES, keyName, styleAccent } from '@jazz/lib/format';
import { LoadingSpindle } from './LoadingSpindle';

interface FamiliarItem {
  standardId: string;
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  isMinor: boolean;
  viewKey: number;
  knownCells: number;
  totalCells: number;
  percent: number;
}

export function FamiliarityExplorer() {
  const [keyChoice, setKeyChoice] = useState<'any' | 'home' | number>('any');
  const [items, setItems] = useState<FamiliarItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const k = typeof keyChoice === 'number' ? String(keyChoice) : keyChoice;
    const url = `/api/jazz/familiarity?key=${k}&limit=80&minPercent=1`;
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal })
      .then(r => r.json())
      .then((res: { items: FamiliarItem[] }) => {
        setItems(res.items ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => ctrl.abort();
  }, [keyChoice]);

  return (
    <section className="fam-explorer">
      <header className="fam-head">
        <div className="fam-head-text">
          <span className="fam-eyebrow">explore by willy familiarity</span>
          <h2 className="fam-title">songs you might already know</h2>
        </div>
        <div className="fam-key-picker">
          <button
            className={`fam-key fam-key-wide ${keyChoice === 'any' ? 'on' : ''}`}
            onClick={() => setKeyChoice('any')}
            title="best familiarity across all 12 keys"
          >
            any
          </button>
          <button
            className={`fam-key ${keyChoice === 'home' ? 'on' : ''}`}
            onClick={() => setKeyChoice('home')}
            title="show familiarity at each song's home key"
          >
            home
          </button>
          {NOTE_NAMES.map((n, k) => (
            <button
              key={k}
              className={`fam-key ${keyChoice === k ? 'on' : ''}`}
              onClick={() => setKeyChoice(k)}
              title={`transpose every song to ${n}`}
            >
              {n}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="fam-empty">
          <LoadingSpindle size={56} label="computing…" />
        </div>
      ) : items.length === 0 ? (
        <div className="fam-empty">
          No familiar songs yet — add some Willy Special voicings on standards you know.
        </div>
      ) : (
        <ul className="fam-list">
          {items.map(it => (
            <li key={it.standardId}>
              <Link href={`/jazz/standards/${it.standardId}?key=${it.viewKey}`} className="fam-row">
                <div className="fam-bar">
                  <div className="fam-bar-fill" style={{ width: `${it.percent}%` }} />
                  <span className="fam-percent">{it.percent}%</span>
                </div>
                <div className="fam-row-text">
                  <span className="fam-row-title">{it.title}</span>
                  {it.composer && <span className="fam-row-comp">{it.composer}</span>}
                </div>
                <div className="fam-row-meta">
                  {it.style && <span className={`style-pill ${styleAccent(it.style)}`}>{it.style}</span>}
                  <span className="fam-row-key">in {keyName(it.viewKey, it.isMinor && it.viewKey === it.homeKey)}</span>
                  <span className="fam-row-cells">{it.knownCells}/{it.totalCells}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
