export type BpmSource = 'ireal' | 'style_heuristic' | 'manual';

export interface Standard {
  id: string;
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  sourceBpm: number | null;
  targetBpm: number;
  bpmSource: BpmSource;
  timeSignature: string;
  form: string | null;
  chartData: string[][];
}

export interface ChecklistSkill {
  id: string;
  name: string;
  sortOrder: number;
  description: string | null;
  tracksBpm: boolean;
}

export interface SkillLogSummary {
  skillId: string;
  skillName: string;
  tracksBpm: boolean;
  lastBpm: number | null;
  bestBpm: number | null;
  lastPracticedAt: string | null;
  sessionsCount: number;
  history: { practicedAt: string; bpm: number | null }[];
}

export interface StandardSummary {
  id: string;
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  targetBpm: number;
  bpmSource: BpmSource;
  lastPracticedAt: string | null;
  sessionsCount: number;
  skillsLoggedCount: number;
}

export interface StandardDetail extends Standard {
  viewingKey: number;
  skills: SkillLogSummary[];
}

export interface PracticeSessionItemInput {
  skillId: string;
  bpm?: number | null;
  durationSeconds?: number | null;
  notes?: string | null;
}

export interface CreateSessionInput {
  standardId: string;
  practiceKey?: number | null;
  notes?: string | null;
  items: PracticeSessionItemInput[];
}
