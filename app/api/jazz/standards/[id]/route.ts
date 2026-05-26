import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../db';
import { getViewedUser, requireSessionUser } from '@jazz/lib/session-user';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const sql = getDb();
  const { user } = await getViewedUser();
  const userId = user?.id ?? null;

  const standards = await sql`
    SELECT id, title, composer, style, home_key, is_minor, source_bpm,
           target_bpm, bpm_source, time_signature, form, chart_data
    FROM standards WHERE id = ${id}
  `;
  if (standards.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const s = standards[0] as Record<string, unknown>;

  const viewingKey = parseInt(request.nextUrl.searchParams.get('key') ?? String(s.home_key));

  const countResult = await sql`
    SELECT COUNT(*)::int AS count FROM standards WHERE composer = ${s.composer}
  `;
  const composerCount = (countResult[0] as { count: number }).count;

  const skills = await sql`
    SELECT id, name, sort_order AS "sortOrder", description, tracks_bpm AS "tracksBpm"
    FROM checklist_skills ORDER BY sort_order
  `;

  // Per-skill log summary for the viewed user, ON THIS STANDARD IN THIS KEY.
  // Practice in C and practice in F are distinct — skills are tracked per-key.
  // We pre-filter the (item, session) join into a subquery scoped to the
  // standard/user/key. A LEFT JOIN against that gives us "no data" rows for
  // keys/skills the user hasn't logged yet.
  const summary = await sql`
    WITH scoped_items AS (
      SELECT psi.skill_id, psi.bpm, ps.id AS session_id, ps.started_at
      FROM practice_session_items psi
      JOIN practice_sessions ps ON ps.id = psi.session_id
      WHERE ps.standard_id = ${id}
        AND ps.user_id = ${userId}
        AND ps.practice_key = ${viewingKey}
    )
    SELECT
      cs.id AS "skillId",
      cs.name AS "skillName",
      cs.tracks_bpm AS "tracksBpm",
      cs.lh_group AS "lhGroup",
      cs.lh_part AS "lhPart",
      cs.rh_part AS "rhPart",
      cs.mode AS "mode",
      MAX(si.bpm) AS "bestBpm",
      (
        SELECT si2.bpm FROM scoped_items si2
        WHERE si2.skill_id = cs.id
        ORDER BY si2.started_at DESC
        LIMIT 1
      ) AS "lastBpm",
      MAX(si.started_at) AS "lastPracticedAt",
      COUNT(DISTINCT si.session_id)::int AS "sessionsCount"
    FROM checklist_skills cs
    LEFT JOIN scoped_items si ON si.skill_id = cs.id
    WHERE cs.mode = 'trio'
    GROUP BY cs.id, cs.name, cs.tracks_bpm, cs.lh_group, cs.lh_part, cs.rh_part, cs.mode, cs.sort_order
    ORDER BY cs.sort_order
  `;

  // Recent entries per skill (history sparkline) — also filtered to the
  // currently viewed key.
  const history = await sql`
    SELECT psi.skill_id AS "skillId", psi.bpm, ps.started_at AS "practicedAt"
    FROM practice_session_items psi
    JOIN practice_sessions ps ON ps.id = psi.session_id
    WHERE ps.standard_id = ${id}
      AND ps.user_id = ${userId}
      AND ps.practice_key = ${viewingKey}
    ORDER BY ps.started_at DESC
    LIMIT 200
  `;

  const historyBySkill: Record<string, { practicedAt: string; bpm: number | null }[]> = {};
  for (const row of history as { skillId: string; bpm: number | null; practicedAt: string }[]) {
    (historyBySkill[row.skillId] ??= []).push({ practicedAt: row.practicedAt, bpm: row.bpm });
  }
  for (const k of Object.keys(historyBySkill)) {
    historyBySkill[k] = historyBySkill[k].slice(0, 20).reverse(); // oldest→newest for chart
  }

  const skillsWithHistory = (summary as Record<string, unknown>[]).map(row => ({
    ...row,
    history: historyBySkill[row.skillId as string] ?? [],
  }));

  // Per-key roll-up so the UI can mark which keys have any data, and how
  // many skills hit target in each.
  const perKey = await sql`
    SELECT
      ps.practice_key AS "key",
      COUNT(DISTINCT psi.skill_id)::int AS "skillsLogged",
      COUNT(DISTINCT CASE WHEN psi.bpm >= ${s.target_bpm} THEN psi.skill_id END)::int AS "skillsAtTarget",
      COUNT(DISTINCT ps.id)::int AS "sessions"
    FROM practice_sessions ps
    JOIN practice_session_items psi ON psi.session_id = ps.id
    WHERE ps.standard_id = ${id}
      AND ps.user_id = ${userId}
    GROUP BY ps.practice_key
  `;
  const progressByKey: Record<number, { skillsLogged: number; skillsAtTarget: number; sessions: number }> = {};
  for (const r of perKey as { key: number; skillsLogged: number; skillsAtTarget: number; sessions: number }[]) {
    progressByKey[r.key] = { skillsLogged: r.skillsLogged, skillsAtTarget: r.skillsAtTarget, sessions: r.sessions };
  }

  return NextResponse.json({
    id: s.id,
    title: s.title,
    composer: s.composer,
    style: s.style,
    homeKey: s.home_key,
    isMinor: s.is_minor,
    sourceBpm: s.source_bpm,
    targetBpm: s.target_bpm,
    bpmSource: s.bpm_source,
    timeSignature: s.time_signature,
    form: s.form,
    chartData: s.chart_data,
    viewingKey,
    skills: skillsWithHistory,
    progressByKey,
    composerCount,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let user;
  try {
    user = await requireSessionUser();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const targetBpm = parseInt(body?.targetBpm);
  if (!Number.isFinite(targetBpm) || targetBpm < 20 || targetBpm > 400) {
    return NextResponse.json({ error: 'targetBpm must be 20-400' }, { status: 400 });
  }

  const sql = getDb();
  const before = await sql`SELECT target_bpm FROM standards WHERE id = ${id}`;
  if (before.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const oldValue = (before[0] as { target_bpm: number }).target_bpm;

  await sql`
    UPDATE standards
    SET target_bpm = ${targetBpm}, bpm_source = 'manual'
    WHERE id = ${id}
  `;
  await sql`
    INSERT INTO target_bpm_changes (standard_id, user_id, old_value, new_value)
    VALUES (${id}, ${user.id}, ${oldValue}, ${targetBpm})
  `;

  return NextResponse.json({ ok: true, targetBpm, bpmSource: 'manual' });
}
