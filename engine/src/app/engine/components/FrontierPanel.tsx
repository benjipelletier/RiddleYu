'use client';

import { useState } from 'react';

const GOLD = '#D4A853';
const SURFACE = '#131316';
const SURFACE_2 = '#1a1a1f';
const BG = '#0A0A0B';
const TEXT = '#E8E4DC';
const TEXT_MID = '#a89e90';
const TEXT_DIM = '#5c574e';
const BLUE = '#5B8FB9';
const PURPLE = '#9B7EC8';
const GREEN = '#6B9E78';

interface FrontierItem {
  id: string;
  surface_form: string;
  pinyin: string | null;
  primary_gloss: string | null;
  frontierType: string;
  acquisitionProbability: number;
  priorityScore: number;
  rationale: string;
}

const TYPE_COLORS: Record<string, string> = { near: GOLD, depth: BLUE, structural: PURPLE, bridge: GREEN };
const TYPE_LABELS: Record<string, string> = { near: 'Ready to learn', depth: 'Deepen', structural: 'Activate', bridge: 'Bridge' };

export default function FrontierPanel({ items }: { items: FrontierItem[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 8, fontWeight: 600 }}>
        FRONTIER — What to learn next
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.slice(0, 15).map((item, idx) => {
          const color = TYPE_COLORS[item.frontierType] ?? GOLD;
          const isExpanded = expanded === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setExpanded(isExpanded ? null : item.id)}
              style={{
                background: isExpanded ? SURFACE_2 : SURFACE,
                borderRadius: 10,
                padding: isExpanded ? '14px 16px' : '10px 14px',
                border: `1px solid ${color}${isExpanded ? '44' : '15'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: `${color}10`, border: `1px solid ${color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: item.surface_form.length > 3 ? 12 : 16,
                    fontWeight: 600, color,
                    fontFamily: "'Noto Serif SC', serif",
                  }}>
                    {item.surface_form}
                  </div>
                  <div style={{
                    position: 'absolute', top: -3, right: -3,
                    width: 14, height: 14, borderRadius: 7,
                    background: color, color: BG,
                    fontSize: 8, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {idx + 1}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>{item.pinyin ?? ''}</span>
                    <span style={{ fontSize: 11, color: TEXT_DIM }}>{item.primary_gloss ?? ''}</span>
                  </div>
                  <div style={{ fontSize: 10, color, marginTop: 2, fontWeight: 500 }}>
                    {TYPE_LABELS[item.frontierType] ?? item.frontierType}
                  </div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color, fontFamily: 'monospace', flexShrink: 0 }}>
                  {(item.acquisitionProbability * 100).toFixed(0)}%
                </div>
              </div>
              {isExpanded && (
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${TEXT}0a` }}>
                  <div style={{ fontSize: 12, color: TEXT_MID, lineHeight: 1.65 }}>{item.rationale}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
