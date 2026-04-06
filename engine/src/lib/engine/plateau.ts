import type { PlateauSignal } from './types';
import type { KnowledgeGraph } from './graph';

/**
 * Detect plateau signals — structural patterns that indicate stalled learning.
 */
export function detectPlateaus(graph: KnowledgeGraph, windowDays: number = 30): PlateauSignal[] {
  const signals: PlateauSignal[] = [];

  signals.push(...detectDepthStall(graph));
  signals.push(...detectFieldGaps(graph));
  signals.push(...detectAvoidancePatterns(graph));
  signals.push(...detectBreadthStall(graph, windowDays));

  return signals.sort((a, b) => b.severity - a.severity);
}

/**
 * Depth stall: recognition strong but production/collocational precision lag across many nodes.
 */
function detectDepthStall(graph: KnowledgeGraph): PlateauSignal[] {
  const signals: PlateauSignal[] = [];
  const knownNodes = Array.from(graph.nodes.values()).filter(n => n.recognition >= 0.5);

  if (knownNodes.length === 0) return signals;

  const avgRec = knownNodes.reduce((s, n) => s + n.recognition, 0) / knownNodes.length;
  const avgProd = knownNodes.reduce((s, n) => s + n.production, 0) / knownNodes.length;
  const avgReg = knownNodes.reduce((s, n) => s + n.register_awareness, 0) / knownNodes.length;
  const avgColloc = knownNodes.reduce((s, n) => s + n.collocational_prec, 0) / knownNodes.length;

  const recProdGap = avgRec - avgProd;
  if (recProdGap > 0.25) {
    signals.push({
      type: 'depth_stall',
      severity: Math.min(1, recProdGap),
      title: 'Production significantly lags recognition',
      description: `Average recognition is ${(avgRec * 100).toFixed(0)}% but production is only ${(avgProd * 100).toFixed(0)}% across ${knownNodes.length} known words. The ${(recProdGap * 100).toFixed(0)}pp gap suggests passive knowledge isn't converting to active use.`,
      prescription: 'Prioritize production-oriented activities: sentence composition, speaking practice, writing exercises with known vocabulary.',
      metadata: { avgRec, avgProd, gap: recProdGap },
    });
  }

  const recRegGap = avgRec - avgReg;
  if (recRegGap > 0.3) {
    signals.push({
      type: 'depth_stall',
      severity: Math.min(1, recRegGap * 0.8),
      title: 'Register awareness underdeveloped',
      description: `Recognition averages ${(avgRec * 100).toFixed(0)}% but register awareness is ${(avgReg * 100).toFixed(0)}%. Words are recognized but their formality/context isn't well understood.`,
      prescription: 'Expose to varied registers: formal news articles, casual social media, literary texts. Annotation tool should highlight register differences.',
      metadata: { avgRec, avgReg, gap: recRegGap },
    });
  }

  const recCollocGap = avgRec - avgColloc;
  if (recCollocGap > 0.35) {
    signals.push({
      type: 'depth_stall',
      severity: Math.min(1, recCollocGap * 0.7),
      title: 'Collocational knowledge weak',
      description: `Collocational precision (${(avgColloc * 100).toFixed(0)}%) lags far behind recognition (${(avgRec * 100).toFixed(0)}%). Natural word pairings aren't well established.`,
      prescription: 'Focus on collocation-rich content. Highlight common pairings in annotation. Consider collocation-specific exercises.',
      metadata: { avgRec, avgColloc, gap: recCollocGap },
    });
  }

  return signals;
}

/**
 * Field gaps: semantic fields with < 30% coverage.
 */
function detectFieldGaps(graph: KnowledgeGraph): PlateauSignal[] {
  const signals: PlateauSignal[] = [];

  for (const field of graph.getSemanticFields()) {
    if (field.coverage_pct < 0.3 && field.node_count > 10) {
      signals.push({
        type: 'field_gap',
        severity: Math.min(1, (0.3 - field.coverage_pct) * 3),
        title: `Weak coverage: ${field.name_zh} (${field.name})`,
        description: `Only ${(field.coverage_pct * 100).toFixed(0)}% coverage with ${field.node_count} words tracked. Average recognition: ${(field.avg_recognition * 100).toFixed(0)}%.`,
        prescription: `Seek content in the ${field.name} domain. Start with high-frequency vocabulary in this field.`,
        metadata: { fieldId: field.id, fieldName: field.name, coverage: field.coverage_pct },
      });
    }
  }

  return signals;
}

/**
 * Avoidance patterns: grammar constructions with high comprehension but very low production.
 */
function detectAvoidancePatterns(graph: KnowledgeGraph): PlateauSignal[] {
  const signals: PlateauSignal[] = [];

  for (const gc of graph.getAllConstructions()) {
    const compProdGap = gc.comprehension - gc.production;
    if (gc.comprehension > 0.5 && compProdGap > 0.3) {
      signals.push({
        type: 'avoidance_pattern',
        severity: Math.min(1, compProdGap),
        title: `Avoiding: ${gc.pattern_name}`,
        description: `Comprehension is ${(gc.comprehension * 100).toFixed(0)}% but production is only ${(gc.production * 100).toFixed(0)}% — a ${(compProdGap * 100).toFixed(0)}pp gap suggesting active avoidance.`,
        prescription: `Practice producing ${gc.pattern_name} in controlled exercises. Start with simple examples using known vocabulary.`,
        metadata: {
          constructionId: gc.id,
          pattern: gc.pattern_template,
          comprehension: gc.comprehension,
          production: gc.production,
          commonErrors: gc.common_errors,
        },
      });
    }
  }

  return signals;
}

/**
 * Breadth stall: new node acquisition rate has dropped.
 */
function detectBreadthStall(graph: KnowledgeGraph, windowDays: number): PlateauSignal[] {
  const signals: PlateauSignal[] = [];
  const now = new Date();

  // Count encounters in recent vs older halves of the window
  const halfWindow = windowDays / 2;
  const midpoint = new Date(now.getTime() - halfWindow * 86400000);

  let recentEncounters = 0;
  let olderEncounters = 0;
  for (const enc of graph.encounters) {
    const daysAgo = (now.getTime() - enc.created_at.getTime()) / 86400000;
    if (daysAgo > windowDays) continue;
    if (enc.created_at >= midpoint) recentEncounters++;
    else olderEncounters++;
  }

  // If recent activity is less than 40% of older activity, flag it
  if (olderEncounters > 20 && recentEncounters < olderEncounters * 0.4) {
    const dropPct = ((1 - recentEncounters / olderEncounters) * 100).toFixed(0);
    signals.push({
      type: 'breadth_stall',
      severity: Math.min(1, (1 - recentEncounters / olderEncounters) * 0.8),
      title: 'Learning activity declining',
      description: `Encounter rate dropped ${dropPct}% in the last ${Math.round(halfWindow)} days compared to the previous ${Math.round(halfWindow)} days. New word exposure is stalling.`,
      prescription: 'Increase content consumption. Try new content sources or topics to reignite encounter rate.',
      metadata: { recentEncounters, olderEncounters, windowDays },
    });
  }

  return signals;
}
