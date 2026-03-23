// ─── YuKuai Core ─────────────────────────────────────────────────────────────

export type YuKuaiType = 'vocab' | 'grammar' | 'expression';

export type Familiarity = 'new' | 'seen' | 'familiar' | 'known';

export interface YuKuai {
  id: string;                    // "vocab:鲸鱼" | "grammar:V来V去" | "expr:春花秋月"
  type: YuKuaiType;
  canonical_form: string;        // "鲸鱼" | "V来V去" | "春花秋月"
  pinyin: string | null;         // from CC-CEDICT, null for grammar/expression
  hsk_level: number | null;      // 1-6 from static lookup, null if not in HSK
  base_definition: string | null; // from CC-CEDICT, null for grammar/expression
}

export interface YuKuaiEncounter {
  user_id: string;
  yukuai_id: string;
  content_hash: string;
  line_index: number;
  surface_form: string;          // "游来游去" — what it looks like in this line
  contextual_meaning: string;    // LLM-generated meaning in this context
  created_at: string;
}

export interface UserYuKuai {
  user_id: string;
  yukuai_id: string;
  familiarity: Familiarity;
  encounter_count: number;
  last_seen_at: string;
  contexts_seen: number;         // distinct content_hash count
}

// ─── LLM Decomposition Output ────────────────────────────────────────────────

export interface LLMYuKuaiItem {
  canonical_id: string;
  type: YuKuaiType;
  surface_form: string;
  contextual_meaning: string;
}

export interface LLMConnection {
  from: string;                  // yukuai canonical_id
  to_line: number;
  note: string;
}

export interface LLMGotcha {
  yukuai_id: string;
  note: string;
}

export interface LineDecomposition {
  translation: string;
  yukuai: LLMYuKuaiItem[];
  connections: LLMConnection[];
  gotchas: LLMGotcha[];
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface DecomposeLineRequest {
  contentHash: string;
  lineIndex: number;
}

export interface DecomposeLineResponse {
  decomposition: LineDecomposition;
  yukuai: YuKuai[];              // enriched with CEDICT data
  userState: UserYuKuai[] | null; // null if not logged in
}
