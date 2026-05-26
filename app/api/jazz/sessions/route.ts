import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../db';
import { getViewedUser, requireSessionUser } from '@jazz/lib/session-user';

export async function GET(request: NextRequest) {
  const sql = getDb();
  const { user } = await getViewedUser();
  if (!user) return NextResponse.json({ items: [] });

  const params = request.nextUrl.searchParams;
  const standardId = params.get('standardId');
  const limit = Math.min(Math.max(parseInt(params.get('limit') ?? '50'), 1), 200);

  const rows = standardId
    ? await sql`
        SELECT ps.id, ps.standard_id AS "standardId", s.title,
               ps.practice_key AS "practiceKey", ps.started_at AS "startedAt",
               ps.ended_at AS "endedAt", ps.notes,
               COUNT(psi.id)::int AS "itemCount",
               MAX(psi.bpm) AS "topBpm"
        FROM practice_sessions ps
        JOIN standards s ON s.id = ps.standard_id
        LEFT JOIN practice_session_items psi ON psi.session_id = ps.id
        WHERE ps.user_id = ${user.id} AND ps.standard_id = ${standardId}
        GROUP BY ps.id, s.title
        ORDER BY ps.started_at DESC
        LIMIT ${limit}
      `
    : await sql`
        SELECT ps.id, ps.standard_id AS "standardId", s.title,
               ps.practice_key AS "practiceKey", ps.started_at AS "startedAt",
               ps.ended_at AS "endedAt", ps.notes,
               COUNT(psi.id)::int AS "itemCount",
               MAX(psi.bpm) AS "topBpm"
        FROM practice_sessions ps
        JOIN standards s ON s.id = ps.standard_id
        LEFT JOIN practice_session_items psi ON psi.session_id = ps.id
        WHERE ps.user_id = ${user.id}
        GROUP BY ps.id, s.title
        ORDER BY ps.started_at DESC
        LIMIT ${limit}
      `;

  return NextResponse.json({ items: rows });
}

interface ItemBody {
  skillId: string;
  bpm?: number | null;
  durationSeconds?: number | null;
  notes?: string | null;
}

export async function POST(request: NextRequest) {
  let user;
  try {
    user = await requireSessionUser();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const standardId = body?.standardId as string | undefined;
  const practiceKey = body?.practiceKey != null ? parseInt(body.practiceKey) : null;
  const notes = (body?.notes as string | undefined) ?? null;
  const items = (body?.items as ItemBody[] | undefined) ?? [];

  if (!standardId) return NextResponse.json({ error: 'standardId required' }, { status: 400 });
  if (!items.length) return NextResponse.json({ error: 'at least one item required' }, { status: 400 });
  if (practiceKey != null && (practiceKey < 0 || practiceKey > 11)) {
    return NextResponse.json({ error: 'practiceKey out of range' }, { status: 400 });
  }
  for (const it of items) {
    if (!it.skillId) return NextResponse.json({ error: 'each item needs skillId' }, { status: 400 });
    if (it.bpm != null && (it.bpm < 20 || it.bpm > 400)) {
      return NextResponse.json({ error: 'bpm must be 20-400' }, { status: 400 });
    }
  }

  const sql = getDb();
  const standardExists = await sql`SELECT 1 FROM standards WHERE id = ${standardId}`;
  if (standardExists.length === 0) {
    return NextResponse.json({ error: 'standard not found' }, { status: 404 });
  }

  const sessionRows = await sql`
    INSERT INTO practice_sessions (user_id, standard_id, practice_key, ended_at, notes)
    VALUES (${user.id}, ${standardId}, ${practiceKey}, NOW(), ${notes})
    RETURNING id, started_at, ended_at
  `;
  const session = sessionRows[0] as { id: string; started_at: string; ended_at: string };

  // Neon HTTP client has no transactions — insert items sequentially; rely on cascade-delete
  // of the session if any item insert fails.
  try {
    for (const it of items) {
      await sql`
        INSERT INTO practice_session_items (session_id, skill_id, bpm, duration_seconds, notes)
        VALUES (${session.id}, ${it.skillId}, ${it.bpm ?? null}, ${it.durationSeconds ?? null}, ${it.notes ?? null})
      `;
    }
  } catch (err) {
    await sql`DELETE FROM practice_sessions WHERE id = ${session.id}`;
    throw err;
  }

  return NextResponse.json({
    id: session.id,
    startedAt: session.started_at,
    endedAt: session.ended_at,
    itemCount: items.length,
  });
}
