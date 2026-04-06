import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';

export async function GET() {
  const graph = await getGraph();
  const nodes = Array.from(graph.nodes.values());

  const stateDistribution = { new: 0, acquired: 0, decaying: 0, forgotten: 0 };
  let totalRec = 0, totalProd = 0;
  const registerCounts: Record<string, number> = {};

  for (const n of nodes) {
    stateDistribution[n.learning_state]++;
    totalRec += n.recognition;
    totalProd += n.production;
    for (const r of n.registers) {
      registerCounts[r] = (registerCounts[r] ?? 0) + 1;
    }
  }

  // New nodes this month
  const monthAgo = new Date(Date.now() - 30 * 86400000);
  const newThisMonth = nodes.filter(n => n.created_at >= monthAgo).length;

  // Encounter rate (last 7 days)
  const weekAgo = new Date(Date.now() - 7 * 86400000);
  const recentEncounters = graph.encounters.filter(e => e.created_at >= weekAgo).length;

  return NextResponse.json({
    totalNodes: nodes.length,
    totalCharacters: graph.characters.size,
    totalEdges: graph.edges.length,
    avgRecognition: nodes.length > 0 ? totalRec / nodes.length : 0,
    avgProduction: nodes.length > 0 ? totalProd / nodes.length : 0,
    learningStateDistribution: stateDistribution,
    registerBreakdown: registerCounts,
    newNodesThisMonth: newThisMonth,
    encounterRatePerWeek: recentEncounters,
  });
}
