import type React from 'react';

export const colors = {
  bg: '#08090C',
  surface: '#111318',
  text: '#E0DDD6',
  textMuted: 'rgba(224, 221, 214, 0.5)',
  textFaint: 'rgba(224, 221, 214, 0.35)',
  textDimmed: 'rgba(224, 221, 214, 0.25)',
  border: 'rgba(255, 255, 255, 0.06)',
  borderSubtle: 'rgba(255, 255, 255, 0.04)',
  vocab: '#E8A84C',
  vocabBg: 'rgba(232, 168, 76, 0.06)',
  vocabBorder: 'rgba(232, 168, 76, 0.18)',
  insight: '#5BAADB',
  insightBg: 'rgba(91, 170, 219, 0.04)',
  insightBorder: 'rgba(91, 170, 219, 0.18)',
  grammar: '#D96B5A',
  grammarBg: 'rgba(217, 107, 90, 0.04)',
  grammarBorder: 'rgba(217, 107, 90, 0.18)',
  crossRef: '#6BB478',
  crossRefBg: 'rgba(107, 180, 120, 0.06)',
  crossRefBorder: 'rgba(107, 180, 120, 0.15)',
  culture: '#B88CD8',
  cultureBg: 'rgba(184, 140, 216, 0.06)',
  cultureBorder: 'rgba(184, 140, 216, 0.15)',
  activeBorder: '#E8A84C',
  activeBg: 'rgba(232, 168, 76, 0.04)',
} as const;

export const fonts = {
  chinese: "'Noto Serif SC', serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Inter', system-ui, sans-serif",
} as const;

export const labelStyle: React.CSSProperties = {
  fontSize: 10,
  textTransform: 'uppercase',
  letterSpacing: 1,
  opacity: 0.4,
};
