import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';

export async function GET() {
  const graph = await getGraph();

  const fields = graph.getSemanticFields().map(f => ({
    id: f.id,
    name: f.name,
    name_zh: f.name_zh,
    node_count: f.node_count,
    avg_recognition: f.avg_recognition,
    avg_production: f.avg_production,
    coverage_pct: f.coverage_pct,
  }));

  // Compute inter-field connection strengths
  const fieldConnections: { source: string; target: string; strength: number }[] = [];
  const fieldPairs = new Map<string, number>();

  for (const edge of graph.edges) {
    if (edge.edge_type !== 'shares_character' && edge.edge_type !== 'synonym' && edge.edge_type !== 'collocation') continue;
    const sourceFieldEdges = graph.getEdges(edge.source_id, 'belongs_to_field', 'forward');
    const targetFieldEdges = graph.getEdges(edge.target_id, 'belongs_to_field', 'forward');

    for (const sf of sourceFieldEdges) {
      for (const tf of targetFieldEdges) {
        if (sf.target_id === tf.target_id) continue;
        const key = [sf.target_id, tf.target_id].sort().join('|');
        fieldPairs.set(key, (fieldPairs.get(key) ?? 0) + 1);
      }
    }
  }

  const maxCount = Math.max(1, ...fieldPairs.values());
  for (const [key, count] of fieldPairs) {
    const [source, target] = key.split('|');
    if (count > maxCount * 0.05) { // only include non-trivial connections
      fieldConnections.push({ source, target, strength: count / maxCount });
    }
  }

  return NextResponse.json({ fields, connections: fieldConnections });
}
