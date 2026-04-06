import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@zhujie/lib/auth';
import { getContent, getLineDecomposition, storeLineDecomposition, ensureTables, getUserYuKuaiBatch } from '@zhujie/lib/db';
import { generateLineDecomposition } from '@zhujie/lib/annotate';
import { processDecomposition, ensureYuKuai } from '@zhujie/lib/yukuai';
import { selectRecallCandidates } from '@zhujie/lib/familiarity';
import type { DecomposeLineRequest, DecomposeLineResponse } from '@zhujie/lib/yukuai-types';

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body = (await request.json()) as DecomposeLineRequest;
    if (!body.contentHash || typeof body.lineIndex !== 'number' || !Number.isInteger(body.lineIndex)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    if (!/^[a-f0-9]{64}$/.test(body.contentHash)) {
      return NextResponse.json({ error: 'Invalid content hash' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id ?? null;

    const cached = await getLineDecomposition(body.contentHash, body.lineIndex);
    if (cached && Array.isArray(cached.yukuai)) {
      const decomposition = cached;
      const yukuai = await Promise.all(
        decomposition.yukuai.map(async (item: any) => {
          return ensureYuKuai(item);
        }),
      );

      let userState = null;
      let recallIds: string[] = [];
      if (userId) {
        const yukuaiIds = yukuai.map((yk: any) => yk.id);
        userState = await getUserYuKuaiBatch(userId, yukuaiIds);
        recallIds = selectRecallCandidates(userState);
      }

      const response: DecomposeLineResponse = {
        decomposition,
        yukuai,
        userState,
      };
      return NextResponse.json({ ...response, recallIds });
    }

    const content = await getContent(body.contentHash);
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const lines = content.source_text.split('\n');
    if (body.lineIndex < 0 || body.lineIndex >= lines.length) {
      return NextResponse.json({ error: 'Line index out of range' }, { status: 400 });
    }

    const decomposition = await generateLineDecomposition(
      content.content_map,
      content.source_text,
      lines,
      body.lineIndex,
    );

    await storeLineDecomposition(body.contentHash, body.lineIndex, decomposition);

    const yukuai = await processDecomposition(userId, body.contentHash, body.lineIndex, decomposition.yukuai);

    let userState = null;
    let recallIds: string[] = [];
    if (userId) {
      const yukuaiIds = yukuai.map((yk: any) => yk.id);
      userState = await getUserYuKuaiBatch(userId, yukuaiIds);
      recallIds = selectRecallCandidates(userState);
    }

    const response: DecomposeLineResponse = {
      decomposition,
      yukuai,
      userState,
    };
    return NextResponse.json({ ...response, recallIds });
  } catch (error) {
    console.error('Decompose line error:', error instanceof Error ? error.message : error);
    console.error('Full error:', error);
    return NextResponse.json({ error: 'Failed to decompose line', detail: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
