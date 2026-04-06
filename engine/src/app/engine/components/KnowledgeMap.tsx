'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';

const GOLD = '#D4A853';
const GOLD_BRIGHT = '#F0C75E';
const GOLD_DIM = '#6B5A2E';
const TEXT = '#E8E4DC';
const TEXT_DIM = '#5c574e';
const BLUE_BRIGHT = '#7BB4DD';
const PURPLE = '#9B7EC8';
const GREEN_BRIGHT = '#8DC49A';
const RED = '#C9544A';
const ORANGE = '#D4853A';
const BG = '#0A0A0B';

interface FieldData {
  id: string;
  name: string;
  name_zh: string;
  node_count: number;
  avg_recognition: number;
  avg_production: number;
  coverage_pct: number;
}

interface Connection {
  source: string;
  target: string;
  strength: number;
}

interface FrontierItem {
  id: string;
  surface_form: string;
  frontierType: string;
  priorityScore: number;
}

// Predefined positions for semantic fields (normalized 0-1)
const FIELD_POSITIONS: Record<string, { x: number; y: number }> = {
  emotions: { x: 0.35, y: 0.3 },
  daily_life: { x: 0.5, y: 0.45 },
  relationships: { x: 0.3, y: 0.5 },
  music_arts: { x: 0.2, y: 0.35 },
  food_cooking: { x: 0.6, y: 0.6 },
  nature: { x: 0.65, y: 0.3 },
  travel: { x: 0.55, y: 0.25 },
  history_culture: { x: 0.45, y: 0.2 },
  work_business: { x: 0.75, y: 0.5 },
  technology: { x: 0.8, y: 0.35 },
  politics_law: { x: 0.85, y: 0.65 },
  health_medicine: { x: 0.7, y: 0.7 },
};

