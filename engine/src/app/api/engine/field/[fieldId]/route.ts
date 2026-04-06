import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';
import { computeFrontier } from '@/lib/engine/frontier';

export async function GET(_req: Request, { params }: { params: Promise<{ fieldId: string }> }) {
  const { fieldId } = await params;
  const graph = await getGraph();

  const field = graph.fields.get(fieldId);
  if (!field) {
    return NextResponse.json({ error: 'Field not found' }, { status: 404 });
  }

  const nodes = graph.getFieldNodes(fieldId).map(n => ({
    id: n.id,
    surface_form: n.surface_form,
    pinyin: n.pinyin,
    primary_gloss: n.primary_gloss,
    recognition: n.recognition,
    production: n.production,
    learning_state: n.learning_state,
  }));

  // Confidence distribution (10 bins from 0-1)
  const bins = Array.from({ length: 10 }, () => ({ recognition: 0, production: 0 }));
  for (const n of graph.getFieldNodes(fieldId)) {
    const recBin = Math.min(9, Math.floor(n.recognition * 10));
    const prodBin = Math.min(9, Math.floor(n.production * 10));
    bins[recBin].recognition++;
    bins[prodBin].production++;
  }

  // Frontier items in this field
  const allFrontier = computeFrontier(graph);
  const fieldFrontier = allFrontier.filter(f => {
    const unit = f.unit as any;
    if (!unit.surface_form) return false;
    const fields = graph.getFieldsForWord(unit.surface_form);
    return fields.some(sf => sf.id === fieldId);
  });

  return NextResponse.json({
    field,
    nodes,
    confidenceDistribution: bins,
    frontierItems: fieldFrontier.map(f => ({
      surface_form: (f.unit as any).surface_form ?? (f.unit as any).pattern_name,
      frontierType: f.frontierType,
      priorityScore: f.priorityScore,
      rationale: f.rationale,
    })),
  });
}
