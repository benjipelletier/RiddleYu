'use client';

const TEXT = '#E8E4DC';
const TEXT_MID = '#a89e90';
const TEXT_DIM = '#5c574e';
const SURFACE = '#131316';
const PURPLE = '#9B7EC8';
const RED = '#C9544A';
const ORANGE = '#D4853A';
const BLUE = '#5B8FB9';

interface PlateauSignal {
  type: string;
  severity: number;
  title: string;
  description: string;
  prescription: string;
}

const TYPE_CONFIG: Record<string, { icon: string; color: string }> = {
  depth_stall: { icon: '◆', color: ORANGE },
  field_gap: { icon: '◇', color: RED },
  avoidance_pattern: { icon: '△', color: PURPLE },
  breadth_stall: { icon: '○', color: BLUE },
};

export default function PlateauPanel({ signals }: { signals: PlateauSignal[] }) {
  if (signals.length === 0) return null;

  return (
    <div>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 8, fontWeight: 600 }}>
        PLATEAU SIGNALS
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {signals.map((p, i) => {
          const config = TYPE_CONFIG[p.type] ?? { icon: '●', color: ORANGE };
          return (
            <div key={i} style={{
              background: SURFACE, borderRadius: 10, padding: '14px 16px',
              border: `1px solid ${config.color}20`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ color: config.color, fontSize: 13 }}>{config.icon}</span>
                <span style={{ fontSize: 12, color: TEXT, fontWeight: 600, flex: 1 }}>{p.title}</span>
                <span style={{ fontSize: 10, color: config.color, fontFamily: 'monospace' }}>
                  {(p.severity * 100).toFixed(0)}%
                </span>
              </div>
              <div style={{
                width: '100%', height: 3, background: `${TEXT}08`,
                borderRadius: 2, overflow: 'hidden', marginBottom: 8,
              }}>
                <div style={{
                  width: `${p.severity * 100}%`, height: '100%',
                  background: config.color, borderRadius: 2,
                }} />
              </div>
              <div style={{ fontSize: 11, color: TEXT_DIM, lineHeight: 1.55, marginBottom: 8 }}>{p.description}</div>
              <div style={{ fontSize: 11, color: TEXT_MID, fontStyle: 'italic', lineHeight: 1.5 }}>{p.prescription}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
