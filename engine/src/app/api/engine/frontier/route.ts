import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';
import { computeFrontier } from '@/lib/engine/frontier';

export async function GET() {
  const graph = await getGraph();
  const frontier = computeFrontier(graph);

  const items = frontier.map(f => {
    const unit = f.unit as any;
    return {
      id: unit.id,
      surface_form: unit.surface_form ?? unit.pattern_name,
      pinyin: unit.pinyin ?? null,
      primary_gloss: unit.primary_gloss ?? unit.description ?? null,
      frontierType: f.frontierType,
      acquisitionProbability: f.acquisitionProbability,
      priorityScore: f.priorityScore,
      rationale: f.rationale,
    };
  });

  return NextResponse.json({ items });
}
