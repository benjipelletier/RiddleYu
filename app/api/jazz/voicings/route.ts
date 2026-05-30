import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../db';
import { requireSessionUser } from '@jazz/lib/session-user';
import { baseChordSymbol, normalizeChordSymbol } from '@jazz/lib/chord-symbol';

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

export async function GET(request: NextRequest) {
  const sql = getDb();
  const params = request.nextUrl.searchParams;
  const chordsCsv = params.get('chords');
  const type = params.get('type') ?? 'willy';
  if (!chordsCsv) {
    return NextResponse.json({ voicings: {} });
  }
  const chords = chordsCsv.split(',').map(c => c.trim()).filter(Boolean);
  if (chords.length === 0) {
    return NextResponse.json({ voicings: {} });
  }
  // Voicings share bidirectionally across an altered-dominant family
  // (E7, E7b9, E7#9, E7alt — anything with the same base_symbol). The
  // hovered chord's base_symbol gates the lookup; the client decides
  // how to render exact vs related matches by comparing each row's
  // chord_symbol to the hovered chord's normalized form.
  const bases = Array.from(new Set(chords.map(baseChordSymbol)));

  const rows = await sql`
    SELECT cv.id, cv.chord_symbol AS "chordSymbol", cv.base_symbol AS "baseSymbol",
           cv.voicing_type AS "voicingType",
           cv.notes, cv.label, cv.sort_order AS "sortOrder",
           cv.origin_standard_id AS "originStandardId",
           s.title AS "originStandardTitle",
           cv.created_at AS "createdAt", cv.updated_at AS "updatedAt"
    FROM chord_voicings cv
    LEFT JOIN standards s ON s.id = cv.origin_standard_id
    WHERE cv.voicing_type = ${type}
      AND cv.base_symbol = ANY(${bases})
    ORDER BY cv.chord_symbol, cv.sort_order, cv.created_at
  `;

  const byBase: Record<string, ReturnType<typeof shape>[]> = {};
  for (const row of rows as (VoicingRow & { baseSymbol: string })[]) {
    (byBase[row.baseSymbol] ??= []).push(shape(row));
  }
  const map: Record<string, ReturnType<typeof shape>[]> = {};
  for (const c of chords) {
    const base = baseChordSymbol(c);
    if (byBase[base]) map[c] = byBase[base];
  }
  return NextResponse.json({ voicings: map });
}

export async function POST(request: NextRequest) {
  let user;
  try {
    user = await requireSessionUser();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const chordSymbolRaw = typeof body?.chordSymbol === 'string' ? body.chordSymbol.trim() : '';
  const chordSymbol = normalizeChordSymbol(chordSymbolRaw);
  const notes = Array.isArray(body?.notes) ? body.notes : null;
  const label = typeof body?.label === 'string' ? body.label.trim() || null : null;
  const originStandardId = typeof body?.originStandardId === 'string' ? body.originStandardId : null;
  const voicingType = typeof body?.voicingType === 'string' ? body.voicingType : 'willy';

  if (!chordSymbol) return NextResponse.json({ error: 'chordSymbol required' }, { status: 400 });
  if (!notes || notes.length === 0) return NextResponse.json({ error: 'notes must be a non-empty array' }, { status: 400 });
  for (const n of notes) {
    if (!Number.isInteger(n) || n < 0 || n > 127) {
      return NextResponse.json({ error: 'each note must be a MIDI integer 0-127' }, { status: 400 });
    }
  }

  const sql = getDb();
  // Place new voicings at the end within this chord+type.
  const maxRows = await sql`
    SELECT COALESCE(MAX(sort_order), -1)::int AS "max"
    FROM chord_voicings
    WHERE chord_symbol = ${chordSymbol} AND voicing_type = ${voicingType}
  `;
  const nextOrder = ((maxRows[0] as { max: number }).max ?? -1) + 1;

  const base = baseChordSymbol(chordSymbol);
  const inserted = await sql`
    INSERT INTO chord_voicings
      (chord_symbol, base_symbol, voicing_type, notes, label, sort_order, origin_standard_id, created_by)
    VALUES
      (${chordSymbol}, ${base}, ${voicingType}, ${notes}, ${label}, ${nextOrder}, ${originStandardId}, ${user.id})
    RETURNING id, chord_symbol AS "chordSymbol", voicing_type AS "voicingType",
              notes, label, sort_order AS "sortOrder",
              origin_standard_id AS "originStandardId",
              created_at AS "createdAt", updated_at AS "updatedAt"
  `;
  const row = inserted[0] as VoicingRow;

  let originStandardTitle: string | null = null;
  if (row.originStandardId) {
    const t = await sql`SELECT title FROM standards WHERE id = ${row.originStandardId}`;
    originStandardTitle = (t[0] as { title: string } | undefined)?.title ?? null;
  }
  return NextResponse.json(shape({ ...row, originStandardTitle }));
}
