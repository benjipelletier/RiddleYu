import cedictData from '@/data/cedict.json';

interface CedictEntry {
  pinyin: string;
  definition: string;
  hsk?: number;
}

const dict = cedictData as Record<string, CedictEntry>;

export function lookupCedict(simplified: string): CedictEntry | null {
  return dict[simplified] ?? null;
}

export function enrichYuKuai(canonicalForm: string, type: string): {
  pinyin: string | null;
  hsk_level: number | null;
  base_definition: string | null;
} {
  // Grammar and expression types don't get dictionary lookups
  if (type !== 'vocab') {
    return { pinyin: null, hsk_level: null, base_definition: null };
  }

  const entry = lookupCedict(canonicalForm);
  if (!entry) {
    return { pinyin: null, hsk_level: null, base_definition: null };
  }

  return {
    pinyin: entry.pinyin,
    hsk_level: entry.hsk ?? null,
    base_definition: entry.definition,
  };
}
