import { NextRequest, NextResponse } from 'next/server';
import { getWordCluster, storeEnrichment } from '../../../../../lib/db';
import { enrichCluster } from '../../../../../lib/enrichment';
import { findSynonyms } from '../../../../../lib/cedict';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ word: string }> }
) {
  const { word } = await params;
  const simplified = decodeURIComponent(word);

  if (!simplified) {
    return NextResponse.json({ error: 'Missing word' }, { status: 400 });
  }

  let cached;
  try {
    cached = await getWordCluster(simplified);
  } catch (err) {
    console.error('DB lookup error:', err);
    const msg = String(err ?? '');
    if (msg.includes('missing_connection_string') || msg.includes('POSTGRES_URL')) {
      return NextResponse.json(
        { error: 'Database not configured (missing POSTGRES_URL).' },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  if (!cached) {
    return NextResponse.json(
      { error: `"${simplified}" not found — run the seed script to populate the database` },
      { status: 404 }
    );
  }

  // Lazy enrichment: run on first visit if primary cluster has no collocations
  const primaryCluster = cached.clusters[0];
  const needsEnrichment =
    primaryCluster &&
    primaryCluster.members.every((m) => m.collocations.length === 0);

  if (needsEnrichment) {
    try {
      const synonymClusters = findSynonyms(simplified);
      if (synonymClusters.length > 0) {
        const enrichment = await enrichCluster(synonymClusters[0]);
        await storeEnrichment(primaryCluster.id, enrichment);
        // Re-fetch with enriched data
        const enriched = await getWordCluster(simplified);
        if (enriched) return NextResponse.json(enriched);
      }
    } catch (err) {
      console.error('Enrichment failed (returning unenriched data):', err);
      // Fall through and return cached data
    }
  }

  return NextResponse.json(cached);
}
