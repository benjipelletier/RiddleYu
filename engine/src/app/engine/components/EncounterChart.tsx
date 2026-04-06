'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GOLD = '#D4A853';
const BLUE = '#5B8FB9';
const PURPLE = '#9B7EC8';
const GREEN = '#6B9E78';
const ORANGE = '#D4853A';
const TEXT_DIM = '#5c574e';
const SURFACE = '#131316';

interface DayData {
  date: string;
  total: number;
  bySource: Record<string, number>;
  newNodes: number;
}

const SOURCE_COLORS: Record<string, string> = {
  annotation: GOLD,
  calibration: BLUE,
  assessment: PURPLE,
  production: GREEN,
};

export default function EncounterChart({ days }: { days: DayData[] }) {
  const data = days.map(d => ({
    date: d.date.slice(5), // MM-DD
    annotation: d.bySource.annotation ?? 0,
    calibration: d.bySource.calibration ?? 0,
    assessment: d.bySource.assessment ?? 0,
    production: d.bySource.production ?? 0,
    total: d.total,
  }));

  return (
    <div style={{ background: SURFACE, borderRadius: 10, padding: '14px 16px', border: `1px solid ${GOLD}10` }}>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 12, fontWeight: 600 }}>
        ENCOUNTER HISTORY (30 days)
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}>
          <XAxis dataKey="date" tick={{ fill: TEXT_DIM, fontSize: 8 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fill: TEXT_DIM, fontSize: 9 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#1a1a1f', border: `1px solid ${GOLD}30`, borderRadius: 8, fontSize: 11 }}
          />
          <Area type="monotone" dataKey="annotation" stackId="1" fill={GOLD} stroke={GOLD} fillOpacity={0.3} />
          <Area type="monotone" dataKey="calibration" stackId="1" fill={BLUE} stroke={BLUE} fillOpacity={0.3} />
          <Area type="monotone" dataKey="assessment" stackId="1" fill={PURPLE} stroke={PURPLE} fillOpacity={0.3} />
          <Area type="monotone" dataKey="production" stackId="1" fill={GREEN} stroke={GREEN} fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 10, color: TEXT_DIM, flexWrap: 'wrap' }}>
        {Object.entries(SOURCE_COLORS).map(([key, color]) => (
          <span key={key}><span style={{ color }}>■</span> {key}</span>
        ))}
      </div>
    </div>
  );
}
