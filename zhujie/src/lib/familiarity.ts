import { getUserYuKuai, upsertUserYuKuai } from './db';
import type { Familiarity, UserYuKuai } from './yukuai-types';

/**
 * Compute the next familiarity level based on current state and action.
 *
 * Transitions:
 * - new → seen: encountered in 2+ contexts
 * - seen → familiar: successful active recall
 * - familiar → known: recalled across 2+ different content sources
 */
export function computeFamiliarity(
  current: UserYuKuai,
  action: 'encounter' | 'recall_success' | 'recall_fail',
): Familiarity {
  switch (action) {
    case 'encounter':
      if (current.familiarity === 'new' && current.contexts_seen >= 2) return 'seen';
      return current.familiarity;

    case 'recall_success':
      if (current.familiarity === 'seen') return 'familiar';
      if (current.familiarity === 'familiar' && current.contexts_seen >= 2) return 'known';
      return current.familiarity;

    case 'recall_fail':
      // Don't demote, just don't promote
      return current.familiarity;
  }
}

/**
 * Update a user's familiarity with a YuKuai after an action.
 */
export async function updateFamiliarity(
  userId: string,
  yukuaiId: string,
  action: 'encounter' | 'recall_success' | 'recall_fail',
  contentHash: string,
): Promise<Familiarity> {
  const current = await getUserYuKuai(userId, yukuaiId);

  if (!current) {
    // First encounter — create as 'new'
    await upsertUserYuKuai(userId, yukuaiId, 'new', contentHash);
    return 'new';
  }

  const newFamiliarity = computeFamiliarity(current, action);
  if (newFamiliarity !== current.familiarity) {
    await upsertUserYuKuai(userId, yukuaiId, newFamiliarity, contentHash);
  }

  return newFamiliarity;
}

/**
 * Select YuKuai candidates for active recall from a line's decomposition.
 * Returns yukuai IDs that should be shown in recall mode.
 *
 * Criteria:
 * - Must be 'seen' or 'familiar' (not 'new' or 'known')
 * - Prefer yukuai not seen in the last 24 hours
 * - Return at most 1 per line (don't overwhelm)
 */
export function selectRecallCandidates(
  userStates: UserYuKuai[],
): string[] {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  const candidates = userStates
    .filter((s) => s.familiarity === 'seen' || s.familiarity === 'familiar')
    .sort((a, b) => {
      // Prefer older last_seen (more due for review)
      const aAge = now - new Date(a.last_seen_at).getTime();
      const bAge = now - new Date(b.last_seen_at).getTime();
      return bAge - aAge;
    });

  // Return at most 1 candidate, prefer ones not seen in 24h
  const stale = candidates.find(
    (c) => now - new Date(c.last_seen_at).getTime() > DAY_MS,
  );

  if (stale) return [stale.yukuai_id];
  if (candidates.length > 0) return [candidates[0].yukuai_id];
  return [];
}
