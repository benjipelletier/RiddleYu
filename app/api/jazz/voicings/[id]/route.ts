import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../db';
import { requireSessionUser } from '@jazz/lib/session-user';

interface VoicingRow {
  id: string;
  chordSymbol: string;
  voicingType: string;
  notes: number[];
  label: string | null;
  sortOrder: number;
  originStandardId: string | null;
  originStandardTitle: string | null;
  createdAt: string;
  updatedAt: string;
}

function shape(r: VoicingRow) {
  return {
    id: r.id,
    chordSymbol: r.chordSymbol,
    voicingType: r.voicingType,
    notes: r.notes,
    label: r.label,
    sortOrder: r.sortOrder,
    originStandard: r.originStandardId
      ? { id: r.originStandardId, title: r.originStandardTitle ?? '' }
      : null,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await requireSessionUser();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const setNotes = Array.isArray(body?.notes) ? body.notes : null;
  const setLabel = body?.label === null
    ? null
    : (typeof body?.label === 'string' ? body.label.trim() || null : undefined);
  const setSortOrder = Number.isInteger(body?.sortOrder) ? body.sortOrder : undefined;

  if (setNotes) {
    if (setNotes.length === 0) return NextResponse.json({ error: 'notes must be non-empty' }, { status: 400 });
    for (const n of setNotes) {
      if (!Number.isInteger(n) || n < 0 || n > 127) {
        return NextResponse.json({ error: 'each note must be a MIDI integer 0-127' }, { status: 400 });
      }
    }
  }

  const sql = getDb();
  const updated = await sql`
    UPDATE chord_voicings
    SET notes      = COALESCE(${setNotes}, notes),
        label      = CASE WHEN ${setLabel === undefined} THEN label ELSE ${setLabel} END,
        sort_order = COALESCE(${setSortOrder ?? null}, sort_order),
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, chord_symbol AS "chordSymbol", voicing_type AS "voicingType",
              notes, label, sort_order AS "sortOrder",
              origin_standard_id AS "originStandardId",
              created_at AS "createdAt", updated_at AS "updatedAt"
  `;
  if (updated.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const row = updated[0] as VoicingRow;

  let originStandardTitle: string | null = null;
  if (row.originStandardId) {
    const t = await sql`SELECT title FROM standards WHERE id = ${row.originStandardId}`;
    originStandardTitle = (t[0] as { title: string } | undefined)?.title ?? null;
  }
  return NextResponse.json(shape({ ...row, originStandardTitle }));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await requireSessionUser();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = getDb();
  const deleted = await sql`DELETE FROM chord_voicings WHERE id = ${id} RETURNING id`;
  if (deleted.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
