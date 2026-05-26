'use client';

import { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, ReferenceLine, Legend } from 'recharts';
import type { SkillSummary } from './SkillLogPanel';

// Stable color per LH technique. Picked from the same palette as the style
// pills so they read as a coherent set.
const LH_PART_COLOR: Record<string, string> = {
  '3-7s':            'oklch(0.55 0.18 28)',   // red
  'stock':           'oklch(0.55 0.18 165)',  // green
  'willy':           'oklch(0.55 0.20 290)',  // purple
  'sustained-bass':  'oklch(0.55 0.18 245)',  // blue
  'half-bass':       'oklch(0.55 0.18 210)',  // sky
  'quarter-bass':    'oklch(0.55 0.18 60)',   // amber
};
const LH_PART_LABEL: Record<string, string> = {
  '3-7s': '3-7s',
  'stock': 'Stock',
  'willy': 'Willy',
  'sustained-bass': 'Sustained bass',
  'half-bass': 'Half-bass',
  'quarter-bass': 'Quarter-bass',
};
const RH_PART_LABEL: Record<string, string> = {
  '3-7s': '3-7s',
  'stock': 'stock',
  'melody': 'melody',
  'solo': 'solo',
};

// Dash patterns help disambiguate skills that share an LH color.
const RH_PART_DASH: Record<string, string | undefined> = {
  '3-7s':   undefined,
  'stock':  '4 4',
  'melody': undefined,
  'solo':   '2 4',
};

export function SkillTrendChart({
  skills,
  targetBpm,
}: {
  skills: SkillSummary[];
  targetBpm: number;
}) {
  // Convert each skill's history into a series. X = session index (the most
  // recent session is at the right). Y = BPM. We align series by index, not
  // by date — a skill with 3 reps shows 3 points on the right side of the
  // chart, regardless of when they happened. This makes shapes comparable.
  const { series, withData, maxLen, yMin, yMax } = useMemo(() => {
    const tracked = skills.filter(s => s.tracksBpm && s.history.length > 0 && s.history.some(h => h.bpm != null));
    let maxLen = 0;
    let yMax = targetBpm;
    let yMin = targetBpm;
    const series = tracked.map(sk => {
      const points = sk.history
        .filter(h => h.bpm != null)
        .map((h, i) => ({ i, bpm: h.bpm as number, practicedAt: h.practicedAt }));
      maxLen = Math.max(maxLen, points.length);
      for (const p of points) {
        if (p.bpm > yMax) yMax = p.bpm;
        if (p.bpm < yMin) yMin = p.bpm;
      }
      return { sk, points };
    });
    return { series, withData: tracked, maxLen, yMin: Math.max(20, yMin - 10), yMax: yMax + 10 };
  }, [skills, targetBpm]);

  if (withData.length === 0) {
    return (
      <div className="trend-empty">
        <p>No BPM history yet — log some shed sessions and the trend lines will appear here.</p>
      </div>
    );
  }

  // Build a unified data shape: array of indices 0..maxLen-1, each with a
  // field per skill series. recharts plots each named field as a separate line.
  const chartData = Array.from({ length: maxLen }).map((_, i) => {
    const row: Record<string, number | string> = { i };
    for (const { sk, points } of series) {
      const p = points[i];
      if (p) row[sk.skillId] = p.bpm;
    }
    return row;
  });

  return (
    <div className="trend-card">
      <div className="trend-head">
        <h3 className="trend-title">BPM trend by skill</h3>
        <span className="trend-sub">target: {targetBpm} bpm · one line per practiced skill in this key</span>
      </div>
      <div className="trend-chart">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData} margin={{ top: 8, right: 12, bottom: 8, left: 8 }}>
            <XAxis dataKey="i" hide />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'oklch(0.48 0.018 50)' }}
              width={36}
              tickLine={false}
              axisLine={false}
            />
            <ReferenceLine
              y={targetBpm}
              stroke="oklch(0.48 0.018 50)"
              strokeDasharray="3 4"
              label={{ value: `target ${targetBpm}`, position: 'right', fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'oklch(0.48 0.018 50)' }}
            />
            <Tooltip
              contentStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono', padding: '6px 8px', background: 'var(--paper)', border: '1px solid var(--rule)' }}
              formatter={(value: number, name: string) => {
                const sk = withData.find(s => s.skillId === name);
                const label = sk ? `${LH_PART_LABEL[sk.lhPart ?? ''] ?? ''} / RH ${RH_PART_LABEL[sk.rhPart ?? ''] ?? ''}` : name;
                return [`${value} bpm`, label];
              }}
              labelFormatter={() => ''}
            />
            {series.map(({ sk }) => (
              <Line
                key={sk.skillId}
                type="monotone"
                dataKey={sk.skillId}
                stroke={LH_PART_COLOR[sk.lhPart ?? ''] ?? 'oklch(0.5 0.05 60)'}
                strokeWidth={1.5}
                strokeDasharray={RH_PART_DASH[sk.rhPart ?? '']}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="trend-legend">
        {withData.map(sk => (
          <span key={sk.skillId} className="trend-legend-item">
            <span
              className="trend-legend-swatch"
              style={{
                background: LH_PART_COLOR[sk.lhPart ?? ''] ?? 'var(--ink-3)',
                ...(RH_PART_DASH[sk.rhPart ?? ''] ? { backgroundImage: `repeating-linear-gradient(90deg, currentColor 0 4px, transparent 4px 8px)` } : {}),
              }}
            />
            {LH_PART_LABEL[sk.lhPart ?? '']} <span className="trend-legend-rh">· RH {RH_PART_LABEL[sk.rhPart ?? '']}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