export default function KnowledgeMap({
  fields,
  connections,
  frontierItems,
  selectedField,
  onFieldClick,
}: {
  fields: FieldData[];
  connections: Connection[];
  frontierItems: FrontierItem[];
  selectedField: string | null;
  onFieldClick: (id: string | null) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 380 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      setDims({ w: width, h: Math.max(300, Math.min(420, width * 0.6)) });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleFieldClick = useCallback((fieldId: string) => {
    onFieldClick(fieldId === selectedField ? null : fieldId);
  }, [selectedField, onFieldClick]);

  useEffect(() => {
    if (!svgRef.current) return;
    const { w, h } = dims;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');
    const glow = defs.append('filter').attr('id', 'glow')
      .attr('x', '-80%').attr('y', '-80%').attr('width', '260%').attr('height', '260%');
    glow.append('feGaussianBlur').attr('stdDeviation', '5').attr('result', 'b');
    glow.append('feMerge').selectAll('feMergeNode')
      .data(['b', 'SourceGraphic']).enter().append('feMergeNode').attr('in', (d: string) => d);

    const g = svg.append('g');

    // Field positions
    const fieldPositions = fields.map(f => ({
      ...f,
      ...(FIELD_POSITIONS[f.name] ?? { x: 0.5, y: 0.5 }),
    }));

    // Connections between fields
    for (const conn of connections) {
      const fa = fieldPositions.find(f => f.id === conn.source);
      const fb = fieldPositions.find(f => f.id === conn.target);
      if (!fa || !fb) continue;
      g.append('line')
        .attr('x1', fa.x * w).attr('y1', fa.y * h)
        .attr('x2', fb.x * w).attr('y2', fb.y * h)
        .attr('stroke', GOLD)
        .attr('stroke-opacity', conn.strength * 0.15)
        .attr('stroke-width', conn.strength * 2.5);
    }

    // Field bubbles
    const groups = g.selectAll('.f').data(fieldPositions).enter().append('g')
      .attr('transform', d => `translate(${d.x * w},${d.y * h})`)
      .style('cursor', 'pointer')
      .on('click', (_, d) => handleFieldClick(d.id));

    // Pulse for weak fields
    groups.filter(d => d.coverage_pct < 0.3).append('circle')
      .attr('r', d => 24 + d.node_count / 15)
      .attr('fill', 'none').attr('stroke', RED).attr('stroke-opacity', 0.15)
      .attr('stroke-width', 1).attr('stroke-dasharray', '4,3');

    // Outer ring
    groups.append('circle')
      .attr('r', d => 18 + d.node_count / 15)
      .attr('fill', 'none')
      .attr('stroke', d => d.coverage_pct < 0.3 ? RED : d.coverage_pct < 0.5 ? ORANGE : GOLD)
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', d => 0.15 + d.coverage_pct * 0.55);

    // Inner fill
    groups.append('circle')
      .attr('r', d => (18 + d.node_count / 15) * d.avg_recognition)
      .attr('fill', d => d.coverage_pct < 0.3 ? RED : GOLD)
      .attr('fill-opacity', d => 0.06 + d.avg_recognition * 0.1);

    // Selected highlight
    groups.filter(d => d.id === selectedField).append('circle')
      .attr('r', d => 24 + d.node_count / 15)
      .attr('fill', 'none').attr('stroke', GOLD_BRIGHT)
      .attr('stroke-width', 2).attr('stroke-opacity', 0.7)
      .attr('filter', 'url(#glow)');

    // Labels
    groups.append('text').text(d => d.name_zh)
      .attr('text-anchor', 'middle').attr('dy', -3)
      .attr('fill', d => d.id === selectedField ? GOLD_BRIGHT : TEXT)
      .attr('font-size', d => d.node_count > 200 ? 14 : 12)
      .attr('font-weight', 600).attr('font-family', "'Noto Serif SC', serif");

    groups.append('text').text(d => `${(d.coverage_pct * 100).toFixed(0)}%`)
      .attr('text-anchor', 'middle').attr('dy', 12)
      .attr('fill', d => d.coverage_pct < 0.3 ? RED : d.coverage_pct < 0.5 ? ORANGE : GOLD_DIM)
      .attr('font-size', 10).attr('font-family', 'monospace');

    // Frontier dots orbiting fields
    const typeColor: Record<string, string> = {
      near: GOLD_BRIGHT, depth: BLUE_BRIGHT, bridge: GREEN_BRIGHT, structural: PURPLE,
    };

    const topFrontier = frontierItems.slice(0, 15);
    topFrontier.forEach((item, idx) => {
      // Find which field this frontier item belongs to (pick first matching)
      const matchField = fieldPositions.find(f => {
        const fieldEdges = connections.filter(c => c.source === f.id || c.target === f.id);
        return fieldEdges.length > 0;
      });

      // Distribute frontier items around fields based on index
      const fieldIdx = idx % fieldPositions.length;
      const field = fieldPositions[fieldIdx];
      if (!field) return;

      const angle = idx * 137.5 * Math.PI / 180; // golden angle
      const dist = 24 + field.node_count / 15 + 10;
      const fx = field.x * w + Math.cos(angle) * dist;
      const fy = field.y * h + Math.sin(angle) * dist;
      const c = typeColor[item.frontierType] ?? GOLD;

      g.append('circle').attr('cx', fx).attr('cy', fy).attr('r', 4)
        .attr('fill', c).attr('fill-opacity', 0.8).attr('filter', 'url(#glow)');
      g.append('circle').attr('cx', fx).attr('cy', fy).attr('r', 2.5)
        .attr('fill', c);

      g.append('text').text(item.surface_form)
        .attr('x', fx).attr('y', fy - 9).attr('text-anchor', 'middle')
        .attr('fill', c).attr('font-size', 9).attr('font-weight', 500)
        .attr('font-family', "'Noto Serif SC', serif").attr('opacity', 0.85);
    });

  }, [dims, selectedField, fields, connections, frontierItems, handleFieldClick]);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      <svg ref={svgRef} width={dims.w} height={dims.h} style={{ display: 'block' }} />
    </div>
  );
}
