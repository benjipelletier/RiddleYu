import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../db';
import { requireSessionUser } from '@jazz/lib/session-user';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let user;
  try {
    user = await requireSessionUser();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = getDb();
  const rows = await sql`SELECT user_id FROM practice_sessions WHERE id = ${id}`;
  if (rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if ((rows[0] as { user_id: string }).user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await sql`DELETE FROM practice_sessions WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
