'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChordChart } from '@jazz/components/ChordChart';
import { KeyPicker } from '@jazz/components/KeyPicker';
import { BpmEditor } from '@jazz/components/BpmEditor';
import { SkillLogPanel, type SkillSummary } from '@jazz/components/SkillLogPanel';
import { SkillTrendChart } from '@jazz/components/SkillTrendChart';
import type { Voicing } from '@jazz/components/VoicingPopover';
import { LoadingSpindle } from '@jazz/components/LoadingSpindle';
import { transposeMeasures } from '@jazz/lib/transpose';
import { keyName, relativeShort, styleAccent } from '@jazz/lib/format';

interface StandardDetail {
  id: string;
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  isMinor: boolean;
  sourceBpm: number | null;
  targetBpm: number;
  bpmSource: 'ireal' | 'style_heuristic' | 'manual';
  timeSignature: string;
  form: string | null;
  chartData: string[][];
  viewingKey: number;
  skills: SkillSummary[];
  progressByKey: Record<number, { skillsLogged: number; skillsAtTarget: number; sessions: number }>;
  composerCount: number;
}

export default function StandardDetailPage() {
  return (
    <Suspense fallback={<main className="detail"><LoadingSpindle label="cueing the chart…" /></main>}>
      <StandardDetailInner />
    </Suspense>
  );
}

