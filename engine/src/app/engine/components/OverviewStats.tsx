'use client';

const GOLD = '#D4A853';
const SURFACE = '#131316';
const TEXT = '#E8E4DC';
const TEXT_DIM = '#5c574e';
const BLUE = '#5B8FB9';
const GREEN = '#6B9E78';
const RED = '#C9544A';
const ORANGE = '#D4853A';

interface OverviewData {
  totalNodes: number;
  totalCharacters: number;
  totalEdges: number;
  avgRecognition: number;
  avgProduction: number;
  learningStateDistribution: { new: number; acquired: number; decaying: number; forgotten: number };
  newNodesThisMonth: number;
  encounterRatePerWeek: number;
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: SURFACE, borderRadius: 10, padding: '12px 16px', border: `1px solid ${color}15` }}>
      <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: 'monospace' }}>{value}</div>
    </div>
  );
}

export default function OverviewStats({ data }: { data: OverviewData }) {
  const d = data.learningStateDistribution;
  const total = d.new + d.acquired + d.decaying + d.forgotten;

  const stateColors = { new: TEXT_DIM, acquired: GREEN, decaying: ORANGE, forgotten: RED };
  const stateLabels = { new: 'New', acquired: 'Acquired', decaying: 'Decaying', forgotten: 'Forgotten' };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
        <StatCard label="Total Words" value={data.totalNodes.toLocaleString()} color={GOLD} />
        <StatCard label="Avg Recognition" value={`${(data.avgRecognition * 100).toFixed(0)}%`} color={GOLD} />
        <StatCard label="Avg Production" value={`${(data.avgProduction * 100).toFixed(0)}%`} color={BLUE} />
        <StatCard label="New This Month" value={String(data.newNodesThisMonth)} color={GREEN} />
      </div>

      {/* Learning state bar */}
      <div style={{ background: SURFACE, borderRadius: 10, padding: '12px 16px', border: `1px solid ${GOLD}10` }}>
        <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 8 }}>Learning State Distribution</div>
        <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
          {(Object.entries(d) as [keyof typeof d, number][]).map(([state, count]) => (
            <div
              key={state}
              style={{
                width: total > 0 ? `${(count / total) * 100}%` : '25%',
                background: stateColors[state],
                opacity: 0.8,
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {(Object.entries(d) as [keyof typeof d, number][]).map(([state, count]) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: stateColors[state] }} />
              <span style={{ fontSize: 10, color: TEXT_DIM }}>{stateLabels[state]}</span>
              <span style={{ fontSize: 10, color: TEXT, fontFamily: 'monospace' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
