'use client';

import { colors, fonts } from '../styles/theme';
import type { YuKuai, LLMYuKuaiItem, LLMConnection, LLMGotcha, Familiarity } from '../lib/yukuai-types';
import { useState } from 'react';

const typeColors = {
  vocab: { accent: colors.vocab, bg: colors.vocabBg, border: colors.vocabBorder },
  grammar: { accent: colors.grammar, bg: colors.grammarBg, border: colors.grammarBorder },
  expression: { accent: colors.culture, bg: colors.cultureBg, border: colors.cultureBorder },
};

interface YuKuaiCardProps {
  item: LLMYuKuaiItem;
  entity: YuKuai;
  familiarity: Familiarity | null;
  connections: LLMConnection[];
  gotchas: LLMGotcha[];
  lines: string[];
  onLineJump?: (lineIndex: number) => void;
}

export default function YuKuaiCard({ item, entity, familiarity, connections, gotchas, lines, onLineJump }: YuKuaiCardProps) {
  const tc = typeColors[item.type];
  const [expanded, setExpanded] = useState(false);
  const hasDetails = connections.length > 0 || gotchas.length > 0 || entity.base_definition;

  return (
    <div
      onClick={() => hasDetails && setExpanded(!expanded)}
      style={{
        background: tc.bg,
        borderLeft: `3px solid ${tc.accent}`,
        borderRadius: 4,
        padding: '8px 12px',
        cursor: hasDetails ? 'pointer' : 'default',
        minWidth: 120,
        maxWidth: 320,
        transition: 'background 0.15s',
      }}
    >
      {/* Header: character + pinyin + HSK */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 18, fontFamily: fonts.chinese, color: tc.accent, lineHeight: 1.2 }}>
          {item.surface_form}
        </span>
        {entity.pinyin && (
          <span style={{ fontSize: 10, color: colors.textMuted, fontFamily: fonts.mono }}>
            {entity.pinyin}
          </span>
        )}
        {item.type !== 'vocab' && (
          <span style={{ fontSize: 10, color: colors.textMuted, fontFamily: fonts.mono }}>
            {entity.canonical_form}
          </span>
        )}
        {entity.hsk_level && (
          <span style={{
            fontSize: 8,
            color: colors.textDimmed,
            border: `1px solid ${colors.border}`,
            borderRadius: 3,
            padding: '0px 3px',
            marginLeft: 'auto',
            flexShrink: 0,
          }}>
            HSK{entity.hsk_level}
          </span>
        )}
      </div>

      {/* Meaning — always visible, one line */}
      <div style={{
        fontSize: 12,
        color: colors.text,
        lineHeight: 1.4,
        opacity: 0.8,
        marginTop: 2,
      }}>
        {item.contextual_meaning}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ marginTop: 6, borderTop: `1px solid ${colors.border}`, paddingTop: 6 }}>
          {entity.base_definition && (
            <div style={{ fontSize: 10, color: colors.textDimmed, marginBottom: 4 }}>
              {entity.base_definition}
            </div>
          )}
          {connections.map((conn, i) => (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); onLineJump?.(conn.to_line); }}
              style={{
                fontSize: 10,
                color: colors.crossRef,
                lineHeight: 1.3,
                marginBottom: 3,
                cursor: 'pointer',
              }}
            >
              → L{conn.to_line + 1}: {lines[conn.to_line]?.slice(0, 20) ?? ''}…
              <span style={{ color: colors.textDimmed, display: 'block' }}>{conn.note}</span>
            </div>
          ))}
          {gotchas.map((g, i) => (
            <div key={i} style={{ fontSize: 10, color: colors.grammar, lineHeight: 1.3, opacity: 0.9 }}>
              ⚠ {g.note}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
