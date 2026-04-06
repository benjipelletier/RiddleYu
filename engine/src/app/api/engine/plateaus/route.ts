import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';
import { detectPlateaus } from '@/lib/engine/plateau';

export async function GET() {
  const graph = await getGraph();
  const plateaus = detectPlateaus(graph);

  return NextResponse.json({ signals: plateaus });
}
