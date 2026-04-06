import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';

export async function GET() {
  const graph = await getGraph();

  const constructions = graph.getAllConstructions().map(gc => ({
    id: gc.id,
    pattern_name: gc.pattern_name,
    pattern_template: gc.pattern_template,
    description: gc.description,
    comprehension: gc.comprehension,
    production: gc.production,
    complexity_tier: gc.complexity_tier,
    avoidance: gc.comprehension > 0.5 && gc.production < 0.2,
    common_errors: gc.common_errors,
  }));

  return NextResponse.json({ constructions });
}
