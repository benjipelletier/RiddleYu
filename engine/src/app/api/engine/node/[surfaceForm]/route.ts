import { NextResponse } from 'next/server';
import { getGraph } from '@/lib/engine/graph-cache';
import { computeFrontier } from '@/lib/engine/frontier';

export async function GET(_req: Request, { params }: { params: Promise<{ surfaceForm: string }> }) {
  const { surfaceForm } = await params;
  const decoded = decodeURIComponent(surfaceForm);
  const graph = await getGraph();

  const node = graph.findBySurface(decoded);
  if (!node) {
    return NextResponse.json({ error: 'Node not found' }, { status: 404 });
  }

  // Encounter history for this node
  const nodeEncounters = graph.encounters
    .filter(e => e.node_id === node.id)
    .slice(0, 100)
    .map(e => ({
      signal_type: e.signal_type,
      signal_strength: e.signal_strength,
      source_type: e.source_type,
      created_at: e.created_at,
    }));

  // Connected edges
  const edges = graph.getEdges(node.id).map(e => {
    const otherId = e.source_id === node.id ? e.target_id : e.source_id;
    const otherNode = graph.nodes.get(otherId);
    return {
      edge_type: e.edge_type,
      weight: e.weight,
      metadata: e.metadata,
      connected_surface: otherNode?.surface_form ?? null,
      connected_pinyin: otherNode?.pinyin ?? null,
    };
  });

  // Fields
  const fields = graph.getFieldsForWord(decoded).map(f => ({
    id: f.id,
    name: f.name,
    name_zh: f.name_zh,
  }));

  // Frontier status
  const frontier = computeFrontier(graph);
  const frontierEntry = frontier.find(f => {
    const unit = f.unit as any;
    return unit.surface_form === decoded;
  });

  return NextResponse.json({
    node: {
      id: node.id,
      surface_form: node.surface_form,
      pinyin: node.pinyin,
      primary_gloss: node.primary_gloss,
      unit_type: node.unit_type,
      recognition: node.recognition,
      production: node.production,
      register_awareness: node.register_awareness,
      collocational_prec: node.collocational_prec,
      recognition_uncertainty: node.recognition_uncertainty,
      production_uncertainty: node.production_uncertainty,
      register_uncertainty: node.register_uncertainty,
      collocational_uncertainty: node.collocational_uncertainty,
      learning_state: node.learning_state,
      peak_recognition: node.peak_recognition,
      peak_production: node.peak_production,
      frequency_rank: node.frequency_rank,
      registers: node.registers,
      context_breadth: node.context_breadth,
      encounter_count: node.encounter_count,
    },
    encounters: nodeEncounters,
    edges,
    fields,
    frontier: frontierEntry ? {
      type: frontierEntry.frontierType,
      acquisitionProbability: frontierEntry.acquisitionProbability,
      priorityScore: frontierEntry.priorityScore,
      rationale: frontierEntry.rationale,
    } : null,
  });
}
