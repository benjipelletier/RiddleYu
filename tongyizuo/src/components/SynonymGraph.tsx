'use client';

import { useState, useMemo } from 'react';
import type { ClusterData } from '../../lib/types';
import { WORD_COLORS } from './WordNode';
import CollocationField from './CollocationField';

interface Props {
  cluster: ClusterData;
  focusWord: string;
}

const MAX_ORBIT = 9;

function shortGloss(raw: string): string {
  let g = raw.trim();
  for (const sep of ['/', ';', '(']) {
    const i = g.indexOf(sep);
    if (i > 1) { g = g.slice(0, i).trim(); break; }
  }
  for (const pfx of ['to be ', 'to get ', 'to make ', 'to become ', 'to ', 'an ', 'a ', 'the ']) {
    if (g.toLowerCase().startsWith(pfx)) { g = g.slice(pfx.length); break; }
  }
  g = g.trim();
  return g.length > 22 ? g.slice(0, 20) + '…' : g;
}

export { shortGloss };

export default function SynonymGraph({ cluster, focusWord }: Props) {
  const [selectedSimplified, setSelectedSimplified] = useState<string | null>(null);

  // All members in orbit — focus word first (gets gold color)
  const orbit = useMemo(() => {
    const edgeCounts: Record<string, number> = {};
    for (const edge of cluster.edges) {
      edgeCounts[edge.word1] = (edgeCounts[edge.word1] || 0) + 1;
      edgeCounts[edge.word2] = (edgeCounts[edge.word2] || 0) + 1;
    }
    const focus = cluster.members.find((m) => m.simplified === focusWord);
    const others = cluster.members
      .filter((m) => m.simplified !== focusWord)
      .sort((a, b) => (edgeCounts[b.simplified] || 0) - (edgeCounts[a.simplified] || 0));
    return (focus ? [focus, ...others] : others).slice(0, MAX_ORBIT);
  }, [cluster.members, cluster.edges, focusWord]);

  const edgeWeights = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const edge of cluster.edges) {
      const key = [edge.word1, edge.word2].sort().join('|');
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [cluster.edges]);

  // Spoke weight = shared gloss count between focusWord and each member
  const spokeWeights = useMemo(() => {
    const w: Record<string, number> = {};
    for (const m of orbit) {
      if (m.simplified === focusWord) {
        w[m.simplified] = 3; // focus word: solid spoke
      } else {
        const key = [focusWord, m.simplified].sort().join('|');
        w[m.simplified] = edgeWeights[key] || 1;
      }
    }
    return w;
  }, [focusWord, orbit, edgeWeights]);

  // Cross-edges between orbit nodes (count >= 2)
  const crossEdges = useMemo(() => {
    const orbitSet = new Set(orbit.map((m) => m.simplified));
    const pairGlosses: Record<string, string[]> = {};
    for (const edge of cluster.edges) {
      if (!orbitSet.has(edge.word1) || !orbitSet.has(edge.word2)) continue;
      const key = [edge.word1, edge.word2].sort().join('|');
      if (!pairGlosses[key]) pairGlosses[key] = [];
      if (!pairGlosses[key].includes(edge.gloss)) pairGlosses[key].push(edge.gloss);
    }
    return Object.entries(pairGlosses)
      .filter(([, glosses]) => glosses.length >= 2)
      .map(([key, glosses]) => {
        const [word1, word2] = key.split('|');
        const displayGloss = glosses.find((g) => g !== cluster.label) ?? glosses[0];
        return { word1, word2, count: glosses.length, gloss: displayGloss };
      });
  }, [cluster.edges, cluster.label, orbit]);

  const svgW = 640;
  const svgH = 580;
  const cx = svgW / 2;
  const cy = svgH / 2 + 10;
  const orbitR = 190;
  const glossR = 272; // outer gloss ring radius
  const orbitSize = 68;

  const orbitPositions = useMemo(() =>
    orbit.map((_, i) => {
      const angle = ((2 * Math.PI) / orbit.length) * i - Math.PI / 2;
      return {
        x: cx + orbitR * Math.cos(angle),
        y: cy + orbitR * Math.sin(angle),
        angle,
      };
    }), [orbit.length, cx, cy]);

  function getOrbitPos(simplified: string) {
    const idx = orbit.findIndex((m) => m.simplified === simplified);
    return idx >= 0 ? orbitPositions[idx] : null;
  }

  const maxSpokeWeight = Math.max(...Object.values(spokeWeights), 1);
  const maxCrossWeight = Math.max(...crossEdges.map((e) => e.count), 2);

  const selectedMember = selectedSimplified
    ? orbit.find((m) => m.simplified === selectedSimplified) ?? null
    : null;

  const colorOf = (simplified: string) => {
    const idx = orbit.findIndex((m) => m.simplified === simplified);
    return WORD_COLORS[idx % WORD_COLORS.length];
  };
  const colorIndexOf = (simplified: string) =>
    orbit.findIndex((m) => m.simplified === simplified) % WORD_COLORS.length;

  function handleClick(simplified: string) {
    setSelectedSimplified((prev) => (prev === simplified ? null : simplified));
  }

  // Center label dimensions
  const glossLabel = cluster.label;
  const gloss_rx = Math.max(glossLabel.length * 5.5 + 24, 52);
  const gloss_ry = 20;

  // Gloss fan on click (radiates outward from selected node)
  const glossFan = useMemo(() => {
    if (!selectedMember) return null;
    const posData = getOrbitPos(selectedMember.simplified);
    if (!posData) return null;
    const nodeR = orbitSize / 2;

    const dx = posData.x - cx, dy = posData.y - cy;
    const mag = Math.sqrt(dx * dx + dy * dy) || 1;
    const normX = dx / mag, normY = dy / mag;

    const rawGlosses = selectedMember.raw_glosses ?? [];
    const glosses = rawGlosses
      .map(shortGloss)
      .filter(Boolean)
      .filter((g, i, arr) => arr.indexOf(g) === i)
      .slice(0, 5);

    if (glosses.length === 0) return null;

    const spread = Math.min((glosses.length - 1) * 0.32, 1.1);
    const lineLen = 56;

    return glosses.map((g, i) => {
      const angleDelta = glosses.length > 1
        ? -spread / 2 + i * (spread / (glosses.length - 1))
        : 0;
      const cos = Math.cos(angleDelta), sin = Math.sin(angleDelta);
      const fanX = normX * cos - normY * sin;
      const fanY = normX * sin + normY * cos;

      const startX = posData.x + fanX * (nodeR + 5);
      const startY = posData.y + fanY * (nodeR + 5);
      const endX = posData.x + fanX * (nodeR + lineLen);
      const endY = posData.y + fanY * (nodeR + lineLen);

      const isClusterLabel = g === cluster.label;
      const pillW = Math.min(g.length * 6.5 + 20, 120);
      const pillH = 19;

      return (
        <g key={`gfan-${i}`}>
          <line x1={startX} y1={startY} x2={endX} y2={endY}
            stroke={isClusterLabel ? 'rgba(217,164,65,0.55)' : 'rgba(217,164,65,0.2)'}
            strokeWidth={1} strokeDasharray="3 3" />
          <rect
            x={endX - pillW / 2} y={endY - pillH / 2}
            width={pillW} height={pillH} rx={pillH / 2}
            fill="rgba(10,8,6,0.94)"
            stroke={isClusterLabel ? 'rgba(217,164,65,0.75)' : 'rgba(217,164,65,0.3)'}
            strokeWidth={1}
          />
          <text x={endX} y={endY} textAnchor="middle" dominantBaseline="middle"
            fontSize={9}
            fill={isClusterLabel ? 'rgba(217,164,65,0.95)' : 'rgba(217,164,65,0.55)'}
            style={{ fontFamily: 'inherit' }}
          >
            {g}
          </text>
        </g>
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMember, cx, cy, orbitSize, orbitPositions, cluster.label]);

  // Outer gloss ring: always visible, dims on selection
  const outerGlossRing = useMemo(() => {
    return orbit.flatMap((member, i) => {
      const posData = orbitPositions[i];
      const theta = posData.angle;

      const rawGlosses = member.raw_glosses ?? [];
      const otherGlosses = rawGlosses
        .map(shortGloss)
        .filter(Boolean)
        .filter((g, idx, arr) => arr.indexOf(g) === idx)
        .filter((g) => g !== cluster.label)
        .slice(0, 3);

      if (otherGlosses.length === 0) return [];

      const spread = Math.min((otherGlosses.length - 1) * 0.22, 0.44);
      const isSelected = selectedSimplified === member.simplified;
      const isDimmed = selectedSimplified !== null && !isSelected;
      const baseOpacity = isDimmed ? 0.1 : isSelected ? 0.85 : 0.38;

      return otherGlosses.map((g, j) => {
        const dAngle = otherGlosses.length > 1
          ? -spread / 2 + j * (spread / (otherGlosses.length - 1))
          : 0;
        const gAngle = theta + dAngle;
        const gx = cx + glossR * Math.cos(gAngle);
        const gy = cy + glossR * Math.sin(gAngle);
        const pillW = Math.min(g.length * 6 + 16, 92);
        const pillH = 17;

        return (
          <g key={`outergloss-${member.simplified}-${j}`}
            style={{ opacity: baseOpacity, transition: 'opacity 0.25s' }}>
            <rect
              x={gx - pillW / 2} y={gy - pillH / 2}
              width={pillW} height={pillH} rx={pillH / 2}
              fill="rgba(10,8,6,0.8)" stroke="rgba(217,164,65,0.22)" strokeWidth={0.8}
            />
            <text x={gx} y={gy} textAnchor="middle" dominantBaseline="middle"
              fontSize={8} fill="rgba(217,164,65,0.7)"
              style={{ fontFamily: 'inherit' }}
            >
              {g}
            </text>
          </g>
        );
      });
    });
  }, [orbit, orbitPositions, cluster.label, cx, cy, selectedSimplified]);

  return (
    <div style={s.wrap}>
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ overflow: 'visible', width: '100%', maxWidth: svgW }}
      >
        {/* Outer gloss ring — drawn first (behind everything) */}
        {outerGlossRing}

        {/* Spokes: SVG center → orbit nodes */}
        {orbit.map((m, i) => {
          const pos = orbitPositions[i];
          const w = spokeWeights[m.simplified];
          const thickness = 0.8 + (w / maxSpokeWeight) * 2.5;
          const isFocus = m.simplified === focusWord;
          const dimmed = selectedSimplified !== null && selectedSimplified !== m.simplified;
          return (
            <line key={`spoke-${m.simplified}`}
              x1={cx} y1={cy} x2={pos.x} y2={pos.y}
              stroke={isFocus ? 'rgba(217,164,65,0.45)' : 'rgba(217,164,65,0.25)'}
              strokeWidth={thickness}
              strokeDasharray={isFocus ? 'none' : w >= 3 ? 'none' : w === 2 ? '8 4' : '4 6'}
              style={{ opacity: dimmed ? 0.06 : 1, transition: 'opacity 0.25s' }}
            />
          );
        })}

        {/* Cross-edges between orbit nodes */}
        {crossEdges.map((edge) => {
          const p1 = getOrbitPos(edge.word1);
          const p2 = getOrbitPos(edge.word2);
          if (!p1 || !p2) return null;
          const thickness = 0.8 + ((edge.count - 2) / Math.max(maxCrossWeight - 2, 1)) * 2;
          const dimmed = selectedSimplified !== null
            && selectedSimplified !== edge.word1
            && selectedSimplified !== edge.word2;
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const pillW = Math.min(edge.gloss.length * 6.5 + 20, 100);
          const pillH = 18;
          return (
            <g key={`cross-${edge.word1}-${edge.word2}`}
              style={{ opacity: dimmed ? 0.06 : 1, transition: 'opacity 0.25s' }}
            >
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke="rgba(217,164,65,0.45)" strokeWidth={thickness} strokeDasharray="6 4" />
              <rect
                x={midX - pillW / 2} y={midY - pillH / 2}
                width={pillW} height={pillH} rx={pillH / 2}
                fill="rgba(10,8,6,0.92)" stroke="rgba(217,164,65,0.3)" strokeWidth={1}
              />
              <text x={midX} y={midY} textAnchor="middle" dominantBaseline="middle"
                fontSize={9} fill="rgba(217,164,65,0.7)" style={{ fontFamily: 'inherit' }}
              >
                {edge.gloss}
              </text>
            </g>
          );
        })}

        {/* Center: cluster label as glowing ellipse */}
        <g>
          <ellipse cx={cx} cy={cy} rx={gloss_rx} ry={gloss_ry}
            fill="rgba(217,164,65,0.06)" stroke="rgba(217,164,65,0.5)" strokeWidth={1.5}
          />
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
            fontSize={14} fill="#d9a441"
            style={{ fontFamily: 'inherit', letterSpacing: '0.08em' }}
          >
            {glossLabel}
          </text>
        </g>

        {/* Orbit nodes — all members including focus word */}
        {orbit.map((member, i) => {
          const pos = orbitPositions[i];
          const color = WORD_COLORS[i % WORD_COLORS.length];
          const isSelected = selectedSimplified === member.simplified;
          const isDimmed = selectedSimplified !== null && !isSelected;
          const isFocus = member.simplified === focusWord;
          const r = orbitSize / 2;
          const fontSize = member.simplified.length <= 1 ? orbitSize * 0.45
            : member.simplified.length === 2 ? orbitSize * 0.35
            : orbitSize * 0.27;
          return (
            <g key={member.simplified} transform={`translate(${pos.x},${pos.y})`}
              onClick={() => handleClick(member.simplified)}
              style={{ cursor: 'pointer', opacity: isDimmed ? 0.25 : 1, transition: 'opacity 0.25s' }}
            >
              <circle r={r} fill={`${color}0d`}
                stroke={isSelected ? color : `${color}88`}
                strokeWidth={isSelected ? 2 : 1.5}
              />
              {/* Subtle extra ring for focus word */}
              {isFocus && !isSelected && (
                <circle r={r + 4} fill="none" stroke={`${color}20`} strokeWidth={3} />
              )}
              {isSelected && (
                <circle r={r + 5} fill="none" stroke={`${color}25`} strokeWidth={5} />
              )}
              <text textAnchor="middle" dominantBaseline="middle" fontSize={fontSize}
                className="zh" fill={isSelected ? color : `${color}dd`}
              >
                {member.simplified}
              </text>
              <text y={r + 13} textAnchor="middle" dominantBaseline="middle" fontSize={9}
                fill={isSelected ? `${color}aa` : 'rgba(232,213,176,0.45)'}
                style={{ fontFamily: 'inherit' }}
              >
                {member.pinyin_display ?? member.pinyin}
              </text>
            </g>
          );
        })}

        {/* Gloss fan for selected node — on top */}
        {glossFan}
      </svg>

      {/* Detail panel */}
      {selectedMember && (
        <div style={s.detail}>
          <div style={s.detailHeader}>
            <span className="zh" style={{ fontSize: '28px', color: colorOf(selectedMember.simplified), lineHeight: 1 }}>
              {selectedMember.simplified}
            </span>
            <span style={s.detailPinyin}>{selectedMember.pinyin_display ?? selectedMember.pinyin}</span>
          </div>
          {selectedMember.collocations.length > 0 && (
            <CollocationField
              member={selectedMember}
              colorIndex={colorIndexOf(selectedMember.simplified)}
              allMembers={orbit}
            />
          )}
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  detail: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(217,164,65,0.1)',
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    flexWrap: 'wrap',
  },
  detailPinyin: {
    fontSize: '13px',
    color: 'rgba(232,213,176,0.5)',
  },
};
