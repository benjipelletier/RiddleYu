-- 知识引擎 (Knowledge Engine) Database Schema
-- Source: zhishi-yinqing-master-spec.md Section 2

-- Semantic Fields (predefined clusters)
CREATE TABLE IF NOT EXISTS semantic_fields (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  name_zh         TEXT,
  description     TEXT,
  node_count      INT DEFAULT 0,
  avg_recognition FLOAT DEFAULT 0.0,
  avg_production  FLOAT DEFAULT 0.0,
  coverage_pct    FLOAT DEFAULT 0.0,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Lexical Units (primary knowledge nodes)
CREATE TABLE IF NOT EXISTS lexical_units (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  surface_form    TEXT NOT NULL,
  pinyin          TEXT,
  primary_gloss   TEXT,
  unit_type       TEXT NOT NULL,

  recognition         FLOAT DEFAULT 0.0,
  production          FLOAT DEFAULT 0.0,
  register_awareness  FLOAT DEFAULT 0.0,
  collocational_prec  FLOAT DEFAULT 0.0,

  recognition_uncertainty     FLOAT DEFAULT 1.0,
  production_uncertainty      FLOAT DEFAULT 1.0,
  register_uncertainty        FLOAT DEFAULT 1.0,
  collocational_uncertainty   FLOAT DEFAULT 1.0,

  learning_state      TEXT DEFAULT 'new',

  last_reinforced_recognition  TIMESTAMPTZ,
  last_reinforced_production   TIMESTAMPTZ,
  peak_recognition    FLOAT DEFAULT 0.0,
  peak_production     FLOAT DEFAULT 0.0,

  frequency_rank      INT,
  registers           TEXT[],
  complexity_tier     INT,
  component_chars     TEXT[],

  context_breadth     INT DEFAULT 0,
  encounter_count     INT DEFAULT 0,

  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lexical_surface ON lexical_units(surface_form);
CREATE INDEX IF NOT EXISTS idx_lexical_recognition ON lexical_units(recognition);
CREATE INDEX IF NOT EXISTS idx_lexical_frequency ON lexical_units(frequency_rank);

-- Grammar Constructions
CREATE TABLE IF NOT EXISTS grammar_constructions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_name        TEXT NOT NULL,
  pattern_template    TEXT,
  description         TEXT,
  comprehension       FLOAT DEFAULT 0.0,
  production          FLOAT DEFAULT 0.0,
  complexity_tier     INT,
  common_errors       JSONB,
  last_reinforced     TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT now()
);

-- Characters (lightweight derived sub-nodes)
CREATE TABLE IF NOT EXISTS characters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character       CHAR(1) NOT NULL UNIQUE,
  pinyin_readings TEXT[],
  radical         TEXT,
  stroke_count    INT,
  node_type       TEXT DEFAULT 'derived',
  familiarity     FLOAT DEFAULT 0.0,
  known_word_count INT DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Edges (typed relationships between all node types)
CREATE TABLE IF NOT EXISTS edges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id   UUID NOT NULL,
  target_id   UUID NOT NULL,
  source_type TEXT NOT NULL,
  target_type TEXT NOT NULL,
  edge_type   TEXT NOT NULL,
  metadata    JSONB DEFAULT '{}',
  weight      FLOAT DEFAULT 1.0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(source_id, target_id, edge_type)
);

CREATE INDEX IF NOT EXISTS idx_edges_source ON edges(source_id);
CREATE INDEX IF NOT EXISTS idx_edges_target ON edges(target_id);
CREATE INDEX IF NOT EXISTS idx_edges_type ON edges(edge_type);

-- Encounters (append-only signal log)
CREATE TABLE IF NOT EXISTS encounters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id         UUID NOT NULL,
  node_type       TEXT NOT NULL,
  signal_type     TEXT NOT NULL,
  signal_strength FLOAT NOT NULL,
  source_type     TEXT NOT NULL,
  source_id       TEXT,
  source_title    TEXT,
  context_snippet TEXT,
  updates_recognition  BOOLEAN DEFAULT false,
  updates_production   BOOLEAN DEFAULT false,
  updates_register     BOOLEAN DEFAULT false,
  updates_collocation  BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_encounters_node ON encounters(node_id);
CREATE INDEX IF NOT EXISTS idx_encounters_time ON encounters(created_at DESC);

-- Content Pipeline Tables
CREATE TABLE IF NOT EXISTS content_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type     TEXT NOT NULL,
  source_ref      TEXT,
  title           TEXT NOT NULL,
  title_zh        TEXT,
  series_name     TEXT,
  episode_number  INT,
  raw_text        TEXT NOT NULL,
  difficulty      JSONB,
  semantic_fields TEXT[],
  primary_register TEXT,
  enrichment_status TEXT DEFAULT 'raw',
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_segments (
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

CREATE TABLE IF NOT EXISTS content_tokens (
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

CREATE TABLE IF NOT EXISTS content_grammar (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id      UUID REFERENCES content_items(id),
  segment_id      UUID REFERENCES content_segments(id),
  pattern_name    TEXT NOT NULL,
  pattern_match   TEXT,
  construction_id UUID,
  UNIQUE(segment_id, pattern_name, pattern_match)
);

CREATE TABLE IF NOT EXISTS content_learner_overlay (
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

CREATE INDEX IF NOT EXISTS idx_overlay_learner ON content_learner_overlay(learner_id);
CREATE INDEX IF NOT EXISTS idx_overlay_score ON content_learner_overlay(match_score DESC);
