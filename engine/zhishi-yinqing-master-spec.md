# 知识引擎 (Zhīshì Yǐnqíng) — Master Technical Specification

## The Knowledge Engine for Chinese Language Acquisition

A persistent, evolving model of an individual learner's Chinese language knowledge, stored as a weighted multi-dimensional graph. The engine powers all downstream decisions: content selection, gap analysis, plateau detection, and spaced reinforcement scheduling. It is the foundation layer beneath the benji.codes tool suite.

**Target learner profile:** Intermediate to advanced. Receptive-primary (reading + listening), with production tracking for future activation.

**Stack:** Next.js · Neon Postgres (durable store) · In-memory TypeScript graph (computation) · Anthropic API (LLM layer)

**Architecture:** Hybrid — deterministic graph engine for all state management, scoring, and algorithmic decisions. LLM layer bookends the engine as interpreter (input) and generator/reviewer (output).

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Knowledge Graph — Data Model](#2-knowledge-graph--data-model)
3. [Confidence Scoring Model](#3-confidence-scoring-model)
4. [Frontier Detection Algorithm](#4-frontier-detection-algorithm)
5. [Content Pipeline](#5-content-pipeline)
6. [Bootstrapping & Calibration](#6-bootstrapping--calibration)
7. [Ongoing Feedback Loop](#7-ongoing-feedback-loop)
8. [Plateau Detection](#8-plateau-detection)
9. [LLM Integration Layer](#9-llm-integration-layer)
10. [Integration with benji.codes Tools](#10-integration-with-benjicodes-tools)
11. [Open Questions](#11-open-questions)

---

## 1. System Architecture

### 1.1 Hybrid Engine Design

The system uses a deterministic graph engine for all state and computation, with an LLM layer handling interpretation, generation, and review.

**Why hybrid, not pure LLM:**
- Consistency: deterministic algorithms produce reproducible results; LLMs don't
- Cost: graph operations on 50k nodes are free; LLM calls for every confidence update would be prohibitive
- Debuggability: when recommendations go wrong, you can trace algorithmic logic; LLM reasoning is opaque
- State integrity: the graph is a real data structure with transactional guarantees; LLM "memory" is simulated and error-prone over thousands of interactions

**Why hybrid, not pure deterministic:**
- Language is messy; some tasks (interpreting free-text responses, generating natural conversation, enriching word relationships) require intelligence the algorithms can't provide
- The LLM catches what the algorithm misses: pedagogical judgment, variety, adaptation to frustration or motivation

### 1.2 Data Flow

```
┌────────────────────────────────────────────────────┐
│                   USER INTERACTION                  │
│    (conversation, annotation, content consumption)  │
└──────────────────────┬─────────────────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   LLM LAYER     │
              │   (input side)  │
              │                 │
              │  • Interprets   │  ← "what did the user's response mean?"
              │    user input   │
              │  • Extracts     │  ← "which nodes did they demonstrate?"
              │    signals      │
              └────────┬────────┘
                       │ structured signals
                       ▼
              ┌─────────────────┐
              │  GRAPH ENGINE   │
              │  (deterministic)│
              │                 │
              │  • Updates      │
              │    confidence   │
              │  • Computes     │
              │    frontier     │
              │  • Matches      │
              │    content      │
              │  • Detects      │
              │    plateaus     │
              └────────┬────────┘
                       │ recommendations + state
                       ▼
              ┌─────────────────┐
              │   LLM LAYER     │
              │   (output side) │
              │                 │
              │  • Reviews      │  ← "does this recommendation make sense?"
              │    engine output │
              │  • Generates    │  ← "craft the next question/passage"
              │    user-facing  │
              │    content      │
              │  • Provides     │  ← "here's why we're focusing on X"
              │    explanations │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  USER SEES:     │
              │  next content,  │
              │  conversation,  │
              │  recommendations│
              └─────────────────┘
```

### 1.3 Storage Architecture

**Postgres (Neon)** — durable store, source of truth for all graph data, content corpus, encounter logs.

**In-memory TypeScript graph** — hydrated from Postgres on demand. At 50k nodes + 200k edges (~20-30MB), hydration takes milliseconds. All graph algorithms (frontier detection, content matching, traversal) run in-memory. Cached between requests, rebuilt on cold starts.

**Why not a graph database:** At this scale (tens of thousands of nodes, not millions), the operational overhead of Neo4j/etc. isn't justified. Postgres handles persistence; the in-memory graph handles computation. If the system ever needs to scale to millions of nodes, the in-memory layer is exactly what you'd swap for a graph DB — clean migration path.

---

## 2. Knowledge Graph — Data Model

### 2.1 Node Types

#### LexicalUnit (Primary Node)

Represents words, collocations, fixed expressions, and chengyu.

```sql
CREATE TABLE lexical_units (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  surface_form    TEXT NOT NULL,          -- e.g. "居然"
  pinyin          TEXT,                    -- "jūrán"
  primary_gloss   TEXT,                    -- brief English meaning
  unit_type       TEXT NOT NULL,           -- 'word' | 'collocation' | 'fixed_expression' | 'chengyu'

  -- Multi-dimensional confidence vector
  recognition         FLOAT DEFAULT 0.0,  -- can I understand this in context?
  production          FLOAT DEFAULT 0.0,  -- can I actively use this?
  register_awareness  FLOAT DEFAULT 0.0,  -- do I know when/where it's appropriate?
  collocational_prec  FLOAT DEFAULT 0.0,  -- do I know what it naturally pairs with?

  -- Per-dimension uncertainty (0-1, high = uncertain about the confidence score)
  -- Critical for frontier prioritization and micro-probe targeting
  recognition_uncertainty     FLOAT DEFAULT 1.0,  -- starts maximally uncertain
  production_uncertainty      FLOAT DEFAULT 1.0,
  register_uncertainty        FLOAT DEFAULT 1.0,
  collocational_uncertainty   FLOAT DEFAULT 1.0,

  -- Learning state: distinguishes "never seen" from "learned and forgot"
  -- These require fundamentally different pedagogical strategies
  learning_state      TEXT DEFAULT 'new',  -- 'new' | 'acquired' | 'decaying' | 'forgotten'

  -- Decay tracking
  last_reinforced_recognition  TIMESTAMPTZ,
  last_reinforced_production   TIMESTAMPTZ,
  peak_recognition    FLOAT DEFAULT 0.0,  -- historical max (for forgotten detection)
  peak_production     FLOAT DEFAULT 0.0,

  -- Metadata
  frequency_rank      INT,                -- corpus frequency rank (SUBTLEX-CH or similar)
  registers           TEXT[],             -- ['formal','informal','written','spoken','literary','slang','neutral']
  complexity_tier     INT,                -- 1-6, more granular than HSK
  component_chars     TEXT[],             -- ['居','然'] — links to character sub-nodes

  -- Aggregates (computed, cached)
  context_breadth     INT DEFAULT 0,      -- count of unique source contexts
  encounter_count     INT DEFAULT 0,

  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_lexical_surface ON lexical_units(surface_form);
CREATE INDEX idx_lexical_recognition ON lexical_units(recognition);
CREATE INDEX idx_lexical_frequency ON lexical_units(frequency_rank);
```

**Why multi-dimensional confidence:** A single "known/unknown" score is too crude. You can recognize 居然 in context (recognition: 0.8) but never use it in your own speech (production: 0.1), not know it's informal (register_awareness: 0.3), and not know what verbs it naturally precedes (collocational_precision: 0.2). Each dimension decays independently and is reinforced by different types of encounters.

**Why uncertainty as a first-class concept:** A node at recognition 0.7 derived from 50 diverse encounters is fundamentally different from one at 0.7 derived from a single LLM inference during calibration. Uncertainty tracks *confidence in the confidence*. High-uncertainty nodes are prime targets for micro-probes (maximum information gain per question). Without uncertainty, the system can't distinguish "I'm pretty sure you know this" from "I'm guessing you know this" — leading to false confidence plateaus and wasted probes.

**Why learning state matters:** A node at recognition 0.1 that was *never learned* is different from one that peaked at 0.8 three months ago and decayed. Forgotten items have existing neural pathways — they reactivate faster and benefit from richer, varied contexts. New items need simpler contexts for initial acquisition. The `peak_recognition` / `peak_production` fields enable automatic state transitions:
- `new` → `acquired`: when recognition crosses 0.6
- `acquired` → `decaying`: when recognition drops below peak by > 0.2
- `decaying` → `forgotten`: when recognition drops below 0.3 after having been acquired

#### GrammarConstruction

Structural patterns tracked independently from vocabulary.

```sql
CREATE TABLE grammar_constructions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_name        TEXT NOT NULL,       -- e.g. "把 construction", "是...的 focus"
  pattern_template    TEXT,                -- "把 + NP + V + complement"
  description         TEXT,

  -- Confidence (2D for grammar)
  comprehension       FLOAT DEFAULT 0.0,
  production          FLOAT DEFAULT 0.0,

  complexity_tier     INT,
  common_errors       JSONB,              -- known error patterns for this construction

  last_reinforced     TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT now()
);
```

#### Character (Lightweight Sub-Node)

Derived scores computed from parent lexical units. Promotable to full node later if character-level tracking (e.g., handwriting) becomes a goal.

```sql
CREATE TABLE characters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character       CHAR(1) NOT NULL UNIQUE,
  pinyin_readings TEXT[],                  -- multiple readings: ['le','liǎo']
  radical         TEXT,
  stroke_count    INT,

  node_type       TEXT DEFAULT 'derived',  -- 'derived' | 'full'

  -- Derived familiarity (computed, not directly assessed)
  familiarity     FLOAT DEFAULT 0.0,
  known_word_count INT DEFAULT 0,

  updated_at      TIMESTAMPTZ DEFAULT now()
);
```

**Why lightweight:** At intermediate+ level, character recognition isn't the bottleneck. But character familiarity is a powerful *predictive signal* — if you know the component characters of an unknown word, you're much more likely to infer it. The lightweight model gives us this prediction without the maintenance cost of full character-level tracking.

#### SemanticField

Emergent clusters. Not manually defined — computed from node density and co-occurrence.

```sql
CREATE TABLE semantic_fields (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,           -- "emotions", "business", "food/cooking"
  name_zh         TEXT,                    -- "情感", "商务", "饮食"
  description     TEXT,

  -- Computed coverage metrics
  node_count      INT DEFAULT 0,
  avg_recognition FLOAT DEFAULT 0.0,
  avg_production  FLOAT DEFAULT 0.0,
  coverage_pct    FLOAT DEFAULT 0.0,       -- % of common items in this field known

  updated_at      TIMESTAMPTZ DEFAULT now()
);
```

### 2.2 Edge Types

```sql
CREATE TABLE edges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id   UUID NOT NULL,
  target_id   UUID NOT NULL,
  source_type TEXT NOT NULL,     -- 'lexical' | 'grammar' | 'character' | 'field'
  target_type TEXT NOT NULL,
  edge_type   TEXT NOT NULL,
  metadata    JSONB DEFAULT '{}',
  weight      FLOAT DEFAULT 1.0,

  created_at  TIMESTAMPTZ DEFAULT now(),

  UNIQUE(source_id, target_id, edge_type)
);

CREATE INDEX idx_edges_source ON edges(source_id);
CREATE INDEX idx_edges_target ON edges(target_id);
CREATE INDEX idx_edges_type ON edges(edge_type);
```

**Edge type definitions:**

| edge_type | source → target | metadata |
|-----------|----------------|----------|
| `synonym` | lexical → lexical | `{ distinction: "居然 adds speaker disbelief", overlap: 0.7 }` |
| `collocation` | lexical → lexical | `{ strength: 0.9, example: "严重问题", direction: "modifier→head" }` |
| `register_shift` | lexical → lexical | `{ from: "written", to: "spoken" }` e.g. 因此 → 所以 |
| `confused_with` | lexical → lexical | `{ error_pattern: "混淆了/得", frequency: 3 }` |
| `shares_character` | lexical → lexical | `{ character: "学" }` |
| `contains_char` | lexical → character | `{ position: 0 }` |
| `requires_grammar` | lexical → grammar | `{ example: "把门关上" }` |
| `demonstrated_with` | grammar → lexical | `{ context: "我把书放在桌子上" }` |
| `belongs_to_field` | lexical → field | `{ centrality: 0.8 }` |
| `derivation` | lexical → lexical | `{ type: "compound", shared_morpheme: "学" }` |

### 2.3 Encounter Log

Append-only log of every interaction that produces a knowledge signal.

```sql
CREATE TABLE encounters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id         UUID NOT NULL,
  node_type       TEXT NOT NULL,

  signal_type     TEXT NOT NULL,
  signal_strength FLOAT NOT NULL,           -- 0-1

  source_type     TEXT NOT NULL,            -- 'song' | 'show' | 'article' | 'assessment' | 'production' | 'annotation' | 'calibration'
  source_id       TEXT,
  source_title    TEXT,

  context_snippet TEXT,                     -- the sentence/line where this occurred

  -- Which confidence dimension(s) this encounter updates
  updates_recognition  BOOLEAN DEFAULT false,
  updates_production   BOOLEAN DEFAULT false,
  updates_register     BOOLEAN DEFAULT false,
  updates_collocation  BOOLEAN DEFAULT false,

  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_encounters_node ON encounters(node_id);
CREATE INDEX idx_encounters_time ON encounters(created_at DESC);
```

**Signal types:**

| signal_type | meaning | typical source |
|-------------|---------|---------------|
| `recognized_in_context` | correctly understood in native content | annotation tool, calibration |
| `failed_to_recognize` | encountered but didn't know it | annotation tool, assessment |
| `produced_correctly` | used naturally in output | production analysis |
| `produced_incorrectly` | attempted but made an error | production analysis |
| `distinguished_synonym` | correctly identified nuance | synonym tool, assessment |
| `assessment_pass` | answered correctly in probe | active assessment |
| `assessment_fail` | answered incorrectly in probe | active assessment |
| `collocation_correct` | demonstrated correct pairing | production, assessment |
| `collocation_error` | used unnatural pairing | production, assessment |
| `register_appropriate` | used word in right register | production analysis |
| `register_inappropriate` | used word in wrong register | production analysis |

---

## 3. Confidence Scoring Model

### 3.1 Decay Function

Each confidence dimension decays independently at different rates.

```typescript
interface DecayConfig {
  recognition: 0.01,        // slow: ~70 day half-life
  production: 0.05,          // fast: ~14 day half-life
  register_awareness: 0.02,  // medium: ~35 day half-life
  collocational_prec: 0.03,  // medium: ~23 day half-life
}

function effectiveConfidence(
  baseConfidence: number,
  daysSinceReinforced: number,
  lambda: number,
  contextBreadth: number,
  contextThreshold: number = 5
): number {
  const decay = Math.exp(-lambda * daysSinceReinforced);

  // Context breadth bonus: diverse encounters slow decay
  // 5+ unique contexts = maximum bonus
  const breadthBonus = Math.min(
    1.0,
    Math.log(contextBreadth + 1) / Math.log(contextThreshold + 1)
  );

  // Breadth bonus reduces effective decay by up to 50%
  const adjustedDecay = decay + (1 - decay) * breadthBonus * 0.5;

  return baseConfidence * adjustedDecay;
}
```

**Why context-weighted decay:** A word reinforced in three different contexts (song, TV show, article) decays slower than one reinforced three times in the same context. This matches acquisition research — breadth of exposure correlates with depth of acquisition. Traditional SRS ignores this entirely.

### 3.2 Confidence Update Rules

```typescript
function updateConfidence(
  node: LexicalUnit,
  encounter: Encounter
): LexicalUnit {
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

  // Uncertainty reduces with every signal, regardless of direction.
  // Strong signals reduce uncertainty more. Diminishing returns.
  function reduceUncertainty(current: number, signalStrength: number): number {
    return current * (1 - signalStrength * 0.2);
  }

  const isPositive = !encounter.signal_type.includes('fail')
    && !encounter.signal_type.includes('incorrect')
    && !encounter.signal_type.includes('inappropriate');

  if (encounter.updates_recognition) {
    node.recognition = adjust(node.recognition, isPositive);
    node.recognition_uncertainty = reduceUncertainty(
      node.recognition_uncertainty, encounter.signal_strength
    );
    node.last_reinforced_recognition = now;
    node.peak_recognition = Math.max(node.peak_recognition, node.recognition);
  }
  if (encounter.updates_production) {
    node.production = adjust(node.production, isPositive);
    node.production_uncertainty = reduceUncertainty(
      node.production_uncertainty, encounter.signal_strength
    );
    node.last_reinforced_production = now;
    node.peak_production = Math.max(node.peak_production, node.production);
  }
  if (encounter.updates_register) {
    node.register_awareness = adjust(node.register_awareness, isPositive);
    node.register_uncertainty = reduceUncertainty(
      node.register_uncertainty, encounter.signal_strength
    );
  }
  if (encounter.updates_collocation) {
    node.collocational_prec = adjust(node.collocational_prec, isPositive);
    node.collocational_uncertainty = reduceUncertainty(
      node.collocational_uncertainty, encounter.signal_strength
    );
  }

  // Production can never exceed recognition
  node.production = Math.min(node.production, node.recognition);

  // Learning state transitions
  node.learning_state = deriveLearningState(node);

  return node;
}

function deriveLearningState(node: LexicalUnit): string {
  if (node.peak_recognition < 0.6) return 'new';
  if (node.recognition >= 0.5) return 'acquired';
  if (node.recognition >= 0.3) return 'decaying';
  return 'forgotten';  // was acquired (peak >= 0.6) but dropped below 0.3
}
```

### 3.3 Character Familiarity Derivation

```typescript
function deriveCharacterFamiliarity(
  char: Character,
  containingWords: LexicalUnit[]
): number {
  if (containingWords.length === 0) return 0;

  const knownWords = containingWords.filter(w => w.recognition > 0.5);

  // Diminishing returns per additional known word
  const familiarity = 1 - Math.exp(-0.3 * knownWords.length);

  const avgConfidence = knownWords.length > 0
    ? knownWords.reduce((sum, w) => sum + w.recognition, 0) / knownWords.length
    : 0;

  return familiarity * avgConfidence;
}
```

### 3.4 Aggregate Mastery Score

When a single number is needed, weighted by learning goals.

```typescript
// Receptive-primary profile (current)
const RECEPTIVE_WEIGHTS = {
  recognition: 0.50,
  production: 0.10,
  register_awareness: 0.25,
  collocational_prec: 0.15,
};

// Balanced profile (future, when shifting to production)
const BALANCED_WEIGHTS = {
  recognition: 0.30,
  production: 0.30,
  register_awareness: 0.20,
  collocational_prec: 0.20,
};

function masteryScore(node: LexicalUnit, weights: GoalWeights): number {
  return (
    node.recognition * weights.recognition +
    node.production * weights.production +
    node.register_awareness * weights.register_awareness +
    node.collocational_prec * weights.collocational_prec
  );
}
```

---

## 4. Frontier Detection Algorithm

The frontier is the set of nodes and potential nodes where targeted effort yields the highest probability of acquisition. This is the core algorithm that drives content selection and study recommendations.

### 4.1 Four Frontier Types

#### A. Near-Frontier Lexemes (Breadth Expansion)

Words not yet in the graph but maximally primed for acquisition based on graph connectivity.

```typescript
function scoreNearFrontier(
  candidate: PotentialUnit,
  graph: KnowledgeGraph
): FrontierCandidate {

  // 1. Character familiarity — can they decode the characters?
  const charScores = candidate.characters.map(c => graph.getCharFamiliarity(c));
  const charFamiliarity = charScores.reduce((a, b) => a + b, 0) / charScores.length;

  // 2. Synonym proximity — do they know related words?
  const knownSynonyms = graph.getSynonyms(candidate.surface_form)
    .filter(s => s.recognition > 0.5);
  const synonymBonus = Math.min(0.3, knownSynonyms.length * 0.1);

  // 3. Collocational context — do they know common co-occurring words?
  const knownCollocates = graph.getCommonCollocates(candidate.surface_form)
    .filter(c => c.recognition > 0.5);
  const collocateBonus = Math.min(0.2, knownCollocates.length * 0.05);

  // 4. Grammar readiness — do they know required constructions?
  const requiredGrammar = graph.getRequiredConstructions(candidate.surface_form);
  const grammarReadiness = requiredGrammar.length > 0
    ? requiredGrammar.filter(g => g.comprehension > 0.5).length / requiredGrammar.length
    : 1.0;

  // 5. Frequency weighting — more common words get priority
  const frequencyBonus = candidate.frequency_rank
    ? Math.max(0, 0.2 * (1 - candidate.frequency_rank / 10000))
    : 0;

  const acquisitionProb = Math.min(1.0,
    charFamiliarity * 0.3 + synonymBonus + collocateBonus +
    grammarReadiness * 0.2 + frequencyBonus
  );

  return {
    unit: candidate,
    frontierType: 'near',
    acquisitionProbability: acquisitionProb,
    priorityScore: acquisitionProb * (1 + frequencyBonus),
    rationale: buildRationale(charFamiliarity, knownSynonyms, knownCollocates, grammarReadiness)
  };
}
```

#### B. Depth Frontiers (Deepening Existing Knowledge)

Words known at one dimension but lagging on others. **Uncertainty-aware:** high-uncertainty nodes get a priority boost because resolving them has higher information value.

```typescript
function scoreDepthFrontier(
  node: LexicalUnit,
  weights: GoalWeights
): FrontierCandidate | null {

  const dimensions = [
    { name: 'recognition', score: node.recognition, weight: weights.recognition,
      uncertainty: node.recognition_uncertainty },
    { name: 'production', score: node.production, weight: weights.production,
      uncertainty: node.production_uncertainty },
    { name: 'register', score: node.register_awareness, weight: weights.register_awareness,
      uncertainty: node.register_uncertainty },
    { name: 'collocation', score: node.collocational_prec, weight: weights.collocational_prec,
      uncertainty: node.collocational_uncertainty },
  ];

  // Only nodes where at least one dimension > 0.5
  if (Math.max(...dimensions.map(d => d.score)) < 0.5) return null;

  const maxWeightedScore = Math.max(...dimensions.map(d => d.score * d.weight));
  const minWeightedScore = Math.min(...dimensions.map(d => d.score * d.weight));
  const depthGap = maxWeightedScore - minWeightedScore;

  // Uncertainty boost: high-uncertainty nodes are worth probing
  const avgUncertainty = dimensions.reduce((sum, d) => sum + d.uncertainty, 0) / dimensions.length;
  const uncertaintyBoost = 1 + avgUncertainty * 0.5;

  const frequencyMult = node.frequency_rank
    ? Math.max(0.5, 1.5 - node.frequency_rank / 5000)
    : 1.0;

  const weakest = dimensions.reduce((a, b) =>
    (a.score * a.weight) < (b.score * b.weight) ? a : b
  );

  return {
    unit: node,
    frontierType: 'depth',
    acquisitionProbability: 0.7,
    priorityScore: depthGap * frequencyMult * uncertaintyBoost,
    rationale: `Recognition strong (${node.recognition.toFixed(2)}) but ${weakest.name} lags at ${weakest.score.toFixed(2)}.${avgUncertainty > 0.5 ? ' High uncertainty — worth probing.' : ''}`
  };
}
```

#### C. Structural Frontiers (Grammar Gaps)

Grammar constructions where vocabulary is ready but the pattern isn't demonstrated.

```typescript
function scoreStructuralFrontier(
  construction: GrammarConstruction,
  graph: KnowledgeGraph
): FrontierCandidate {

  const demonstratedWith = graph.getEdges(construction.id, 'demonstrated_with');
  const potentialUses = graph.getEdges(construction.id, 'requires_grammar', 'reverse');
  const knownPotential = potentialUses.filter(n => n.recognition > 0.6);

  const vocabReadiness = knownPotential.length >= 3 ? 1.0 : knownPotential.length / 3;

  const demonstrationGap = vocabReadiness > 0.5 && construction.comprehension < 0.4
    ? vocabReadiness - construction.comprehension
    : 0;

  return {
    unit: construction,
    frontierType: 'structural',
    acquisitionProbability: vocabReadiness * 0.6,
    priorityScore: demonstrationGap * construction.complexity_tier,
    rationale: `Knows ${knownPotential.length} words that use this pattern, but comprehension only ${construction.comprehension.toFixed(2)}.`
  };
}
```

#### D. Bridge Nodes (Graph Connectivity)

Words that connect disconnected or weakly-connected graph regions. Disproportionately valuable.

```typescript
function scoreBridgeNode(
  candidate: PotentialUnit,
  graph: KnowledgeGraph
): FrontierCandidate {

  const fields = graph.getFieldsForWord(candidate.surface_form);
  const fieldConnections = fields.map(f => ({
    field: f,
    currentCoverage: graph.getFieldCoverage(f.id),
  }));

  const wellKnown = fieldConnections.filter(fc => fc.currentCoverage > 0.5);
  const sparse = fieldConnections.filter(fc => fc.currentCoverage < 0.2);

  const bridgeValue = (wellKnown.length > 0 && sparse.length > 0)
    ? wellKnown.length * sparse.length * 0.3
    : 0;

  const crossFieldEdges = graph.getCrossFieldEdgeCount(candidate);
  const connectivityBonus = Math.min(0.3, crossFieldEdges * 0.05);

  return {
    unit: candidate,
    frontierType: 'bridge',
    acquisitionProbability: 0.5,
    priorityScore: bridgeValue + connectivityBonus,
    rationale: `Bridges ${wellKnown.map(w => w.field.name).join(', ')} → ${sparse.map(s => s.field.name).join(', ')}`
  };
}
```

### 4.2 Unified Frontier Ranking

```typescript
const DEFAULT_FRONTIER_CONFIG = {
  nearWeight: 0.35,
  depthWeight: 0.30,
  structuralWeight: 0.20,
  bridgeWeight: 0.15,
  maxResults: 50,
};

function computeFrontier(
  graph: KnowledgeGraph,
  contentCorpus: ContentCorpus,
  config = DEFAULT_FRONTIER_CONFIG,
  weights = RECEPTIVE_WEIGHTS
): FrontierCandidate[] {

  const candidates: FrontierCandidate[] = [];

  // A. Near-frontier
  const unknownInCorpus = contentCorpus.getUnknownWords(graph);
  for (const word of unknownInCorpus) {
    const scored = scoreNearFrontier(word, graph);
    if (scored.acquisitionProbability > 0.3) {
      scored.priorityScore *= config.nearWeight;
      candidates.push(scored);
    }
  }

  // B. Depth frontier
  for (const node of graph.getKnownNodes(0.5)) {
    const scored = scoreDepthFrontier(node, weights);
    if (scored && scored.priorityScore > 0.1) {
      scored.priorityScore *= config.depthWeight;
      candidates.push(scored);
    }
  }

  // C. Structural frontier
  for (const construction of graph.getAllConstructions()) {
    const scored = scoreStructuralFrontier(construction, graph);
    if (scored.priorityScore > 0.1) {
      scored.priorityScore *= config.structuralWeight;
      candidates.push(scored);
    }
  }

  // D. Bridge nodes
  for (const word of unknownInCorpus.slice(0, 500)) {
    const scored = scoreBridgeNode(word, graph);
    if (scored.priorityScore > 0.1) {
      scored.priorityScore *= config.bridgeWeight;
      candidates.push(scored);
    }
  }

  return candidates
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, config.maxResults);
}
```

---

## 5. Content Pipeline

### 5.1 Content Sources

| Source | Register | Ingestion Format | Priority |
|--------|----------|-----------------|----------|
| TV/film subtitles | Spoken (varies by genre) | SRT/ASS files | **Primary** — richest conversational data |
| Song lyrics | Poetic/colloquial/figurative | Text (from lyrics DBs or manual) | High — already in benji.codes ecosystem |
| News articles | Written formal | RSS feeds, scraped text | Medium — important for register breadth |
| Podcasts | Spoken semiformal | Transcripts (auto or manual) | Medium — bridges written and spoken |
| Social media | Informal/slang | Scraped text | Low initially — noisy, valuable later |
| LLM-generated | Controlled (any) | Generated on demand | **Calibration only** |

### 5.2 Enrichment Pipeline

```
RAW CONTENT SOURCE
    │
    ▼
┌──────────────────────────┐
│  INGESTION LAYER         │
│                          │
│  Subtitle parser (.srt)  │
│  Lyrics fetcher          │
│  Article scraper (RSS)   │
│  Manual upload           │
│                          │
│  Output: raw text +      │
│  metadata (source, type, │
│  title, episode, etc.)   │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  TOKENIZATION LAYER      │
│                          │
│  1. Word segmentation    │
│     (jieba + custom dict │
│      augmented by graph) │
│  2. POS tagging          │
│  3. Pinyin annotation    │
│  4. Frequency ranking    │
│     (SUBTLEX-CH for      │
│      spoken, BCC/LCMC    │
│      for written)        │
│  5. Difficulty profiling │
│                          │
│  Output: tokenized,      │
│  tagged content          │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  LLM ENRICHMENT          │
│  (batch, async)          │
│                          │
│  6. Grammar pattern ID   │
│  7. Semantic field tags   │
│  8. Register analysis    │
│  9. Key phrase extraction │
│                          │
│  Output: fully annotated │
│  content item            │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  CONTENT STORE           │
│  (Postgres)              │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  GRAPH MAPPING           │
│  (per-learner, on demand)│
│                          │
│  Token ↔ Graph overlay   │
│  Comprehension estimate  │
│  Frontier matching       │
│                          │
│  Output: ContentMatch    │
└──────────────────────────┘
```

**Jieba custom dictionary note:** The segmenter configuration evolves as the graph grows. If the graph contains multi-word units like 说实话, the segmenter keeps it as one token. This means segmentation quality improves as the system matures — a feedback loop between the graph and the content pipeline.

### 5.3 Content Difficulty Profile

```typescript
interface ContentDifficulty {
  vocab_level: number;           // weighted avg frequency rank
  vocab_breadth: number;         // unique lemma count
  rare_word_density: number;     // % tokens below frequency rank 5000
  grammar_complexity: number;    // from construction patterns detected
  information_density: number;   // unique concepts per sentence

  overall: number;               // composite
}
```

### 5.4 Content Store Schema

```sql
CREATE TABLE content_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type     TEXT NOT NULL,        -- 'subtitle' | 'lyrics' | 'article' | 'podcast' | 'social' | 'calibration'
  source_ref      TEXT,
  title           TEXT NOT NULL,
  title_zh        TEXT,

  series_name     TEXT,
  episode_number  INT,

  raw_text        TEXT NOT NULL,

  difficulty      JSONB,               -- ContentDifficulty
  semantic_fields TEXT[],
  primary_register TEXT,               -- 'spoken_casual' | 'spoken_formal' | 'written_news' | 'written_literary' | 'mixed'

  enrichment_status TEXT DEFAULT 'raw', -- 'raw' | 'tokenized' | 'enriched' | 'ready'

  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE content_segments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id      UUID REFERENCES content_items(id),
  segment_index   INT NOT NULL,

  raw_text        TEXT NOT NULL,
  speaker         TEXT,
  timestamp_start FLOAT,
  timestamp_end   FLOAT,

  token_count     INT,
  unique_lemmas   INT,
  difficulty      FLOAT,

  UNIQUE(content_id, segment_index)
);

CREATE TABLE content_tokens (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_id      UUID REFERENCES content_segments(id),
  token_index     INT NOT NULL,

  surface         TEXT NOT NULL,
  pinyin          TEXT,
  pos             TEXT,
  lemma           TEXT,
  frequency_rank  INT,

  UNIQUE(segment_id, token_index)
);

CREATE TABLE content_grammar (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id      UUID REFERENCES content_items(id),
  segment_id      UUID REFERENCES content_segments(id),

  pattern_name    TEXT NOT NULL,
  pattern_match   TEXT,
  construction_id UUID,

  UNIQUE(segment_id, pattern_name, pattern_match)
);

-- Per-learner overlay (computed on demand, cached, invalidated when graph updates)
CREATE TABLE content_learner_overlay (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id          UUID REFERENCES content_items(id),
  learner_id          UUID NOT NULL,

  comprehension_pct   FLOAT,
  frontier_density    FLOAT,
  frontier_items      JSONB,
  reinforcement_items JSONB,
  match_score         FLOAT,

  computed_at         TIMESTAMPTZ DEFAULT now(),
  stale               BOOLEAN DEFAULT false
);

CREATE INDEX idx_overlay_learner ON content_learner_overlay(learner_id);
CREATE INDEX idx_overlay_score ON content_learner_overlay(match_score DESC);
```

### 5.5 Content Matching Algorithm

```typescript
function matchContent(
  frontier: FrontierCandidate[],
  graph: KnowledgeGraph,
  contentCorpus: ContentCorpus,
  preferences: UserPreferences,
  targetComprehension: number = 0.90  // the "i" in i+1
): ContentMatch[] {

  const frontierSurfaces = new Set(
    frontier.map(f => f.unit.surface_form || f.unit.pattern_name)
  );

  return contentCorpus.items
    .map(content => {
      const tokens = content.getTokens();
      const knownCount = tokens.filter(t => graph.isKnown(t, 0.5)).length;
      const comprehensionPct = knownCount / tokens.length;

      const frontierHits = frontier.filter(f =>
        content.contains(f.unit.surface_form || f.unit.pattern_name)
      );

      // Dispersion: how evenly are frontier items spread through content?
      // Clustered unknowns in one sentence = overwhelming; spread out = ideal.
      const dispersionScore = computeDispersion(frontierHits, tokens);

      // Learning state matching: forgotten items need richer/varied context,
      // new items need simpler context around the unknown word.
      const stateMatchScore = computeStateMatch(frontierHits, content, graph);

      // Preference alignment: does this match what the user actually wants to consume?
      const preferenceScore = computePreferenceMatch(content, preferences);

      const comprehensionFit = 1 - Math.abs(comprehensionPct - targetComprehension) * 5;
      const frontierDensity = frontierHits.length / (tokens.length / 100);

      return {
        content,
        comprehensionPct,
        frontierItems: frontierHits,
        frontierDensity,
        dispersionScore,
        score: Math.max(0, comprehensionFit) * 0.40 +
               Math.min(1, frontierDensity) * 0.25 +
               dispersionScore * 0.15 +
               preferenceScore * 0.20
      };
    })
    .filter(m => m.comprehensionPct >= 0.80 && m.frontierItems.length > 0)
    .sort((a, b) => b.score - a.score);
}

// Dispersion: 1.0 = perfectly spread, 0.0 = all clustered in one spot
function computeDispersion(
  hits: FrontierCandidate[],
  tokens: Token[]
): number {
  if (hits.length <= 1) return 1.0;

  const positions = hits
    .map(h => tokens.findIndex(t => t.surface === (h.unit.surface_form || '')))
    .filter(p => p >= 0)
    .sort((a, b) => a - b);

  if (positions.length <= 1) return 1.0;

  // Ideal spacing = total length / number of hits
  const idealGap = tokens.length / positions.length;
  const actualGaps = positions.slice(1).map((p, i) => p - positions[i]);
  const avgDeviation = actualGaps.reduce((sum, gap) =>
    sum + Math.abs(gap - idealGap), 0
  ) / actualGaps.length;

  // Normalize: 0 deviation = 1.0, deviation >= idealGap = 0.0
  return Math.max(0, 1 - avgDeviation / idealGap);
}

// State match: forgotten items benefit from novel/rich context,
// new items benefit from simpler surrounding context
function computeStateMatch(
  hits: FrontierCandidate[],
  content: ContentItem,
  graph: KnowledgeGraph
): number {
  if (hits.length === 0) return 0.5;

  let score = 0;
  for (const hit of hits) {
    const node = graph.findBySurface(hit.unit.surface_form);
    const state = node?.learning_state || 'new';

    if (state === 'forgotten') {
      // Forgotten items: reward diverse context (different from previous encounters)
      const prevContexts = graph.getEncounterContextTypes(node.id);
      const isNovelContext = !prevContexts.includes(content.source_type);
      score += isNovelContext ? 1.0 : 0.5;
    } else {
      // New items: reward simpler surrounding context
      score += content.difficulty.overall < 0.6 ? 0.8 : 0.5;
    }
  }
  return score / hits.length;
}
```

**User preferences model** — the system lives or dies on "do I actually want to consume this content":

```typescript
interface UserPreferences {
  genre_affinity: Record<string, number>;     // e.g. { "都市剧": 0.9, "历史剧": 0.4, "综艺": 0.7 }
  difficulty_tolerance: number;                // 0-1: how comfortable with being lost
  session_length_preference: 'short' | 'medium' | 'long';
  content_type_preference: string[];           // ['subtitle', 'lyrics', 'article'] ordered
  boredom_threshold: number;                   // how many times same genre before switching
}

function computePreferenceMatch(
  content: ContentItem,
  prefs: UserPreferences
): number {
  const genreScore = prefs.genre_affinity[content.genre] ?? 0.5;
  const typeScore = prefs.content_type_preference.includes(content.source_type)
    ? 1.0 - (prefs.content_type_preference.indexOf(content.source_type) * 0.2)
    : 0.3;
  return genreScore * 0.6 + typeScore * 0.4;
}
```

**Target: 90% comprehension.** Below ~85%, too much guessing for natural acquisition. Above ~95%, nothing new to acquire. 90% is the sweet spot where unknown items are inferable from context. The graph makes this calculable per-piece-of-content — something no existing tool does.

---

## 6. Bootstrapping & Calibration

### 6.1 The Cold Start Problem

The graph must be reasonably accurate before it's useful, but accuracy comes from extended use which requires usefulness. Solution: a three-phase bootstrap where each phase feeds the next.

### 6.2 Phase 1: Rapid Calibration (~20-30 minutes)

An adaptive conversational assessment that maps the *shape* of the learner's frontier without feeling like a test.

**Onboarding (30 seconds):**
- "How long have you been studying Chinese?"
- "What do you mostly consume?" (shows, music, news, etc.)
- "How would you describe your reading comfort?" (three vibe-based options, not levels)

**Calibration conversations (5-6 passages, ~20-25 min):**

The system presents real-feeling passages (LLM-generated at controlled difficulty levels) and engages in conversation about them. The conversation IS the test.

```
System shows passage → asks "What's going on here?" →
  analyzes response for demonstrated/missed nodes →
    asks targeted follow-ups probing uncertain areas →
      updates uncertainty map →
        selects next passage to maximize information gain
```

**Why LLM-generated for calibration:**
- Precise difficulty control (target exact frequency bands)
- Can include specific probe words the adaptive algorithm needs to test
- Avoids copyright/sourcing issues during the most controlled phase
- Real content used for everything after calibration

**Passage generation spec:**

```typescript
interface CalibrationPassageRequest {
  target_frequency_band: [number, number];
  semantic_field: string;
  register: string;
  length_sentences: number;          // 3-5
  must_include: string[];            // targeted probe words
  must_exclude: string[];            // already tested
  target_constructions: string[];    // grammar patterns to include
}
```

Pre-generate a bank of 50-100 passages across difficulty levels and semantic fields. The adaptive algorithm selects from this bank during calibration (real-time generation would be too slow).

**Signal extraction from conversation:**

```typescript
interface NodeSignal {
  surface_form: string;
  signal: 'demonstrated' | 'missed' | 'partial' | 'ambiguous';
  confidence_in_signal: number;  // how certain is this inference?
  evidence: string;              // what in the response indicates this?
  dimension: 'recognition' | 'production' | 'register' | 'collocation';
}
```

The LLM analyzes each user response and extracts structured signals. Conservative by design: ambiguous cases stay ambiguous rather than being guessed.

**Conversational probes (varied, natural-feeling):**
- "What's the main point here?"
- "There's an interesting word choice in line 2 — did you catch why they used X instead of Y?"
- "How would you describe the tone? Formal? Casual?"
- "Which parts were crystal clear vs. which did you have to guess?"
- "Quick tangent — 把 shows up a lot here. Comfortable with how it works, or still slippery?"

**Adaptive item selection:** Information-theoretic — each passage chosen to maximally reduce global uncertainty across frequency bands and semantic fields. After passage 1, binary search on difficulty. After passage 2-3, fan out across semantic fields. After passage 4-6, target specific gaps.

**Output:** Initial graph with ~200-400 nodes at rough confidence levels. Enough to start content matching and begin the refinement loop.

**Graph reveal:** After calibration, show the user their knowledge landscape. Visualization of the graph — nodes colored by confidence, sized by frequency, clustered by semantic field. Frontier glowing at the edges. This is the buy-in moment: if it looks right, the user trusts the system.

### 6.3 Phase 2: Consumption-Based Refinement (Week 1+, passive)

The annotation tool becomes the primary signal source. Every interaction generates encounters:

- Words not tapped for annotation → probably known (**very weak** positive signal)
- Words tapped → probably unknown (strong negative signal)
- Annotations read and dismissed → partial knowledge
- Annotations studied → genuinely new

**Passive signal asymmetry — critical design principle:**

Passive signals (especially "didn't tap") must be extremely weak. Users skip unknown words constantly, especially in flow-state content like music and shows. The system must trust errors far more than silence.

```typescript
// Signal strength for passive annotation signals
const PASSIVE_SIGNAL_STRENGTHS = {
  didnt_tap:           0.02,   // barely moves the needle — silence is weak evidence
  tapped:              0.25,   // significantly stronger — active behavior is more reliable
  annotation_dismissed: 0.08,  // small positive — they knew enough to dismiss quickly
  annotation_studied:   0.30,  // strong negative on recognition (genuinely new to them)
};
```

The asymmetry is deliberate: a single "tapped" signal outweighs ~12 "didn't tap" signals. This prevents the common failure mode of the system assuming knowledge just because the user was reading quickly.

**Bayesian update model with corrected priors:**

```
P(known | didn't_tap) = P(didn't_tap | known) × P(known) / P(didn't_tap)

Where:
  P(didn't_tap | known) ≈ 0.95  — if you know it, you almost certainly don't tap
  P(didn't_tap | unknown) ≈ 0.6  — users skip unknown words often (NOT 0.3)
```

With the corrected `P(didn't_tap | unknown)`, the posterior update from a "didn't tap" observation is much smaller — the system needs many more observations before it becomes confident.

### 6.4 Phase 3: Active Micro-Probes (Week 2+, low-friction)

Targeted probes woven into the natural flow. Never feels like a quiz.

- **Inter-content probes**: Between songs/episodes, one contextual question about an uncertain node. Two seconds, then move on.
- **Confirm/deny nudges**: "You saw 居然 three times this week. Quick: difference between 居然 and 竟然?"
- **Reverse context**: Show a new sentence containing a "known" word. "What's happening here?"

Budget: 2-3 per session, always optional. The system selects probes to **maximize entropy reduction** — targeting nodes where uncertainty is highest relative to their importance (frequency × goal weight). This is information-theoretically optimal: each probe resolves the most ambiguity per question asked.

```typescript
function selectProbeTargets(graph: KnowledgeGraph, maxProbes: number = 3): LexicalUnit[] {
  return graph.getKnownNodes(0.2)  // anything above noise floor
    .map(node => ({
      node,
      // Information value = uncertainty × importance
      infoValue: (
        node.recognition_uncertainty * RECEPTIVE_WEIGHTS.recognition +
        node.register_uncertainty * RECEPTIVE_WEIGHTS.register_awareness +
        node.collocational_uncertainty * RECEPTIVE_WEIGHTS.collocational_prec
      ) * (node.frequency_rank ? Math.max(0.3, 1.5 - node.frequency_rank / 5000) : 1.0)
    }))
    .sort((a, b) => b.infoValue - a.infoValue)
    .slice(0, maxProbes)
    .map(x => x.node);
}
```

### 6.5 Calibration → Steady State Transition

No hard boundary. The system is initially very curious (many probes, aggressive content selection) and gradually quiets as confidence increases. The calibration "mode" fades into normal operation seamlessly.

---

## 7. Ongoing Feedback Loop

### 7.1 Signal Sources

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SIGNAL SOURCES                               │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Annotation   │  │   Content    │  │    Micro-    │              │
│  │  Tool (tap/   │  │  Selection   │  │   Probes     │              │
│  │  no-tap)      │  │  (what you   │  │  (targeted   │              │
│  │               │  │   consume)   │  │   questions)  │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                  │                       │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐              │
│  │  Synonym     │  │  Production  │  │   External   │              │
│  │  Clusters    │  │  Analysis    │  │   (browser   │              │
│  │  (distinguish│  │  (writing/   │  │   extension, │              │
│  │   pairs)     │  │   speaking)  │  │   imports)   │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                  │                       │
└─────────┴─────────────────┴──────────────────┴──────────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  ENCOUNTER LOG  │
                   │  (append-only)  │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  GRAPH UPDATE   │
                   │  confidence     │
                   │  recalculation  │
                   └────────┬────────┘
                            │
                    ┌───────┴────────┐
                    ▼                ▼
           ┌──────────────┐  ┌──────────────┐
           │   FRONTIER   │  │   PLATEAU    │
           │  DETECTION   │  │  DETECTION   │
           └──────┬───────┘  └──────┬───────┘
                  │                  │
                  ▼                  ▼
           ┌──────────────┐  ┌──────────────┐
           │   CONTENT    │  │ INTERVENTION │
           │   MATCHING   │  │ PRESCRIPTION │
           └──────┬───────┘  └──────┬───────┘
                  │                  │
                  └──────┬───────────┘
                         ▼
                USER CONSUMES CONTENT
                         │
                         └───── back to SIGNAL SOURCES (cycle repeats)
```

### 7.2 Contextual Re-Encounter Scheduling

**Not SRS. Not flashcards.** When a word needs reinforcement, the system finds native content where it appears in a new context.

居然 in a Jay Chou song → next reinforcement in a news headline → then in a TV drama dialogue. Each re-encounter reinforces memory AND deepens contextual understanding — building collocational knowledge and register awareness simultaneously.

**Scheduling considers:**
- Time since last encounter (per-dimension, not global)
- Context diversity (prioritize novel contexts — the breadth bonus is literal)
- Frontier adjacency (pair reinforcement items with frontier items — two birds, one stone)
- **Temporal urgency**: nodes approaching a decay threshold get priority. A node about to cross from `acquired` → `decaying` is more urgent than one stably in `acquired`.
- **Learning state**: forgotten items should be re-encountered in **novel contexts** (the original context didn't stick — try a different angle). New items in **simpler surrounding context** to support initial acquisition.

**Reinforcement queue:** Words needing re-encounter within N days. Used as a secondary filter in content matching. Primary: frontier items. Secondary: reinforcement items. Content that hits both is gold.

---

## 8. Plateau Detection

### 8.1 Stagnation Signals

```typescript
function detectPlateaus(
  graph: KnowledgeGraph,
  encounterHistory: Encounter[],
  windowDays: number = 30
): PlateauSignal[] {
  const signals: PlateauSignal[] = [];
  const cutoff = daysAgo(windowDays);
  const recentEncounters = encounterHistory.filter(e => e.created_at > cutoff);

  // 1. BREADTH STALL
  // Active consumption but few new words acquired
  const newNodes = graph.getNodesCreatedAfter(cutoff).length;
  const rate = recentEncounters.length / windowDays;
  if (rate > 2 && newNodes < 5) {
    signals.push({
      type: 'breadth_stall',
      severity: Math.min(1, 0.3 + (rate - newNodes) * 0.1),
      description: `${rate.toFixed(1)} encounters/day but only ${newNodes} new words in ${windowDays} days.`,
      prescription: 'Increase content difficulty or diversify genres.'
    });
  }

  // 2. DEPTH STALL
  // Recognition high but collocational/register knowledge not improving
  const shallowNodes = graph.getNodes()
    .filter(n => n.recognition > 0.7 && n.collocational_prec < 0.3)
    .filter(n => recentEncounters.filter(e =>
      e.node_id === n.id && e.updates_collocation
    ).length < 2);
  if (shallowNodes.length > 20) {
    signals.push({
      type: 'depth_stall',
      severity: Math.min(1, shallowNodes.length / 50),
      description: `${shallowNodes.length} words with good recognition but weak collocational knowledge.`,
      prescription: 'Focus on collocations. Read content using these words in varied combinations.'
    });
  }

  // 3. FIELD GAP
  // Sparse semantic fields that should be denser at your level
  const sparseFields = graph.getSemanticFields()
    .filter(f => f.coverage_pct < 0.2)
    .filter(f => graph.getExpectedFieldCoverage(f.id, graph.estimateLevel()) > 0.4);
  for (const field of sparseFields) {
    signals.push({
      type: 'field_gap',
      severity: 0.5,
      description: `Weak coverage in "${field.name}" (${(field.coverage_pct * 100).toFixed(0)}%).`,
      prescription: `Seek out "${field.name}" content: news, podcasts, shows in this domain.`
    });
  }

  // 4. AVOIDANCE PATTERN
  // Grammar understood but never produced
  const avoided = graph.getAllConstructions()
    .filter(c => c.comprehension > 0.5 && c.production < 0.1)
    .filter(c => graph.getEdges(c.id, 'requires_grammar', 'reverse')
      .filter(n => n.recognition > 0.6).length >= 3);
  for (const construction of avoided) {
    signals.push({
      type: 'avoidance_pattern',
      severity: 0.6,
      description: `Understand "${construction.pattern_name}" but never produce it.`,
      prescription: `Targeted production exercises using words you already know.`
    });
  }

  return signals.sort((a, b) => b.severity - a.severity);
}
```

---

## 9. LLM Integration Layer

### 9.1 Role Boundaries

| Role | When Called | Frequency | Cacheable? |
|------|-----------|-----------|------------|
| **Signal extraction** | After each user response during calibration/probes | Per interaction | No |
| **Graph enrichment** | When new node enters graph | Once per node | Yes (permanent) |
| **Content enrichment** | During content pipeline (grammar ID, field tagging) | Once per content item | Yes (permanent) |
| **Passage generation** | Calibration bank, micro-probe questions | Pre-generated bank | Yes |
| **Recommendation review** | Before presenting content recommendations | Per session | No |
| **Plateau narration** | When plateau detected | Per plateau event | No |
| **Conversational generation** | Calibration follow-ups, explanations | Per interaction | No |

### 9.2 Cost Model

Estimated ~10-20 API calls per hour of active use. The expensive calls (enrichment) are one-time and cached. The frequent calls (signal extraction, conversation) are lightweight.

Contrast with LLM-as-engine: every confidence update, frontier computation, and content match would require a full call with 50k+ nodes in context. Prohibitive.

### 9.3 LLM Override Protocol

The LLM reviews engine outputs before they reach the user:

```typescript
interface EngineReviewRequest {
  frontier: FrontierCandidate[];         // top candidates from algorithm
  contentMatches: ContentMatch[];         // top content recommendations
  plateauSignals: PlateauSignal[];        // any detected stagnation
  recentHistory: Encounter[];             // last N encounters for context
  learnerProfile: LearnerProfile;         // goals, preferences, stated frustrations
}

// LLM can:
// - Reorder recommendations (e.g., avoid genre monotony)
// - Flag pedagogical concerns the algorithm missed
// - Adjust tone/approach based on learner state
// - Suggest the algorithm weights need tuning
// LLM cannot:
// - Directly modify graph confidence scores
// - Override the data model
// - Bypass the encounter log
```

### 9.4 "Why This, Now?" — Recommendation Explainability

Every recommendation the system surfaces should be explainable. The graph already contains the data; the LLM translates it into natural language.

```typescript
interface RecommendationExplanation {
  content: ContentMatch;
  frontier_rationale: string[];   // per-frontier-item explanations
  graph_connections: string[];    // what you already know that connects
  learning_prediction: string;    // what this unlocks next
}

// Example output:
// "This clip contains 居然, which connects to 竟然 and 突然 that you already know well.
//  You've seen it in songs but never in spoken dialogue — this fills a register gap.
//  Once 居然 is solid, it unlocks a cluster of surprise/disbelief expressions
//  (没想到, 想不到, 出乎意料) that are all near your frontier."
```

This builds trust and makes the system feel intelligent rather than arbitrary. It also doubles as a learning moment — the explanation itself teaches something about word relationships. The data is already there from frontier scoring rationales; the LLM just narrates it.

---

## 10. Integration with benji.codes Tools

| Tool | Reads from Graph | Writes to Graph |
|------|-----------------|-----------------|
| **Annotation app** (Genius-style) | Skips annotations for known items; focuses on frontier | `recognized_in_context`, `failed_to_recognize` |
| **同义词星图** (Synonym Clusters) | Prioritizes clusters around frontier zones | `distinguished_synonym` |
| **歌词接龙** (Lyric Chain) | Filters chains to frontier-relevant vocabulary | Recognition encounters |
| **RiddleYu** (成语 puzzles) | Weights daily puzzles toward learnable chengyu | Assessment signals |
| **Content recommender** (future) | Full frontier detection + content matching | All consumption encounters |
| **Browser extension** (future) | Highlights unknown words calibrated to graph | Web browsing encounters |
| **Production analyzer** (future) | N/A | Production signals |

### 10.1 Integration Protocol

Every benji.codes tool communicates with the engine via a shared API:

```typescript
// Reading from the graph
engine.isKnown(surfaceForm: string): boolean
engine.getConfidence(surfaceForm: string): ConfidenceVector
engine.getFrontier(config?: FrontierConfig): FrontierCandidate[]
engine.matchContent(content: ContentItem): ContentGraphOverlay

// Writing to the graph
engine.logEncounter(encounter: Encounter): void
engine.addNode(unit: LexicalUnit): void
engine.addEdge(edge: Edge): void
```

---

## 11. Open Questions

### Technical
- **Jieba alternatives**: Are there better segmenters for intermediate+ content? (e.g., pkuseg, stanza)
- **Frequency corpus selection**: SUBTLEX-CH for spoken, but what's the best written frequency list?
- **Graph visualization**: What library/approach for the knowledge landscape view? (D3 force-directed? Custom WebGL?)
- **Offline capability**: Should the graph be queryable offline (IndexedDB mirror)?
- **Edge pruning strategy**: At what edge density should pruning kick in? Decay low-weight unreinforced edges, or cap per-node-per-type?

### Pedagogical
- **Decay parameter tuning**: The λ values are educated guesses. How to validate them against actual forgetting data?
- **Optimal i+1 threshold**: Is 90% comprehension actually the right target? Should it adapt based on `difficulty_tolerance` in user preferences?
- **Production activation**: When the learner shifts to production goals, what's the transition protocol?
- **Error correction**: When the graph is wrong (user flags "I actually know/don't know this"), how aggressively to correct?
- **Uncertainty calibration**: How to validate that uncertainty scores actually correlate with prediction error? Need a feedback mechanism.
- **Forgotten item strategy**: What's the optimal re-encounter context for forgotten items? How much novelty vs. similarity to original acquisition context?

### Scale
- **Multi-user**: Per-user in-memory graphs. At what user count does this need a different architecture?
- **Content corpus growth**: At what corpus size does content matching need indexing/caching beyond naive scan?
- **LLM cost at scale**: If many users, batch enrichment calls? Fine-tune a smaller model for signal extraction?

### Resolved (from external review)
- ✅ Uncertainty as first-class concept → added per-dimension uncertainty, entropy-based probe selection
- ✅ Passive signal asymmetry → corrected to extreme asymmetry (0.02 vs 0.25)
- ✅ Content dispersion scoring → added to content matching
- ✅ Learning state (new vs. forgotten) → added learning_state enum with automatic transitions
- ✅ User preference model → added to content matching scoring
- ✅ Recommendation explainability ("Why this, now?") → added to LLM layer
- ✅ Semantic fields → start predefined (seeded), refine with embeddings later
- ⏳ Temporal urgency in frontier → partially addressed via decay; full urgency multiplier deferred
- ⏳ Production sub-dimensions (accuracy, latency, complexity) → noted for future expansion
- ⏳ Edge pruning → noted for future optimization

---

## Appendix: In-Memory Graph Engine Class

```typescript
class KnowledgeGraph {
  private nodes: Map<string, LexicalUnit | GrammarConstruction | Character>;
  private edges: Map<string, Edge[]>;       // source_id → edges
  private reverseEdges: Map<string, Edge[]>; // target_id → edges
  private fieldIndex: Map<string, SemanticField>;

  static async load(db: NeonClient): Promise<KnowledgeGraph> {
    const graph = new KnowledgeGraph();

    const lexical = await db.query('SELECT * FROM lexical_units');
    const grammar = await db.query('SELECT * FROM grammar_constructions');
    const chars = await db.query('SELECT * FROM characters');
    const fields = await db.query('SELECT * FROM semantic_fields');

    for (const row of [...lexical.rows, ...grammar.rows, ...chars.rows]) {
      graph.nodes.set(row.id, row);
    }
    for (const row of fields.rows) {
      graph.fieldIndex.set(row.id, row);
    }

    const edges = await db.query('SELECT * FROM edges');
    for (const edge of edges.rows) {
      if (!graph.edges.has(edge.source_id)) graph.edges.set(edge.source_id, []);
      graph.edges.get(edge.source_id)!.push(edge);

      if (!graph.reverseEdges.has(edge.target_id)) graph.reverseEdges.set(edge.target_id, []);
      graph.reverseEdges.get(edge.target_id)!.push(edge);
    }

    return graph;
  }

  getNeighbors(nodeId: string, edgeType?: string, maxHops: number = 1): NodeWithDistance[] {
    const visited = new Set<string>();
    const queue: { id: string; distance: number }[] = [{ id: nodeId, distance: 0 }];
    const results: NodeWithDistance[] = [];

    while (queue.length > 0) {
      const { id, distance } = queue.shift()!;
      if (visited.has(id) || distance > maxHops) continue;
      visited.add(id);

      if (distance > 0) {
        results.push({ node: this.nodes.get(id)!, distance });
      }

      const outEdges = (this.edges.get(id) || [])
        .filter(e => !edgeType || e.edge_type === edgeType);
      for (const edge of outEdges) {
        queue.push({ id: edge.target_id, distance: distance + 1 });
      }
    }

    return results;
  }

  isKnown(surfaceForm: string, threshold: number = 0.5): boolean {
    const node = this.findBySurface(surfaceForm);
    return node !== null && (node as LexicalUnit).recognition >= threshold;
  }

  getKnownNodes(threshold: number = 0.5): LexicalUnit[] {
    return [...this.nodes.values()]
      .filter((n): n is LexicalUnit => 'recognition' in n && n.recognition >= threshold);
  }

  getCharFamiliarity(char: string): number {
    const charNode = [...this.nodes.values()]
      .find((n): n is Character => 'character' in n && n.character === char);
    return charNode?.familiarity ?? 0;
  }

  async flush(db: NeonClient): Promise<void> {
    // Batch update modified nodes — track dirty set, batch UPDATEs
  }
}
```
