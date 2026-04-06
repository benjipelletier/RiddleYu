'use client';

import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts';

const GOLD = '#D4A853';
const BLUE = '#5B8FB9';
const GREEN = '#6B9E78';
const RED = '#C9544A';
const ORANGE = '#D4853A';
const TEXT_DIM = '#5c574e';
const TEXT_MID = '#a89e90';
const SURFACE = '#131316';

interface UncertaintyNode {
  id: string;
  surface_form: string;
  pinyin: string;
  recognition: number;
  recognition_uncertainty: number;
  learning_state: string;
}

const STATE_COLORS: Record<string, string> = {
  new: TEXT_DIM,
  acquired: GREEN,
  decaying: ORANGE,
  forgotten: RED,
};

export default function UncertaintyMap({
  nodes,
  onNodeClick,
}: {
  nodes: UncertaintyNode[];
  onNodeClick?: (surfaceForm: string) => void;
}) {
  // Sample nodes if too many (for performance)
  const sampled = nodes.length > 500
    ? nodes.filter((_, i) => i % Math.ceil(nodes.length / 500) === 0)
    : nodes;

  const data = sampled.map(n => ({
    x: n.recognition,
    y: n.recognition_uncertainty,
    surface_form: n.surface_form,
    pinyin: n.pinyin,
    state: n.learning_state,
  }));

  return (
    <div style={{ background: SURFACE, borderRadius: 10, padding: '14px 16px', border: `1px solid ${GOLD}10` }}>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 4, fontWeight: 600 }}>
        UNCERTAINTY MAP
      </div>
      <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 12 }}>
        Recognition (x) × Uncertainty (y) — hover for details
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
          <XAxis
            type="number" dataKey="x" domain={[0, 1]} name="Recognition"
            tick={{ fill: TEXT_DIM, fontSize: 9 }} axisLine={false} tickLine={false}
          />
          <YAxis
            type="number" dataKey="y" domain={[0, 1]} name="Uncertainty"
            tick={{ fill: TEXT_DIM, fontSize: 9 }} axisLine={false} tickLine={false}
          />
          <ReferenceLine x={0.5} stroke={TEXT_DIM} strokeDasharray="3 3" strokeOpacity={0.3}>
            <Label value="Known threshold" position="top" fill={TEXT_DIM} fontSize={9} />
          </ReferenceLine>
          <ReferenceLine y={0.5} stroke={TEXT_DIM} strokeDasharray="3 3" strokeOpacity={0.3} />
          <Tooltip
            contentStyle={{ background: '#1a1a1f', border: `1px solid ${GOLD}30`, borderRadius: 8, fontSize: 11 }}
            formatter={(value: number) => value.toFixed(2)}
            labelFormatter={() => ''}
            content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div style={{ background: '#1a1a1f', border: `1px solid ${GOLD}30`, borderRadius: 8, padding: '8px 12px' }}>
                  <div style={{ fontSize: 14, fontFamily: "'Noto Serif SC', serif", color: GOLD }}>{d.surface_form}</div>
                  <div style={{ fontSize: 11, color: TEXT_MID }}>{d.pinyin}</div>
                  <div style={{ fontSize: 10, color: TEXT_DIM, marginTop: 4 }}>
                    Recognition: {(d.x * 100).toFixed(0)}% · Uncertainty: {(d.y * 100).toFixed(0)}%
                  </div>
                </div>
              );
            }}
          />
          <Scatter data={data} onClick={(d: any) => onNodeClick?.(d.surface_form)}>
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={STATE_COLORS[entry.state] ?? TEXT_DIM}
                fillOpacity={0.6}
                r={3}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      {/* Quadrant labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: TEXT_DIM, marginTop: 4, padding: '0 20px' }}>
        <span>← Unknown</span>
        <span>Probe targets ↗</span>
        <span>Solid knowledge →</span>
      </div>
    </div>
  );
}