function StandardDetailInner() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  // ?key=N on the URL (used by the familiarity explorer to deep-link to a
  // specific transposition) seeds the viewing key for the first render.
  const initialKey = (() => {
    const raw = searchParams.get('key');
    if (raw == null) return null;
    const n = parseInt(raw);
    return Number.isFinite(n) && n >= 0 && n <= 11 ? n : null;
  })();
  const [standard, setStandard] = useState<StandardDetail | null>(null);
  const [viewingKey, setViewingKey] = useState<number | null>(initialKey);
  const [editBpm, setEditBpm] = useState(false);
  const [draftBpm, setDraftBpm] = useState(0);
  const [savingBpm, setSavingBpm] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [voicings, setVoicings] = useState<Record<string, Voicing[]>>({});

  useEffect(() => {
    fetch('/api/jazz/viewer').then(r => r.json()).then(v => setSignedIn(!!v?.signedIn)).catch(() => {});
  }, []);

  // Auto-dismiss toast.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchStandard = useCallback(async (keyParam?: number) => {
    const url = keyParam != null
      ? `/api/jazz/standards/${id}?key=${keyParam}`
      : `/api/jazz/standards/${id}`;
    const res = await fetch(url);
    const data = (await res.json()) as StandardDetail;
    setStandard(data);
    if (viewingKey === null) setViewingKey(data.homeKey);
    setLoading(false);
  }, [id, viewingKey]);

  // Re-fetch whenever the viewed key changes — skill stats are per-key.
  useEffect(() => {
    fetchStandard(viewingKey ?? undefined);
  }, [viewingKey, id]);  // eslint-disable-line react-hooks/exhaustive-deps

  // Mirror viewingKey into ?key=N on the URL so refreshes / shares preserve
  // it. Runs both when the user picks a key AND when the initial fetch
  // resolves the home key for a URL that had no ?key param.
  useEffect(() => {
    if (viewingKey == null) return;
    const current = parseInt(searchParams.get('key') ?? '');
    if (current === viewingKey) return;
    const sp = new URLSearchParams(searchParams.toString());
    sp.set('key', String(viewingKey));
    router.replace(`?${sp.toString()}`, { scroll: false });
  }, [viewingKey, router, searchParams]);

  const changeKey = useCallback((k: number) => {
    setViewingKey(k);
  }, []);

  // Distinct chord symbols + total cell count at the current viewing key —
  // distinct symbols drive the voicing batch-fetch; cell count drives the
  // Willy Special familiarity %.
  const { displayedChords, totalCells } = useMemo(() => {
    if (!standard) return { displayedChords: [] as string[], totalCells: 0 };
    const k = viewingKey ?? standard.homeKey;
    const shift = ((k - standard.homeKey) % 12 + 12) % 12;
    const bars = transposeMeasures(standard.chartData, shift);
    const set = new Set<string>();
    let cells = 0;
    for (const bar of bars) for (const c of bar) if (c) { set.add(c); cells++; }
    return { displayedChords: Array.from(set), totalCells: cells };
  }, [standard, viewingKey]);

  // Willy familiarity: % of chord cells (instances, not distinct chords)
  // whose chord symbol has at least one saved Willy Special voicing.
  const familiarity = useMemo(() => {
    if (!standard || totalCells === 0) return null;
    const k = viewingKey ?? standard.homeKey;
    const shift = ((k - standard.homeKey) % 12 + 12) % 12;
    const bars = transposeMeasures(standard.chartData, shift);
    let known = 0;
    for (const bar of bars) {
      for (const c of bar) {
        if (c && (voicings[c]?.length ?? 0) > 0) known++;
      }
    }
    return { known, total: totalCells, percent: Math.round((known / totalCells) * 100) };
  }, [standard, viewingKey, voicings, totalCells]);

  // Batch-fetch voicings for every distinct chord on the chart.
  useEffect(() => {
    if (displayedChords.length === 0) {
      setVoicings({});
      return;
    }
    const ctrl = new AbortController();
    const qs = new URLSearchParams({ chords: displayedChords.join(','), type: 'willy' });
    fetch(`/api/jazz/voicings?${qs.toString()}`, { signal: ctrl.signal })
      .then(r => r.json())
      .then((res: { voicings: Record<string, Voicing[]> }) => setVoicings(res.voicings ?? {}))
      .catch(() => {});
    return () => ctrl.abort();
  }, [displayedChords]);

  async function saveBpm(value: number) {
    if (!standard) return;
    setSavingBpm(true);
    await fetch(`/api/jazz/standards/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetBpm: value }),
    });
    setSavingBpm(false);
    setEditBpm(false);
    fetchStandard(viewingKey ?? undefined);
  }


  if (loading || !standard) {
    return (
      <main className="detail">
        <LoadingSpindle label="cueing the chart…" />
      </main>
    );
  }

  const skillsLoggedCount = standard.skills.filter(s => (s.tracksBpm ? s.lastBpm != null : s.sessionsCount > 0)).length;
  const sessionsCount = standard.skills.reduce((m, s) => Math.max(m, s.sessionsCount), 0);
  const lastPracticedAt = standard.skills
    .map(s => s.lastPracticedAt)
    .filter(Boolean)
    .sort()
    .reverse()[0] ?? null;

  return (
    <main className="detail">
      <div className="back">
        <Link href="/jazz/standards" className="back-btn">← back to library</Link>
      </div>

      <section className="title-block">
        <div className="title-left">
          <h1 className="big-title" style={{ fontFamily: 'Righteous' }}>{standard.title}</h1>
          <div className="composer">
            by{' '}
            {standard.composer ? (
              <Link href={`/jazz/standards?composer=${encodeURIComponent(standard.composer)}`} className="composer-link">
                <em>{standard.composer}</em>
                <span className="composer-count">→</span>
              </Link>
            ) : (
              <em>unknown</em>
            )}
          </div>
        </div>
        <div className="title-right">
          <div className="stat">
            <div className="stat-label">sheds</div>
            <div className="stat-val">{sessionsCount}</div>
          </div>
          <div className="stat">
            <div className="stat-label">skills logged</div>
            <div className="stat-val">
              {skillsLoggedCount}
              <span className="stat-of">/10</span>
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">last</div>
            <div className="stat-val stat-small">{relativeShort(lastPracticedAt)}</div>
          </div>
        </div>
      </section>

      <section className="chart-toolbar">
        <div className="tool-group">
          <span className="tool-label">transpose to</span>
          <KeyPicker
            selected={viewingKey ?? standard.homeKey}
            homeKey={standard.homeKey}
            onChange={changeKey}
            progressByKey={standard.progressByKey}
          />
          {viewingKey !== null && viewingKey !== standard.homeKey && (
            <button className="transpose-back" onClick={() => changeKey(standard.homeKey)} title="reset to home key">
              ↺ from {keyName(standard.homeKey, standard.isMinor)}
            </button>
          )}
          {(() => {
            const k = viewingKey ?? standard.homeKey;
            const prog = standard.progressByKey?.[k];
            const logged = prog?.skillsLogged ?? 0;
            const atTarget = prog?.skillsAtTarget ?? 0;
            return (
              <span className="key-progress-summary">
                {logged === 0 ? (
                  <span className="kps-empty">no shed yet in {keyName(k, standard.isMinor)}</span>
                ) : (
                  <>in {keyName(k, standard.isMinor)}: <b>{logged}</b>/10 skills · <b>{atTarget}</b> at target</>
                )}
              </span>
            );
          })()}
        </div>
        <div className="tool-group">
          <span className="tool-label">target BPM</span>
          {editBpm ? (
            <BpmEditor
              value={draftBpm}
              setValue={setDraftBpm}
              onSave={saveBpm}
              onCancel={() => setEditBpm(false)}
              saving={savingBpm}
            />
          ) : (
            <button
              className="bpm-display"
              disabled={!signedIn}
              onClick={() => {
                setDraftBpm(standard.targetBpm);
                setEditBpm(true);
              }}
              title={signedIn ? 'click to edit' : 'sign in to edit'}
            >
              <span className="bpm-display-num">{standard.targetBpm}</span>
              <span className="bpm-display-unit">bpm</span>
              {signedIn && (
                <span className="bpm-display-edit" aria-label="edit">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11.5 1.5 14 4 5 13l-3.5 1L2.5 10.5 11.5 1.5z" />
                    <path d="M9.5 3.5 12 6" />
                  </svg>
                </span>
              )}
            </button>
          )}
        </div>

      </section>

      <div className="detail-grid">
        <div className="detail-left">
          <section className="chart-card">
            <div className="chart-meta">
              {standard.style && <span className={`style-pill ${styleAccent(standard.style)}`}>{standard.style}</span>}
              <span className="chart-meta-sep">·</span>
              <span className="chart-meta-item">
                <span className="chart-meta-label">time</span>{' '}
                <span className="chart-meta-val">{standard.timeSignature}</span>
              </span>
              {standard.form && (
                <>
                  <span className="chart-meta-sep">·</span>
                  <span className="chart-meta-item">
                    <span className="chart-meta-label">form</span>{' '}
                    <span className="chart-meta-val">{standard.form}</span>
                  </span>
                </>
              )}
              <span className="chart-meta-spacer"></span>
              {familiarity && (
                <span
                  className="chart-meta-item chart-meta-familiarity"
                  title={`${familiarity.known} of ${familiarity.total} chord cells have a saved Willy Special voicing`}
                >
                  <span className="chart-meta-label">willy</span>{' '}
                  <span className="chart-meta-val">{familiarity.percent}%</span>
                  <span className="chart-meta-frac">{familiarity.known}/{familiarity.total}</span>
                </span>
              )}
              <span className="chart-meta-item chart-meta-bars">{standard.chartData.length} bars</span>
            </div>
            <ChordChart
              measures={standard.chartData}
              homeKey={standard.homeKey}
              viewingKey={viewingKey ?? standard.homeKey}
              form={standard.form}
              voicings={voicings}
              signedIn={signedIn}
              standardId={standard.id}
              onVoicingsChange={setVoicings}
            />
          </section>

          <SkillTrendChart skills={standard.skills} targetBpm={standard.targetBpm} />
        </div>

        <SkillLogPanel
          skills={standard.skills}
          targetBpm={standard.targetBpm}
          standardId={standard.id}
          viewingKey={viewingKey ?? standard.homeKey}
          signedIn={signedIn}
          onCommitted={() => fetchStandard(viewingKey ?? undefined)}
          onToast={setToast}
        />
      </div>

      <div className="page-footer">
        <span className="folio">— end of entry —</span>
      </div>

      {toast && (
        <div className="page-toast" role="status">
          <span className="page-toast-mark">✓</span>
          <span>{toast}</span>
        </div>
      )}
    </main>
  );
}
