// ─── Content Map (Pass 1 Output) ────────────────────────────────────────────

export interface VocabularyThread {
  word: string;
  appears_in_lines: number[];
  evolution: string;
}

export interface Speaker {
  id: string;
  description: string;
}

export interface ContentMap {
  summary: string;
  motifs: string[];
  structural_patterns: string[];
  register_profile: string;
  speakers: Speaker[];
  cultural_references: string[];
  language_variant: 'simplified' | 'traditional';
  key_vocabulary_threads: VocabularyThread[];
}

// ─── Line Annotation (Pass 2 Output) ────────────────────────────────────────

export interface WordAnnotation {
  chars: string;
  pinyin?: string;
  has_pinyin_gotcha: boolean;
  note: string;
  is_pattern_key: boolean;
  difficulty: string;
}

export interface GrammarUnlock {
  pattern: string;
  explanation: string;
  examples: string[];
}

export interface CrossReference {
  target_line: number;
  note: string;
}

export interface LineAnnotation {
  line_index: number;
  chinese: string;
  translation: string;
  insight: string;
  words: WordAnnotation[];
  grammar_unlock: GrammarUnlock | null;
  cross_references: CrossReference[];
  dropped_subject: string | null;
  negation_note: string | null;
}

// ─── API Request/Response ────────────────────────────────────────────────────

export interface ContentMapRequest {
  text: string;
  title?: string;
  artist?: string;
  contentType?: string;
}

export interface ContentMetadata {
  title: string | null;
  artist: string | null;
  contentType: 'song' | 'tv' | 'podcast' | 'other';
  languageVariant: 'simplified' | 'traditional';
}

export interface ContentMapResponse {
  contentHash: string;
  contentMap: ContentMap;
  lines: string[];
  metadata: ContentMetadata;
}

export interface AnnotateLineRequest {
  contentHash: string;
  lineIndex: number;
}

// ─── Database Rows ───────────────────────────────────────────────────────────

export interface ContentRow {
  content_hash: string;
  source_text: string;
  content_map: ContentMap;
  title: string | null;
  artist: string | null;
  content_type: string;
  language_variant: string;
  created_at: string;
}

export interface LineAnnotationRow {
  content_hash: string;
  line_index: number;
  annotation: LineAnnotation;
  version: number;
  created_at: string;
}
