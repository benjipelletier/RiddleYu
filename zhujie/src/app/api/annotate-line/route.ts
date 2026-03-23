// DEPRECATED: Use /api/decompose-line instead. Kept for backward compatibility with cached annotations.
import { NextRequest, NextResponse } from 'next/server';
import { getLineAnnotation, ensureTables } from '@/lib/db';
import type { AnnotateLineRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body = (await request.json()) as AnnotateLineRequest;
    if (!body.contentHash || body.lineIndex === undefined) {
      return NextResponse.json(
        { error: 'contentHash and lineIndex are required' },
        { status: 400 },
      );
    }

    const cached = await getLineAnnotation(body.contentHash, body.lineIndex);
    if (cached) {
      return NextResponse.json(cached);
    }

    // No longer generates new annotations — use /api/decompose-line instead
    return NextResponse.json({ error: 'Use /api/decompose-line for new annotations' }, { status: 410 });
  } catch (error) {
    console.error('Annotate line error:', error);
    return NextResponse.json(
      { error: 'Failed to annotate line' },
      { status: 500 },
    );
  }
}
