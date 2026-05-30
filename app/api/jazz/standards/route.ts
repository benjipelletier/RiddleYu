import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../db';
import { getViewedUser } from '@jazz/lib/session-user';

type SortKey = 'title' | 'recent' | 'target_bpm';

export async function GET(request: NextRequest) {
  const sql = getDb();
  const { user } = await getViewedUser();
  const userId = user?.id ?? null;

  const params = request.nextUrl.searchParams;
  const q = params.get('q')?.trim() ?? '';
  const sortParam = (params.get('sort') ?? 'title') as SortKey;
  const sort: SortKey = ['title', 'recent', 'target_bpm'].includes(sortParam) ? sortParam : 'title';
  const limit = Math.min(Math.max(parseInt(params.get('limit') ?? '50'), 1), 2000);
  const offset = Math.max(parseInt(params.get('offset') ?? '0'), 0);

  const like = q ? `%${q.toLowerCase()}%` : null;

  // We branch on sort+search to keep tagged-template SQL simple.
  let rows;
  let total;
  if (like === null && sort === 'title') {
    rows = await sql`
      SELECT s.id, s.title, s.composer, s.style,
        s.home_key AS "homeKey", s.is_minor AS "isMinor",
        s.target_bpm AS "targetBpm", s.bpm_source AS "bpmSource",
        stats.last_practiced_at AS "lastPracticedAt",
        COALESCE(stats.sessions_count, 0)::int AS "sessionsCount",
        COALESCE(stats.skills_logged_count, 0)::int AS "skillsLoggedCount"
      FROM standards s
      LEFT JOIN LATERAL (
        SELECT MAX(ps.started_at) AS last_practiced_at,
               COUNT(DISTINCT ps.id) AS sessions_count,
               COUNT(DISTINCT psi.skill_id) AS skills_logged_count
        FROM practice_sessions ps
        LEFT JOIN practice_session_items psi ON psi.session_id = ps.id
        WHERE ps.standard_id = s.id AND ps.user_id = ${userId}
      ) stats ON TRUE
      ORDER BY s.title ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
    total = await sql`SELECT COUNT(*)::int AS c FROM standards`;
  } else if (like === null && sort === 'recent') {
    rows = await sql`
      SELECT s.id, s.title, s.composer, s.style,
        s.home_key AS "homeKey", s.is_minor AS "isMinor",
        s.target_bpm AS "targetBpm", s.bpm_source AS "bpmSource",
        stats.last_practiced_at AS "lastPracticedAt",
        COALESCE(stats.sessions_count, 0)::int AS "sessionsCount",
        COALESCE(stats.skills_logged_count, 0)::int AS "skillsLoggedCount"
      FROM standards s
      LEFT JOIN LATERAL (
        SELECT MAX(ps.started_at) AS last_practiced_at,
               COUNT(DISTINCT ps.id) AS sessions_count,
               COUNT(DISTINCT psi.skill_id) AS skills_logged_count
        FROM practice_sessions ps
        LEFT JOIN practice_session_items psi ON psi.session_id = ps.id
        WHERE ps.standard_id = s.id AND ps.user_id = ${userId}
      ) stats ON TRUE
      ORDER BY stats.last_practiced_at DESC NULLS LAST, s.title ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
    total = await sql`SELECT COUNT(*)::int AS c FROM standards`;
  } else if (like === null && sort === 'target_bpm') {
    rows = await sql`
      SELECT s.id, s.title, s.composer, s.style,
        s.home_key AS "homeKey", s.is_minor AS "isMinor",
        s.target_bpm AS "targetBpm", s.bpm_source AS "bpmSource",
        stats.last_practiced_at AS "lastPracticedAt",
        COALESCE(stats.sessions_count, 0)::int AS "sessionsCount",
        COALESCE(stats.skills_logged_count, 0)::int AS "skillsLoggedCount"
      FROM standards s
      LEFT JOIN LATERAL (
        SELECT MAX(ps.started_at) AS last_practiced_at,
               COUNT(DISTINCT ps.id) AS sessions_count,
               COUNT(DISTINCT psi.skill_id) AS skills_logged_count
        FROM practice_sessions ps
        LEFT JOIN practice_session_items psi ON psi.session_id = ps.id
        WHERE ps.standard_id = s.id AND ps.user_id = ${userId}
      ) stats ON TRUE
      ORDER BY s.target_bpm DESC, s.title ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
    total = await sql`SELECT COUNT(*)::int AS c FROM standards`;
  } else if (sort === 'recent') {
    rows = await sql`
      SELECT s.id, s.title, s.composer, s.style,
        s.home_key AS "homeKey", s.is_minor AS "isMinor",
        s.target_bpm AS "targetBpm", s.bpm_source AS "bpmSource",
        stats.last_practiced_at AS "lastPracticedAt",
        COALESCE(stats.sessions_count, 0)::int AS "sessionsCount",
        COALESCE(stats.skills_logged_count, 0)::int AS "skillsLoggedCount"
      FROM standards s
      LEFT JOIN LATERAL (
        SELECT MAX(ps.started_at) AS last_practiced_at,
               COUNT(DISTINCT ps.id) AS sessions_count,
               COUNT(DISTINCT psi.skill_id) AS skills_logged_count
        FROM practice_sessions ps
        LEFT JOIN practice_session_items psi ON psi.session_id = ps.id
        WHERE ps.standard_id = s.id AND ps.user_id = ${userId}
      ) stats ON TRUE
      WHERE LOWER(s.title) LIKE ${like} OR LOWER(COALESCE(s.composer, '')) LIKE ${like}
      ORDER BY stats.last_practiced_at DESC NULLS LAST, s.title ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
    total = await sql`
      SELECT COUNT(*)::int AS c FROM standards
      WHERE LOWER(title) LIKE ${like} OR LOWER(COALESCE(composer, '')) LIKE ${like}
    `;
  } else if (sort === 'target_bpm') {
    rows = await sql`
      SELECT s.id, s.title, s.composer, s.style,
        s.home_key AS "homeKey", s.is_minor AS "isMinor",
        s.target_bpm AS "targetBpm", s.bpm_source AS "bpmSource",
        stats.last_practiced_at AS "lastPracticedAt",
        COALESCE(stats.sessions_count, 0)::int AS "sessionsCount",
        COALESCE(stats.skills_logged_count, 0)::int AS "skillsLoggedCount"
      FROM standards s
      LEFT JOIN LATERAL (
        SELECT MAX(ps.started_at) AS last_practiced_at,
               COUNT(DISTINCT ps.id) AS sessions_count,
               COUNT(DISTINCT psi.skill_id) AS skills_logged_count
        FROM practice_sessions ps
        LEFT JOIN practice_session_items psi ON psi.session_id = ps.id
        WHERE ps.standard_id = s.id AND ps.user_id = ${userId}
      ) stats ON TRUE
      WHERE LOWER(s.title) LIKE ${like} OR LOWER(COALESCE(s.composer, '')) LIKE ${like}
      ORDER BY s.target_bpm DESC, s.title ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
    total = await sql`
      SELECT COUNT(*)::int AS c FROM standards
      WHERE LOWER(title) LIKE ${like} OR LOWER(COALESCE(composer, '')) LIKE ${like}
    `;
  } else {
    rows = await sql`
      SELECT s.id, s.title, s.composer, s.style,
        s.home_key AS "homeKey", s.is_minor AS "isMinor",
        s.target_bpm AS "targetBpm", s.bpm_source AS "bpmSource",
        stats.last_practiced_at AS "lastPracticedAt",
        COALESCE(stats.sessions_count, 0)::int AS "sessionsCount",
        COALESCE(stats.skills_logged_count, 0)::int AS "skillsLoggedCount"
      FROM standards s
      LEFT JOIN LATERAL (
        SELECT MAX(ps.started_at) AS last_practiced_at,
               COUNT(DISTINCT ps.id) AS sessions_count,
               COUNT(DISTINCT psi.skill_id) AS skills_logged_count
        FROM practice_sessions ps
        LEFT JOIN practice_session_items psi ON psi.session_id = ps.id
        WHERE ps.standard_id = s.id AND ps.user_id = ${userId}
      ) stats ON TRUE
      WHERE LOWER(s.title) LIKE ${like} OR LOWER(COALESCE(s.composer, '')) LIKE ${like}
      ORDER BY s.title ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
    total = await sql`
      SELECT COUNT(*)::int AS c FROM standards
      WHERE LOWER(title) LIKE ${like} OR LOWER(COALESCE(composer, '')) LIKE ${like}
    `;
  }

  return NextResponse.json({
    items: rows,
    total: (total[0] as { c: number }).c,
    limit,
    offset,
  });
}
