'use client';

import { useEffect, useState } from 'react';

const GOLD = '#D4A853';
const GOLD_BRIGHT = '#F0C75E';
const SURFACE = '#131316';
const SURFACE_2 = '#1a1a1f';
const TEXT = '#E8E4DC';
const TEXT_MID = '#a89e90';
const TEXT_DIM = '#5c574e';
const BLUE = '#5B8FB9';
const GREEN = '#6B9E78';
const RED = '#C9544A';
const PURPLE = '#9B7EC8';

interface NodeDetailData {
  node: {
    surface_form: string;
    pinyin: string;
    primary_gloss: string;
    unit_type: string;
    recognition: number;
    production: number;
    register_awareness: number;
    collocational_prec: number;
    recognition_uncertainty: number;
    production_uncertainty: number;
    register_uncertainty: number;
    collocational_uncertainty: number;
    learning_state: string;
    peak_recognition: number;
    peak_production: number;
    context_breadth: number;
    encounter_count: number;
  };
  encounters: { signal_type: string; signal_strength: number; source_type: string; created_at: string }[];
  edges: { edge_type: string; connected_surface: string | null; connected_pinyin: string | null }[];
  fields: { name: string; name_zh: string }[];
  frontier: { type: string; rationale: string; acquisitionProbability: number } | null;
}

function ConfBar({ label, value, uncertainty, color }: { label: string; value: number; uncertainty: number; color: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}>
        <span style={{ color: TEXT_DIM }}>{label}</span>
        <span style={{ color, fontFamily: 'monospace' }}>{(value * 100).toFixed(0)}% <span style={{ color: TEXT_DIM }}>±{(uncertainty * 100).toFixed(0)}</span></span>
      </div>
      <div style={{ height: 6, background: `${TEXT}08`, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: `${value * 100}%`, height: '100%', background: color, borderRadius: 3, opacity: 0.8 }} />
        {/* Uncertainty range */}
        <div style={{
          position: 'absolute', top: 0, left: `${Math.max(0, (value - uncertainty * 0.5)) * 100}%`,
          width: `${uncertainty * 50}%`, height: '100%',
          background: color, opacity: 0.15, borderRadius: 3,
        }} />
      </div>
    </div>
  );
}

export default function NodeDetail({
  surfaceForm,
  onClose,
}: {
  surfaceForm: string;
  onClose: () => void;
}) {
  const [data, setData] = useState<NodeDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/engine/node/${encodeURIComponent(surfaceForm)}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [surfaceForm]);

  if (loading) {
    return (
      <div style={{ background: SURFACE_2, borderRadius: 12, padding: 20, border: `1px solid ${GOLD}20` }}>
        <div style={{ color: TEXT_DIM, fontSize: 12 }}>Loading...</div>
      </div>
    );
  }

  if (!data?.node) {
    return (
      <div style={{ background: SURFACE_2, borderRadius: 12, padding: 20, border: `1px solid ${RED}20` }}>
        <div style={{ color: RED, fontSize: 12 }}>Node not found: {surfaceForm}</div>
        <button onClick={onClose} style={{ marginTop: 8, background: 'none', border: 'none', color: TEXT_DIM, cursor: 'pointer', fontSize: 11 }}>Close</button>
      </div>
    );
  }

  const n = data.node;
  const STATE_COLORS: Record<string, string> = { new: TEXT_DIM, acquired: GREEN, decaying: '#D4853A', forgotten: RED };

  return (
    <div style={{ background: SURFACE_2, borderRadius: 12, padding: 20, border: `1px solid ${GOLD}20` }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: GOLD, fontFamily: "'Noto Serif SC', serif" }}>{n.surface_form}</div>
          <div style={{ fontSize: 14, color: TEXT_MID, marginTop: 2 }}>{n.pinyin}</div>
          <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>{n.primary_gloss}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={{
            fontSize: 10, padding: '2px 8px', borderRadius: 4,
            background: `${STATE_COLORS[n.learning_state] ?? TEXT_DIM}18`,
            color: STATE_COLORS[n.learning_state] ?? TEXT_DIM,
            fontWeight: 600,
          }}>
            {n.learning_state}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: TEXT_DIM, cursor: 'pointer', fontSize: 16 }}>×</button>
        </div>
      </div>

      {/* Confidence vector */}
      <ConfBar label="Recognition" value={n.recognition} uncertainty={n.recognition_uncertainty} color={GOLD} />
      <ConfBar label="Production" value={n.production} uncertainty={n.production_uncertainty} color={BLUE} />
      <ConfBar label="Register Awareness" value={n.register_awareness} uncertainty={n.register_uncertainty} color={PURPLE} />
      <ConfBar label="Collocational Precision" value={n.collocational_prec} uncertainty={n.collocational_uncertainty} color={GREEN} />

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginTop: 12, marginBottom: 12, fontSize: 10, color: TEXT_DIM }}>
        <span>Encounters: <span style={{ color: TEXT, fontFamily: 'monospace' }}>{n.encounter_count}</span></span>
        <span>Context breadth: <span style={{ color: TEXT, fontFamily: 'monospace' }}>{n.context_breadth}</span></span>
      </div>

      {/* Fields */}
      {data.fields.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 4 }}>Fields</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {data.fields.map(f => (
              <span key={f.name} style={{
                fontSize: 10, padding: '2px 8px', borderRadius: 4,
                background: `${GOLD}10`, color: GOLD, fontFamily: "'Noto Serif SC', serif",
              }}>
                {f.name_zh}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Frontier status */}
      {data.frontier && (
        <div style={{
          background: `${GOLD}08`, border: `1px solid ${GOLD}20`,
          borderRadius: 8, padding: '10px 12px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 10, color: GOLD, fontWeight: 600, marginBottom: 4 }}>
            On frontier: {data.frontier.type}
          </div>
          <div style={{ fontSize: 11, color: TEXT_MID, lineHeight: 1.5 }}>{data.frontier.rationale}</div>
        </div>
      )}

      {/* Connected nodes */}
      {data.edges.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 4 }}>Connections ({data.edges.length})</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {data.edges.filter(e => e.connected_surface).slice(0, 20).map((e, i) => (
              <span key={i} style={{
                fontSize: 10, padding: '2px 6px', borderRadius: 3,
                background: SURFACE, color: TEXT_MID,
              }}>
                <span style={{ fontFamily: "'Noto Serif SC', serif" }}>{e.connected_surface}</span>
                <span style={{ color: TEXT_DIM, marginLeft: 4 }}>{e.edge_type}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
