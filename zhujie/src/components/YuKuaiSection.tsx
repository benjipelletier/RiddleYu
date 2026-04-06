'use client';

import { colors } from '../styles/theme';
import type { YuKuai, LLMYuKuaiItem, LLMConnection, LLMGotcha, YuKuaiType, Familiarity } from '../lib/yukuai-types';
import YuKuaiCard from './YuKuaiCard';

const typeLabels: Record<YuKuaiType, string> = {
  vocab: 'Vocab',
  grammar: 'Grammar',
  expression: 'Expressions',
};

const typeAccent: Record<YuKuaiType, string> = {
  vocab: colors.vocab,
  grammar: colors.grammar,
  expression: colors.culture,
};

interface YuKuaiSectionProps {
  type: YuKuaiType;
  items: LLMYuKuaiItem[];
  entities: Map<string, YuKuai>;
  familiarities: Map<string, Familiarity>;
  connections: LLMConnection[];
  gotchas: LLMGotcha[];
  lines: string[];
  onLineJump: (lineIndex: number) => void;
}

export default function YuKuaiSection({ type, items, entities, familiarities, connections, gotchas, lines, onLineJump }: YuKuaiSectionProps) {
  const filtered = items.filter((item) => item.type === type);
  if (filtered.length === 0) return null;

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: typeAccent[type],
        opacity: 0.6,
        marginBottom: 6,
      }}>
        {typeLabels[type]}
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'flex-start',
      }}>
        {filtered.map((item) => {
          const entity = entities.get(item.canonical_id);
          if (!entity) return null;
          const itemConnections = connections.filter((c) => c.from === item.canonical_id);
          const itemGotchas = gotchas.filter((g) => g.yukuai_id === item.canonical_id);
          return (
            <YuKuaiCard
              key={item.canonical_id}
              item={item}
              entity={entity}
              familiarity={familiarities.get(item.canonical_id) ?? null}
              connections={itemConnections}
              gotchas={itemGotchas}
              lines={lines}
              onLineJump={onLineJump}
            />
          );
        })}
      </div>
    </div>
  );
}
