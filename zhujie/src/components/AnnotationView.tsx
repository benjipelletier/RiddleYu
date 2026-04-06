'use client';

import { colors, fonts } from '../styles/theme';
import type { YuKuai, LineDecomposition, LLMYuKuaiItem, YuKuaiType, Familiarity, UserYuKuai } from '../lib/yukuai-types';
import RevealTranslation from './RevealTranslation';
import YuKuaiSection from './YuKuaiSection';

interface AnnotationViewProps {
  lineIndex: number | null;
  decomposition: LineDecomposition | null;
  yukuai: YuKuai[];
  userState: UserYuKuai[] | null;
  loading: boolean;
  lines: string[];
  isMobile: boolean;
  onLineJump: (lineIndex: number) => void;
  onBack?: () => void;
}


export default function AnnotationView({
  lineIndex,
  decomposition,
  yukuai,
  userState,
  loading,
  lines,
  isMobile,
  onLineJump,
  onBack,
}: AnnotationViewProps) {
  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textDimmed }}>
        Decomposing...
      </div>
    );
  }

  if (!decomposition) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textDimmed, padding: 32, textAlign: 'center' }}>
        Click a line to see its YuKuai
      </div>
    );
  }

  // Build lookup maps
  const entityMap = new Map(yukuai.map((yk) => [yk.id, yk]));
  const familiarityMap = new Map(
    (userState ?? []).map((s) => [s.yukuai_id, s.familiarity as Familiarity]),
  );

  const chineseText = lineIndex !== null ? lines[lineIndex] ?? '' : '';

  const typeColorMap: Record<YuKuaiType, string> = {
    vocab: colors.vocab,
    grammar: colors.grammar,
    expression: colors.culture,
  };

  // Build highlighted Chinese text with YuKuai surface forms colored by type
  const renderHighlightedLine = () => {
    if (!chineseText || !decomposition) return chineseText;

    const typePriority: Record<string, number> = { vocab: 0, expression: 1, grammar: 2 };
    const sortedItems = [...decomposition.yukuai].sort(
      (a, b) => (typePriority[a.type] ?? 9) - (typePriority[b.type] ?? 9),
    );

    const charMap = new Array<LLMYuKuaiItem | null>(chineseText.length).fill(null);
    for (const item of sortedItems) {
      const idx = chineseText.indexOf(item.surface_form);
      if (idx === -1) continue;
      const end = idx + item.surface_form.length;
      for (let i = idx; i < end; i++) {
        if (!charMap[i]) charMap[i] = item;
      }
    }

    const elements: React.ReactNode[] = [];
    let i = 0;
    while (i < chineseText.length) {
      const item = charMap[i];
      if (item) {
        const start = i;
        while (i < chineseText.length && charMap[i] === item) i++;
        elements.push(
          <span key={start} style={{ color: typeColorMap[item.type] }}>
            {chineseText.slice(start, i)}
          </span>,
        );
      } else {
        const start = i;
        while (i < chineseText.length && !charMap[i]) i++;
        elements.push(
          <span key={start} style={{ opacity: 0.5 }}>
            {chineseText.slice(start, i)}
          </span>,
        );
      }
    }
    return elements;
  };

  return (
    <div style={{
      flex: 1,
      padding: isMobile ? 16 : 32,
      overflowY: 'auto',
      height: '100%',
    }}>
      {/* Mobile back button */}
      {isMobile && onBack && (
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.textMuted,
            cursor: 'pointer',
            fontSize: 13,
            marginBottom: 16,
            padding: 0,
          }}
        >
          ← Back to lines
        </button>
      )}

      {/* Chinese line with highlighted YuKuai */}
      <div style={{ fontSize: 24, fontFamily: fonts.chinese, lineHeight: 1.6, color: colors.text, marginBottom: 4 }}>
        {renderHighlightedLine()}
      </div>

      {/* Translation (click to reveal) */}
      <RevealTranslation translation={decomposition.translation} />

      {/* YuKuai sections — one horizontal row per type */}
      <div style={{ marginTop: 20 }}>
        {(['vocab', 'grammar', 'expression'] as YuKuaiType[]).map((type) => (
          <YuKuaiSection
            key={type}
            type={type}
            items={decomposition.yukuai}
            entities={entityMap}
            familiarities={familiarityMap}
            connections={decomposition.connections}
            gotchas={decomposition.gotchas}
            lines={lines}
            onLineJump={onLineJump}
          />
        ))}
      </div>
    </div>
  );
}
