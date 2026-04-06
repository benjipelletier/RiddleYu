import { KnowledgeGraph } from './graph';
import { getSql } from './db';

let cached: { graph: KnowledgeGraph; timestamp: number } | null = null;
const TTL = 5 * 60 * 1000; // 5 minutes

export async function getGraph(): Promise<KnowledgeGraph> {
  if (cached && Date.now() - cached.timestamp < TTL) return cached.graph;
  const graph = await KnowledgeGraph.load(getSql());
  cached = { graph, timestamp: Date.now() };
  return graph;
}
