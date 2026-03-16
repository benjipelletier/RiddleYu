// src/components/galaxy/InfoCard.tsx
'use client';

import { useRouter } from 'next/navigation';

interface InfoCardProps {
  simplified: string;
  pinyin: string;
  clusterLabel: string;
  core_scene: string | null;
}

export function InfoCard({ simplified, pinyin, clusterLabel, core_scene }: InfoCardProps) {
  const router = useRouter();

  return (
    <div style={s.card}>
      <span className="zh" style={s.char}>{simplified}</span>
      <span style={s.pinyin}>{pinyin}</span>
      <span style={s.cluster}>{clusterLabel}</span>
      {core_scene
        ? <p style={s.scene}>{core_scene}</p>
        : <p style={s.scene}>{clusterLabel}</p>
      }
      <button
        style={s.btn}
        onClick={() => router.push(`/cluster/${encodeURIComponent(simplified)}`)}
      >
        Explore this cluster →
      </button>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  card: {
    position: 'fixed',
    bottom: '28px',
    left: '28px',
    zIndex: 20,
    background: 'rgba(10,8,6,0.88)',
    border: '1px solid rgba(217,164,65,0.35)',
    borderRadius: '12px',
    padding: '18px 20px',
    minWidth: '200px',
    maxWidth: '280px',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  char: {
    fontSize: '40px',
    color: '#d9a441',
    lineHeight: 1,
    display: 'block',
  },
  pinyin: {
    fontSize: '13px',
    color: 'rgba(232,213,176,0.6)',
    fontFamily: "'JetBrains Mono', monospace",
    display: 'block',
    marginTop: '2px',
  },
  cluster: {
    fontSize: '11px',
    color: 'rgba(217,164,65,0.5)',
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    display: 'block',
    marginTop: '4px',
  },
  scene: {
    fontSize: '12px',
    color: 'rgba(232,213,176,0.55)',
    lineHeight: 1.5,
    fontStyle: 'italic',
    marginTop: '8px',
    marginBottom: '0',
  },
  btn: {
    marginTop: '14px',
    padding: '8px 14px',
    background: 'rgba(217,164,65,0.12)',
    border: '1px solid rgba(217,164,65,0.35)',
    borderRadius: '6px',
    color: '#d9a441',
    fontSize: '12px',
    fontFamily: "'JetBrains Mono', monospace",
    cursor: 'pointer',
    textAlign: 'left',
  },
};
