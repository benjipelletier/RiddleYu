import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';

export async function GET() {
  const graph = await getGraph();
  const dayMap = graph.getEncountersByDay(30);

  // Sort by date and format
  const days = Array.from(dayMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date,
      total: data.total,
      bySource: data.bySource,
      newNodes: data.newNodes,
    }));

  return NextResponse.json({ days });
}
