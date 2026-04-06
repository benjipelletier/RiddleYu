import type { LexicalUnit, GrammarConstruction, FrontierCandidate, FrontierConfig, GoalWeights } from './types';
import type { KnowledgeGraph } from './graph';
import { RECEPTIVE_WEIGHTS } from './scoring';

export const DEFAULT_FRONTIER_CONFIG: FrontierConfig = {
  nearWeight: 0.35,
  depthWeight: 0.30,
  structuralWeight: 0.20,
  bridgeWeight: 0.15,
  maxResults: 50,
};

/**
 * Near-frontier: low-confidence nodes primed for acquisition.
 * Adapted from spec — uses existing low-confidence nodes instead of content corpus.
 */
export function scoreNearFrontier(node: LexicalUnit, graph: KnowledgeGraph): FrontierCandidate | null {
  // Only score nodes that aren't already well-known
  if (node.recognition > 0.4) return null;

  // 1. Character familiarity
  const chars = [...node.surface_form].filter(c => /[\u4e00-\u9fff]/.test(c));
  const charScores = chars.map(c => graph.getCharFamiliarity(c));
  const charFamiliarity = charScores.length > 0
    ? charScores.reduce((a, b) => a + b, 0) / charScores.length
    : 0;

  // 2. Synonym proximity
  const knownSynonyms = graph.getSynonyms(node.surface_form)
    .filter(s => s.recognition > 0.5);
  const synonymBonus = Math.min(0.3, knownSynonyms.length * 0.1);

  // 3. Collocational context
  const knownCollocates = graph.getCommonCollocates(node.surface_form)
    .filter(c => c.recognition > 0.5);
  const collocateBonus = Math.min(0.2, knownCollocates.length * 0.05);

  // 4. Grammar readiness
  const requiredGrammar = graph.getRequiredConstructions(node.surface_form);
  const grammarReadiness = requiredGrammar.length > 0
    ? requiredGrammar.filter(g => g.comprehension > 0.5).length / requiredGrammar.length
    : 1.0;

  // 5. Frequency weighting
  const frequencyBonus = node.frequency_rank
    ? Math.max(0, 0.2 * (1 - node.frequency_rank / 10000))
    : 0;

  const acquisitionProb = Math.min(1.0,
    charFamiliarity * 0.3 + synonymBonus + collocateBonus +
    grammarReadiness * 0.2 + frequencyBonus
  );

  if (acquisitionProb < 0.15) return null;

  const parts: string[] = [];
  if (charFamiliarity > 0.5) parts.push(`characters are familiar (${(charFamiliarity * 100).toFixed(0)}%)`);
  if (knownSynonyms.length > 0) parts.push(`knows ${knownSynonyms.length} synonym(s)`);
  if (knownCollocates.length > 0) parts.push(`knows ${knownCollocates.length} collocate(s)`);
  if (frequencyBonus > 0.1) parts.push('high frequency');

  return {
    unit: node,
    frontierType: 'near',
    acquisitionProbability: acquisitionProb,
    priorityScore: acquisitionProb * (1 + frequencyBonus),
    rationale: parts.length > 0 ? parts.join('; ') : 'within reach based on current knowledge',
  };
}

/**
 * Depth frontier: known words with dimension imbalances.
 * Uncertainty-aware — high-uncertainty nodes are worth probing.
 */
export function scoreDepthFrontier(node: LexicalUnit, weights: GoalWeights): FrontierCandidate | null {
  const dimensions = [
    { name: 'recognition', score: node.recognition, weight: weights.recognition, uncertainty: node.recognition_uncertainty },
    { name: 'production', score: node.production, weight: weights.production, uncertainty: node.production_uncertainty },
    { name: 'register', score: node.register_awareness, weight: weights.register_awareness, uncertainty: node.register_uncertainty },
    { name: 'collocation', score: node.collocational_prec, weight: weights.collocational_prec, uncertainty: node.collocational_uncertainty },
  ];

  // Must have at least one dimension above 0.5
  if (Math.max(...dimensions.map(d => d.score)) < 0.5) return null;

  const maxWeightedScore = Math.max(...dimensions.map(d => d.score * d.weight));
  const minWeightedScore = Math.min(...dimensions.map(d => d.score * d.weight));
  const depthGap = maxWeightedScore - minWeightedScore;

  if (depthGap < 0.05) return null;

  // Uncertainty boost: high-uncertainty nodes are worth probing
  const avgUncertainty = dimensions.reduce((sum, d) => sum + d.uncertainty, 0) / dimensions.length;
  const uncertaintyBoost = 1 + avgUncertainty * 0.5;

  const frequencyMult = node.frequency_rank
    ? Math.max(0.5, 1.5 - node.frequency_rank / 5000)
    : 1.0;

  const weakest = dimensions.reduce((a, b) => (a.score * a.weight < b.score * b.weight ? a : b));

  return {
    unit: node,
    frontierType: 'depth',
    acquisitionProbability: 0.7,
    priorityScore: depthGap * frequencyMult * uncertaintyBoost,
    rationale: `Recognition strong but ${weakest.name} lags (${(weakest.score * 100).toFixed(0)}%).${avgUncertainty > 0.5 ? ' High uncertainty — worth probing.' : ''}`,
  };
}

