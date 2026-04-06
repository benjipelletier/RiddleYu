'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GOLD = '#D4A853';
const BLUE = '#5B8FB9';
const TEXT_DIM = '#5c574e';
const SURFACE = '#131316';

interface UncertaintyNode {
  recognition: number;
  recognition_uncertainty: number;
}

export default function ConfidenceChart({ nodes }: { nodes: UncertaintyNode[] }) {
  // Build histogram bins
  const bins = Array.from({ length: 10 }, (_, i) => ({
    range: `${i * 10}-${(i + 1) * 10}%`,
    recognition: 0,
    production: 0,
  }));

  // We need the full node data to get production — use uncertainty nodes for recognition
  for (const n of nodes) {
    const recBin = Math.min(9, Math.floor(n.recognition * 10));
    bins[recBin].recognition++;
  }

  return (
    <div style={{ background: SURFACE, borderRadius: 10, padding: '14px 16px', border: `1px solid ${GOLD}10` }}>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 12, fontWeight: 600 }}>
        CONFIDENCE DISTRIBUTION
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={bins} barCategoryGap="15%">
          <XAxis dataKey="range" tick={{ fill: TEXT_DIM, fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: TEXT_DIM, fontSize: 9 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#1a1a1f', border: `1px solid ${GOLD}30`, borderRadius: 8, fontSize: 11 }}
            labelStyle={{ color: TEXT_DIM }}
          />
          <Bar dataKey="recognition" fill={GOLD} opacity={0.7} radius={[3, 3, 0, 0]} name="Recognition" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
