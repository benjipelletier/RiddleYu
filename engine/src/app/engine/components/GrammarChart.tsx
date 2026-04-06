'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const GOLD = '#D4A853';
const BLUE = '#5B8FB9';
const RED = '#C9544A';
const TEXT_DIM = '#5c574e';
const TEXT = '#E8E4DC';
const SURFACE = '#131316';

interface GrammarItem {
  pattern_name: string;
  comprehension: number;
  production: number;
  avoidance: boolean;
}

export default function GrammarChart({ constructions }: { constructions: GrammarItem[] }) {
  const data = constructions.map(g => ({
    name: g.pattern_name,
    comprehension: Math.round(g.comprehension * 100),
    production: Math.round(g.production * 100),
    avoidance: g.avoidance,
  }));

  return (
    <div style={{ background: SURFACE, borderRadius: 10, padding: '14px 16px', border: `1px solid ${GOLD}10` }}>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 12, fontWeight: 600 }}>
        GRAMMAR CONSTRUCTIONS
      </div>
      <ResponsiveContainer width="100%" height={Math.max(200, data.length * 32)}>
        <BarChart data={data} layout="vertical" barCategoryGap="20%">
          <XAxis type="number" domain={[0, 100]} tick={{ fill: TEXT_DIM, fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis
            type="category" dataKey="name" width={110}
            tick={{ fill: TEXT, fontSize: 10, fontFamily: "'Noto Serif SC', serif" }}
            axisLine={false} tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: '#1a1a1f', border: `1px solid ${GOLD}30`, borderRadius: 8, fontSize: 11 }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Bar dataKey="comprehension" fill={GOLD} opacity={0.7} radius={[0, 3, 3, 0]} name="Comprehension" />
          <Bar dataKey="production" radius={[0, 3, 3, 0]} name="Production">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.avoidance ? RED : BLUE} opacity={0.7} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 10, color: TEXT_DIM }}>
        <span><span style={{ color: GOLD }}>■</span> Comprehension</span>
        <span><span style={{ color: BLUE }}>■</span> Production</span>
        <span><span style={{ color: RED }}>■</span> Avoidance detected</span>
      </div>
    </div>
  );
}
