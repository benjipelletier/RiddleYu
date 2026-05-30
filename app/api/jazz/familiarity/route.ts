import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../db';
import { transposeMeasures } from '@jazz/lib/transpose';
import { baseChordSymbol } from '@jazz/lib/chord-symbol';

interface StandardRow {
  id: string;
  title: string;
  composer: string | null;
  style: string | null;
  home_key: number;
  is_minor: boolean;
  chart_data: string[][];
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const keyParam = params.get('key');
  // mode: 'any' picks the best key per standard; 'home' uses home key;
  // a number 0-11 transposes every standard to that key.
  let mode: 'any' | 'home' | number;
  if (keyParam === 'any' || keyParam == null) mode = 'any';
  else if (keyParam === 'home') mode = 'home';
  else {
    const n = parseInt(keyParam);
    if (!Number.isFinite(n) || n < 0 || n > 11) {
      return NextResponse.json({ error: 'key must be "any", "home", or 0–11' }, { status: 400 });
    }
    mode = n;
  }
  const type = params.get('type') ?? 'willy';
  const limit = Math.min(Math.max(parseInt(params.get('limit') ?? '20'), 1), 100);
  const minPercent = Math.min(Math.max(parseInt(params.get('minPercent') ?? '0'), 0), 100);

  const sql = getDb();

  // All distinct base_symbols of saved voicings = the set of "known" chord
  // families. Small set, fits comfortably in memory.
  const knownRows = await sql`
    SELECT DISTINCT base_symbol FROM chord_voicings WHERE voicing_type = ${type}
  `;
  const known = new Set<string>((knownRows as { base_symbol: string }[]).map(r => r.base_symbol));

  if (known.size === 0) {
    return NextResponse.json({ mode: keyParam ?? 'any', type, items: [] });
  }

  const standards = await sql`
    SELECT id, title, composer, style, home_key, is_minor, chart_data
    FROM standards
  `;

  function score(chart: string[][], viewKey: number, homeKey: number) {
    const shift = ((viewKey - homeKey) % 12 + 12) % 12;
    const bars = transposeMeasures(chart, shift);
    let total = 0;
    let kn = 0;
    for (const bar of bars) {
      for (const c of bar) {
        if (!c) continue;
        total++;
        if (known.has(baseChordSymbol(c))) kn++;
      }
    }
    return { total, kn };
  }

  const items: {
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
  }[] = [];

  for (const s of standards as StandardRow[]) {
    let best: { viewKey: number; kn: number; total: number; pct: number } | null = null;
    if (mode === 'any') {
      for (let k = 0; k < 12; k++) {
        const { total, kn } = score(s.chart_data, k, s.home_key);
        if (total === 0) continue;
        const pct = kn / total;
        if (best == null || pct > best.pct || (pct === best.pct && k === s.home_key)) {
          best = { viewKey: k, kn, total, pct };
        }
      }
    } else {
      const viewKey = mode === 'home' ? s.home_key : mode;
      const { total, kn } = score(s.chart_data, viewKey, s.home_key);
      if (total > 0) best = { viewKey, kn, total, pct: kn / total };
    }
    if (!best) continue;
    const percent = Math.round(best.pct * 100);
    if (percent < minPercent) continue;
    items.push({
      standardId: s.id,
      title: s.title,
      composer: s.composer,
      style: s.style,
      homeKey: s.home_key,
      isMinor: s.is_minor,
      viewKey: best.viewKey,
      knownCells: best.kn,
      totalCells: best.total,
      percent,
    });
  }

  items.sort((a, b) => (b.percent - a.percent) || (b.knownCells - a.knownCells) || a.title.localeCompare(b.title));
  return NextResponse.json({ mode: keyParam ?? 'any', type, items: items.slice(0, limit) });
}
