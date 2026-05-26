'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NOTE_NAMES, keyName, relativeShort, styleAccent } from '@jazz/lib/format';
import { VinylHero } from '@jazz/components/VinylHero';

interface ApiItem {
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

type SortCol = 'title' | 'composer' | 'style' | 'key' | 'bpm' | 'sessions' | 'skills' | 'last';
type SortDir = 'asc' | 'desc' | null;
type FilterShow = 'all' | 'practiced' | 'never';

function SkillsDots({ count }: { count: number }) {
  return (
    <div className="skill-dots" title={`${count} of 10 skills logged`}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className={i < count ? 'sd on' : 'sd'} />
      ))}
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<main className="library"><div className="empty">loading the book…</div></main>}>
      <LibraryPageInner />
    </Suspense>
  );
}

function LibraryPageInner() {
  const [items, setItems] = useState<ApiItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [show, setShow] = useState<FilterShow>('all');
  const [styleFilter, setStyleFilter] = useState<string[]>([]);
  const [keyFilter, setKeyFilter] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const [composerFilter, setComposerFilter] = useState<string | null>(searchParams.get('composer'));
  const [showDrawer, setShowDrawer] = useState(false);
  const [sort, setSort] = useState<{ col: SortCol | null; dir: SortDir }>({ col: null, dir: null });
  const [page, setPage] = useState(0);
  const perPage = 16;

  // Debounce query
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  // Reset to page 0 on filter/search/sort change
  useEffect(() => {
    setPage(0);
  }, [debouncedQuery, show, styleFilter, keyFilter, composerFilter, sort]);

  // Fetch (server-side pagination for title/last sorts; we request a wide
  // result to filter client-side for styles/keys/composers because the API
  // doesn't support them server-side yet).
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '200' });
    if (!sort.col) params.set('sort', 'recent');
    else if (sort.col === 'bpm') params.set('sort', 'target_bpm');
    else if (sort.col === 'last') params.set('sort', 'recent');
    else params.set('sort', 'title');
    if (debouncedQuery) params.set('q', debouncedQuery);
    fetch(`/api/jazz/standards?${params}`)
      .then(r => r.json())
      .then(res => {
        setItems(res.items ?? []);
        setTotal(res.total ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [debouncedQuery, sort.col]);

  const allStyles = useMemo(() => {
    const s = new Set<string>();
    items.forEach(it => it.style && s.add(it.style));
    return [...s].sort();
  }, [items]);

  const filtered = useMemo(() => {
    let list = items.slice();
    if (show === 'practiced') list = list.filter(s => s.sessionsCount > 0);
    if (show === 'never') list = list.filter(s => s.sessionsCount === 0);
    if (composerFilter) list = list.filter(s => s.composer === composerFilter);
    if (styleFilter.length > 0) list = list.filter(s => styleFilter.includes(s.style ?? ''));
    if (keyFilter !== null) list = list.filter(s => s.homeKey === keyFilter);

    const c = sort.col;
    const dir = sort.dir;
    if (c && dir) {
      list.sort((a, b) => {
        let d = 0;
        if (c === 'title') d = a.title.localeCompare(b.title);
        else if (c === 'composer') d = (a.composer ?? '').localeCompare(b.composer ?? '');
        else if (c === 'style') d = (a.style ?? '').localeCompare(b.style ?? '');
        else if (c === 'key') d = a.homeKey - b.homeKey;
        else if (c === 'bpm') d = a.targetBpm - b.targetBpm;
        else if (c === 'sessions') d = a.sessionsCount - b.sessionsCount;
        else if (c === 'skills') d = a.skillsLoggedCount - b.skillsLoggedCount;
        else if (c === 'last') d = 0;
        if (d === 0) d = a.title.localeCompare(b.title);
        return dir === 'asc' ? d : -d;
      });
    }
    return list;
  }, [items, show, composerFilter, styleFilter, keyFilter, sort]);

  const start = page * perPage;
  const rows = filtered.slice(start, start + perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const activeFilterCount =
    (composerFilter ? 1 : 0) +
    styleFilter.length +
    (keyFilter !== null ? 1 : 0) +
    (show !== 'all' ? 1 : 0) +
    (debouncedQuery ? 1 : 0);

  function toggleSort(col: SortCol) {
    setSort(prev => {
      if (prev.col === col) {
        if (prev.dir === 'asc') return { col, dir: 'desc' };
        if (prev.dir === 'desc') return { col: null, dir: null };
        return { col, dir: 'asc' };
      }
      const defaultDir: SortDir = ['sessions', 'skills', 'last', 'bpm'].includes(col) ? 'desc' : 'asc';
      return { col, dir: defaultDir };
    });
  }

  function toggleStyleFilter(s: string) {
    setStyleFilter(prev => (prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]));
  }

  function clearAll() {
    setComposerFilter(null);
    setStyleFilter([]);
    setKeyFilter(null);
    setQuery('');
    setShow('all');
  }

  function SortHeader({ col, children, align }: { col: SortCol; children: React.ReactNode; align?: 'right' }) {
    const active = sort.col === col && sort.dir;
    return (
      <button className={`sort-h ${active ? 'on' : ''} ${align === 'right' ? 'right' : ''}`} onClick={() => toggleSort(col)}>
        <span className="sort-h-label">{children}</span>
        <span className={`sort-h-arrow ${active ? sort.dir : ''}`}>
          {active ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}
        </span>
      </button>
    );
  }

  return (
    <main className="library">
      <VinylHero
        total={total}
        known={items.filter(s => s.sessionsCount > 0).length}
        totalSessions={items.reduce((m, s) => m + s.sessionsCount, 0)}
        query={query}
        setQuery={setQuery}
        items={items}
      />

      {(composerFilter || styleFilter.length > 0 || keyFilter !== null) && (
        <div className="active-filters">
          <span className="af-label">filtering by</span>
          {composerFilter && (
            <button className="af-chip" onClick={() => setComposerFilter(null)}>
              composer <em>{composerFilter}</em>
              <span className="af-x">×</span>
            </button>
          )}
          {styleFilter.map(s => (
            <button key={s} className="af-chip" onClick={() => toggleStyleFilter(s)}>
              style <em>{s}</em>
              <span className="af-x">×</span>
            </button>
          ))}
          {keyFilter !== null && (
            <button className="af-chip" onClick={() => setKeyFilter(null)}>
              key <em>{NOTE_NAMES[keyFilter]}</em>
              <span className="af-x">×</span>
            </button>
          )}
          <button className="af-clear" onClick={clearAll}>
            clear all
          </button>
        </div>
      )}

      <div className="toolbar">
        <div className="chips">
          <span className="chips-label">show</span>
          {(['all', 'practiced', 'never'] as FilterShow[]).map(k => (
            <button key={k} className={show === k ? 'chip on' : 'chip'} onClick={() => setShow(k)}>
              {k === 'all' ? 'all' : k === 'practiced' ? 'in progress' : 'untouched'}
            </button>
          ))}
        </div>
        <button className={`filter-toggle ${showDrawer ? 'on' : ''}`} onClick={() => setShowDrawer(v => !v)}>
          + style &amp; key {activeFilterCount > 0 && <span className="ft-count">{activeFilterCount}</span>}
        </button>
        <div className="result-count">
          <span>
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>

      {showDrawer && (
        <div className="filter-drawer">
          <div className="fd-group">
            <div className="fd-label">style</div>
            <div className="fd-chips">
              {allStyles.map(s => (
                <button
                  key={s}
                  className={`style-pill ${styleAccent(s)} ${styleFilter.includes(s) ? 'sel' : ''}`}
                  onClick={() => toggleStyleFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="fd-group">
            <div className="fd-label">home key</div>
            <div className="key-picker">
              {Array.from({ length: 12 }).map((_, k) => (
                <button
                  key={k}
                  className={k === keyFilter ? 'kp on' : 'kp'}
                  onClick={() => setKeyFilter(k === keyFilter ? null : k)}
                >
                  {NOTE_NAMES[k]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="catalog">
        <div className="cat-head">
          <div className="col-num">№</div>
          <div className="col-title">
            <SortHeader col="title">title</SortHeader>
            <span className="cat-head-sep">/</span>
            <SortHeader col="composer">composer</SortHeader>
          </div>
          <div className="col-style">
            <SortHeader col="style">style</SortHeader>
          </div>
          <div className="col-key">
            <SortHeader col="key">key</SortHeader>
          </div>
          <div className="col-bpm">
            <SortHeader col="bpm">target</SortHeader>
          </div>
          <div className="col-sess">
            <SortHeader col="sessions">sheds</SortHeader>
          </div>
          <div className="col-skills">
            <SortHeader col="skills">skills</SortHeader>
          </div>
          <div className="col-last">
            <SortHeader col="last">last shed</SortHeader>
          </div>
        </div>

        {loading && rows.length === 0 && <div className="empty">loading the book…</div>}

        {rows.map((s, i) => (
          <div key={s.id} className="cat-row">
            <Link href={`/jazz/standards/${s.id}`} className="cat-row-main">
              <div className="col-num">{String(start + i + 1).padStart(3, '0')}</div>
              <div className="col-title">
                <div className="row-title">{s.title}</div>
                <div className="row-comp">{s.composer ?? ''}</div>
              </div>
            </Link>
            <div className="col-style">
              {s.style && (
                <button
                  className={`style-pill clickable ${styleAccent(s.style)} ${styleFilter.includes(s.style) ? 'sel' : ''}`}
                  onClick={e => {
                    e.stopPropagation();
                    toggleStyleFilter(s.style!);
                  }}
                  title={`filter by ${s.style}`}
                >
                  {s.style}
                </button>
              )}
            </div>
            <div className="col-key">
              <button
                className="key-badge clickable"
                onClick={e => {
                  e.stopPropagation();
                  setKeyFilter(keyFilter === s.homeKey ? null : s.homeKey);
                }}
                title={`filter by key of ${keyName(s.homeKey, s.isMinor)}`}
              >
                {keyName(s.homeKey, s.isMinor)}
              </button>
            </div>
            <Link href={`/jazz/standards/${s.id}`} className="cat-row-tail">
              <div className="col-bpm">
                <span className="bpm-num">{s.targetBpm}</span>
                <span className="bpm-unit">bpm</span>
              </div>
              <div className="col-sess">
                <span className="sess-num">{s.sessionsCount}</span>
              </div>
              <div className="col-skills">
                <SkillsDots count={s.skillsLoggedCount} />
              </div>
              <div className="col-last">
                <span className={s.lastPracticedAt ? 'last-rel' : 'last-never'}>{relativeShort(s.lastPracticedAt)}</span>
              </div>
            </Link>
          </div>
        ))}

        {!loading && rows.length === 0 && (
          <div className="empty">
            No standards match.
            <button onClick={clearAll}>reset filters</button>
          </div>
        )}
      </div>

      <div className="pager">
        <button className="pager-btn" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
          ← prev
        </button>
        <div className="pager-pages">
          <span className="pager-cur">page {page + 1}</span>
          <span className="pager-of">of {totalPages}</span>
        </div>
        <button className="pager-btn" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
          next →
        </button>
      </div>
    </main>
  );
}
