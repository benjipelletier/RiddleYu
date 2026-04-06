import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';

export async function GET() {
  const graph = await getGraph();

  const nodes = Array.from(graph.nodes.values()).map(n => ({
    id: n.id,
    surface_form: n.surface_form,
    pinyin: n.pinyin,
    recognition: n.recognition,
    recognition_uncertainty: n.recognition_uncertainty,
    learning_state: n.learning_state,
  }));

  return NextResponse.json({ nodes });
}
