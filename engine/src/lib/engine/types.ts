// Core data model types for the 知识引擎

export interface LexicalUnit {
  id: string;
  surface_form: string;
  pinyin: string;
  primary_gloss: string;
  unit_type: 'word' | 'collocation' | 'fixed_expression' | 'chengyu';

  recognition: number;
  production: number;
  register_awareness: number;
  collocational_prec: number;

  recognition_uncertainty: number;
  production_uncertainty: number;
  register_uncertainty: number;
  collocational_uncertainty: number;

  learning_state: 'new' | 'acquired' | 'decaying' | 'forgotten';

  last_reinforced_recognition: Date | null;
  last_reinforced_production: Date | null;
  peak_recognition: number;
  peak_production: number;

  frequency_rank: number | null;
  registers: string[];
  complexity_tier: number;
  component_chars: string[];

  context_breadth: number;
  encounter_count: number;

  created_at: Date;
  updated_at: Date;
}

export interface GrammarConstruction {
  id: string;
  pattern_name: string;
  pattern_template: string;
  description: string;
  comprehension: number;
  production: number;
  complexity_tier: number;
  common_errors: Record<string, string>;
  last_reinforced: Date | null;
  created_at: Date;
}

export interface Character {
  id: string;
  character: string;
  pinyin_readings: string[];
  radical: string | null;
  stroke_count: number | null;
  node_type: 'derived' | 'full';
  familiarity: number;
  known_word_count: number;
  updated_at: Date;
}

export interface SemanticField {
  id: string;
  name: string;
  name_zh: string;
  description: string;
  node_count: number;
  avg_recognition: number;
  avg_production: number;
  coverage_pct: number;
  updated_at: Date;
}

export interface Edge {
  id: string;
  source_id: string;
  target_id: string;
  source_type: string;
  target_type: string;
  edge_type: string;
  metadata: Record<string, any>;
  weight: number;
  created_at: Date;
}

export interface Encounter {
  id: string;
  node_id: string;
  node_type: string;
  signal_type: string;
  signal_strength: number;
  source_type: string;
  source_id: string | null;
  source_title: string | null;
  context_snippet: string | null;
  updates_recognition: boolean;
  updates_production: boolean;
  updates_register: boolean;
  updates_collocation: boolean;
  created_at: Date;
}

export interface GoalWeights {
  recognition: number;
  production: number;
  register_awareness: number;
  collocational_prec: number;
}

export interface DecayConfig {
  recognition: number;
  production: number;
  register_awareness: number;
  collocational_prec: number;
}

export interface FrontierCandidate {
  unit: LexicalUnit | GrammarConstruction;
  frontierType: 'near' | 'depth' | 'structural' | 'bridge';
  acquisitionProbability: number;
  priorityScore: number;
  rationale: string;
}

export interface FrontierConfig {
  nearWeight: number;
  depthWeight: number;
  structuralWeight: number;
  bridgeWeight: number;
  maxResults: number;
}

export interface PlateauSignal {
  type: 'breadth_stall' | 'depth_stall' | 'field_gap' | 'avoidance_pattern';
  severity: number; // 0-1
  title: string;
  description: string;
  prescription: string;
  metadata?: Record<string, any>;
}

export interface NodeWithDistance {
  node: LexicalUnit | GrammarConstruction | Character;
  distance: number;
  edgeType: string;
}
