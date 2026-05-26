import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../db';
import { requireSessionUser } from '@jazz/lib/session-user';
import { parseIRealUri, type StandardRecord } from '@jazz/lib/parse-ireal';

// ireal-reader is a CJS module pulling in Node-only APIs.
export const runtime = 'nodejs';

interface ImportItemResult {
  title: string;
  composer: string | null;
  status: 'inserted' | 'skipped' | 'failed';
  reason?: string;
}

export async function POST(request: NextRequest) {
  try {
    await requireSessionUser();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { uri?: unknown; dryRun?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const uri = typeof body.uri === 'string' ? body.uri : '';
  const dryRun = body.dryRun === true;
  if (!uri.trim()) {
    return NextResponse.json({ error: 'uri is required' }, { status: 400 });
  }

  let parsed: ReturnType<typeof parseIRealUri>;
  try {
    parsed = parseIRealUri(uri);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to parse iReal Pro URI' },
      { status: 400 },
    );
  }

  if (dryRun) {
    return NextResponse.json({
      playlistName: parsed.playlistName,
      parsed: parsed.records.length,
      failed: parsed.failed,
      preview: parsed.records.map(r => ({
        title: r.title,
        composer: r.composer,
        style: r.style,
        homeKey: r.homeKey,
        isMinor: r.isMinor,
        targetBpm: r.targetBpm,
        bpmSource: r.bpmSource,
        timeSignature: r.timeSignature,
        bars: r.chartData.length,
      })),
    });
  }

  const sql = getDb();
  const results: ImportItemResult[] = [];

  for (const r of parsed.records) {
    try {
      const inserted = await insertStandard(sql, r);
      results.push({
        title: r.title,
        composer: r.composer,
        status: inserted ? 'inserted' : 'skipped',
        reason: inserted ? undefined : 'already exists (title + composer)',
      });
    } catch (err) {
      results.push({
        title: r.title,
        composer: r.composer,
        status: 'failed',
        reason: err instanceof Error ? err.message : String(err),
      });
    }
  }

  for (const f of parsed.failed) {
    results.push({ title: f.title, composer: null, status: 'failed', reason: f.reason });
  }

  const counts = {
    parsed: parsed.records.length,
    inserted: results.filter(r => r.status === 'inserted').length,
    skipped: results.filter(r => r.status === 'skipped').length,
    failed: results.filter(r => r.status === 'failed').length,
  };

  return NextResponse.json({
    playlistName: parsed.playlistName,
    ...counts,
    items: results,
  });
}

async function insertStandard(
  sql: ReturnType<typeof getDb>,
  r: StandardRecord,
): Promise<boolean> {
  // ON CONFLICT DO NOTHING + RETURNING returns 0 rows when the conflict skipped
  // the insert, so we use that to distinguish inserted vs duplicate.
  const rows = await sql`
    INSERT INTO standards (
      title, composer, style, home_key, is_minor,
      source_bpm, target_bpm, bpm_source,
      time_signature, form, chart_data
    ) VALUES (
      ${r.title}, ${r.composer}, ${r.style}, ${r.homeKey}, ${r.isMinor},
      ${r.sourceBpm}, ${r.targetBpm}, ${r.bpmSource},
      ${r.timeSignature}, ${r.form}, ${JSON.stringify(r.chartData)}::jsonb
    )
    ON CONFLICT (title, composer) DO NOTHING
    RETURNING id
  `;
  return rows.length > 0;
}
