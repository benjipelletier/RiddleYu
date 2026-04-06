import type { LexicalUnit, Character, GoalWeights, DecayConfig, Encounter } from './types';

// Decay lambdas per dimension
export const DECAY_CONFIG: DecayConfig = {
  recognition: 0.01,        // ~70 day half-life
  production: 0.05,          // ~14 day half-life
  register_awareness: 0.02,  // ~35 day half-life
  collocational_prec: 0.03,  // ~23 day half-life
};

// Receptive-primary profile (current learner type)
export const RECEPTIVE_WEIGHTS: GoalWeights = {
  recognition: 0.50,
  production: 0.10,
  register_awareness: 0.25,
  collocational_prec: 0.15,
};

// Balanced profile (future, when shifting to production)
export const BALANCED_WEIGHTS: GoalWeights = {
  recognition: 0.30,
  production: 0.30,
  register_awareness: 0.20,
  collocational_prec: 0.20,
};

export const PASSIVE_SIGNAL_STRENGTHS = {
  didnt_tap: 0.02,
  tapped: 0.25,
  annotation_dismissed: 0.08,
  annotation_studied: 0.30,
};

/**
 * Context-weighted decay function.
 * Breadth of exposure slows forgetting.
 */
export function effectiveConfidence(
  baseConfidence: number,
  daysSinceReinforced: number,
  lambda: number,
  contextBreadth: number,
  contextThreshold: number = 5,
): number {
  const decay = Math.exp(-lambda * daysSinceReinforced);

  // Context breadth bonus: diverse encounters slow decay
  const breadthBonus = Math.min(
    1.0,
    Math.log(contextBreadth + 1) / Math.log(contextThreshold + 1),
  );

  // Breadth bonus reduces effective decay by up to 50%
  const adjustedDecay = decay + (1 - decay) * breadthBonus * 0.5;

  return baseConfidence * adjustedDecay;
}

/**
 * Update confidence based on an encounter signal.
 */
export function updateConfidence(node: LexicalUnit, encounter: Encounter): LexicalUnit {
  const now = new Date();
  const delta = encounter.signal_strength;

  function adjust(current: number, positive: boolean): number {
    if (positive) {
      // Diminishing returns: harder to go from 0.8→0.9 than 0.2→0.3
      return current + (1 - current) * delta * 0.3;
    } else {
      // Negative signals weighted more heavily (trust errors)
      return current * (1 - delta * 0.4);
    }
  }

  function reduceUncertainty(current: number, signalStrength: number): number {
    return current * (1 - signalStrength * 0.2);
  }

  const isPositive = !encounter.signal_type.includes('fail')
    && !encounter.signal_type.includes('incorrect')
    && !encounter.signal_type.includes('inappropriate');

  const updated = { ...node };

  if (encounter.updates_recognition) {
    updated.recognition = adjust(node.recognition, isPositive);
    updated.recognition_uncertainty = reduceUncertainty(node.recognition_uncertainty, encounter.signal_strength);
    updated.last_reinforced_recognition = now;
    updated.peak_recognition = Math.max(node.peak_recognition, updated.recognition);
  }
  if (encounter.updates_production) {
    updated.production = adjust(node.production, isPositive);
    updated.production_uncertainty = reduceUncertainty(node.production_uncertainty, encounter.signal_strength);
    updated.last_reinforced_production = now;
    updated.peak_production = Math.max(node.peak_production, updated.production);
  }
  if (encounter.updates_register) {
    updated.register_awareness = adjust(node.register_awareness, isPositive);
    updated.register_uncertainty = reduceUncertainty(node.register_uncertainty, encounter.signal_strength);
  }
  if (encounter.updates_collocation) {
    updated.collocational_prec = adjust(node.collocational_prec, isPositive);
    updated.collocational_uncertainty = reduceUncertainty(node.collocational_uncertainty, encounter.signal_strength);
  }

  // Production can never exceed recognition
  updated.production = Math.min(updated.production, updated.recognition);

  // Learning state transitions
  updated.learning_state = deriveLearningState(updated);

  return updated;
}

/**
 * Derive learning state from peak recognition and current recognition.
 */
export function deriveLearningState(node: { peak_recognition: number; recognition: number }): 'new' | 'acquired' | 'decaying' | 'forgotten' {
  if (node.peak_recognition < 0.6) return 'new';
  if (node.recognition >= 0.5) return 'acquired';
  if (node.recognition >= 0.3) return 'decaying';
  return 'forgotten';
}

/**
 * Compute character familiarity from containing words.
 * Uses diminishing returns — knowing more words with a character helps less.
 */
export function deriveCharacterFamiliarity(containingWords: LexicalUnit[]): number {
  if (containingWords.length === 0) return 0;

  const knownWords = containingWords.filter(w => w.recognition > 0.5);

  // Diminishing returns per additional known word
  const familiarity = 1 - Math.exp(-0.3 * knownWords.length);

  const avgConfidence = knownWords.length > 0
    ? knownWords.reduce((sum, w) => sum + w.recognition, 0) / knownWords.length
    : 0;

  return familiarity * avgConfidence;
}

/**
 * Weighted aggregate mastery score per goal profile.
 */
export function masteryScore(node: LexicalUnit, weights: GoalWeights): number {
  return (
    node.recognition * weights.recognition +
    node.production * weights.production +
    node.register_awareness * weights.register_awareness +
    node.collocational_prec * weights.collocational_prec
  );
}