/**
 * Structural frontier: grammar constructions where vocabulary is ready
 * but the pattern itself isn't demonstrated.
 */
export function scoreStructuralFrontier(construction: GrammarConstruction, graph: KnowledgeGraph): FrontierCandidate | null {
  const demonstratedWith = graph.getEdges(construction.id, 'demonstrated_with');
  const potentialUses = graph.getEdges(construction.id, 'requires_grammar', 'reverse');
  const knownPotential = potentialUses
    .map(e => graph.nodes.get(e.source_id))
    .filter(n => n && n.recognition > 0.6);

  const vocabReadiness = knownPotential.length >= 3 ? 1.0 : knownPotential.length / 3;
  const demonstrationGap = vocabReadiness > 0.5 && construction.comprehension < 0.4
    ? vocabReadiness - construction.comprehension
    : 0;

  if (demonstrationGap < 0.1) return null;

  return {
    unit: construction,
    frontierType: 'structural',
    acquisitionProbability: vocabReadiness * 0.6,
    priorityScore: demonstrationGap * (construction.complexity_tier || 1),
    rationale: `Knows ${knownPotential.length} words that use this pattern, but comprehension only ${(construction.comprehension * 100).toFixed(0)}%.`,
  };
}

/**
 * Bridge nodes: words connecting disconnected or weakly-connected graph regions.
 */
export function scoreBridgeNode(node: LexicalUnit, graph: KnowledgeGraph): FrontierCandidate | null {
  if (node.recognition > 0.5) return null; // only score unknown/weak nodes

  const fields = graph.getFieldsForWord(node.surface_form);
  if (fields.length < 2) return null;

  const fieldConnections = fields.map(f => ({
    field: f,
    currentCoverage: graph.getFieldCoverage(f.id),
  }));

  const wellKnown = fieldConnections.filter(fc => fc.currentCoverage > 0.5);
  const sparse = fieldConnections.filter(fc => fc.currentCoverage < 0.2);

  const bridgeValue = (wellKnown.length > 0 && sparse.length > 0)
    ? wellKnown.length * sparse.length * 0.3
    : 0;

  if (bridgeValue < 0.1) return null;

  const crossFieldEdges = graph.getCrossFieldEdgeCount(node.id);
  const connectivityBonus = Math.min(0.3, crossFieldEdges * 0.05);

  return {
    unit: node,
    frontierType: 'bridge',
    acquisitionProbability: 0.5,
    priorityScore: bridgeValue + connectivityBonus,
    rationale: `Bridges ${wellKnown.map(w => w.field.name).join(', ')} → ${sparse.map(s => s.field.name).join(', ')}`,
  };
}

/**
 * Unified frontier ranking across all four types.
 */
export function computeFrontier(
  graph: KnowledgeGraph,
  config: FrontierConfig = DEFAULT_FRONTIER_CONFIG,
  weights: GoalWeights = RECEPTIVE_WEIGHTS,
): FrontierCandidate[] {
  const candidates: FrontierCandidate[] = [];

  const allNodes = Array.from(graph.nodes.values());

  // A. Near-frontier: low-confidence nodes
  for (const node of allNodes) {
    if (node.recognition >= 0.4) continue;
    const scored = scoreNearFrontier(node, graph);
    if (scored && scored.acquisitionProbability > 0.15) {
      scored.priorityScore *= config.nearWeight;
      candidates.push(scored);
    }
  }

  // B. Depth frontier: dimension imbalances
  for (const node of allNodes) {
    if (node.recognition < 0.5) continue;
    const scored = scoreDepthFrontier(node, weights);
    if (scored && scored.priorityScore > 0.02) {
      scored.priorityScore *= config.depthWeight;
      candidates.push(scored);
    }
  }

  // C. Structural frontier: grammar gaps
  for (const construction of graph.getAllConstructions()) {
    const scored = scoreStructuralFrontier(construction, graph);
    if (scored && scored.priorityScore > 0.05) {
      scored.priorityScore *= config.structuralWeight;
      candidates.push(scored);
    }
  }

  // D. Bridge nodes
  for (const node of allNodes) {
    if (node.recognition >= 0.5) continue;
    const scored = scoreBridgeNode(node, graph);
    if (scored && scored.priorityScore > 0.05) {
      scored.priorityScore *= config.bridgeWeight;
      candidates.push(scored);
    }
  }

  return candidates
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, config.maxResults);
}
