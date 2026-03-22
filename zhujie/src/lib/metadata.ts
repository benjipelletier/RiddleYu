import type { ContentMetadata } from './types';

const SEPARATOR_RE = /\s*[-–—]\s*/;
const SIMPLIFIED_RE = /[这个来对说时会学长开关门车东风书画]/;
const TRADITIONAL_RE = /[這個來對說時會學長開關門車東風書畫]/;

export function detectLanguageVariant(text: string): 'simplified' | 'traditional' {
  let simpCount = 0;
  let tradCount = 0;
  for (const char of text) {
    if (SIMPLIFIED_RE.test(char)) simpCount++;
    if (TRADITIONAL_RE.test(char)) tradCount++;
  }
  return tradCount > simpCount ? 'traditional' : 'simplified';
}

export function detectMetadata(
  text: string,
  overrides: { title?: string; artist?: string; contentType?: string },
): ContentMetadata {
  let title: string | null = overrides.title ?? null;
  let artist: string | null = overrides.artist ?? null;

  if (!title && !artist) {
    const lines = text.trim().split('\n');
    const firstLine = lines[0]?.trim() ?? '';
    if (SEPARATOR_RE.test(firstLine)) {
      const parts = firstLine.split(SEPARATOR_RE);
      if (parts.length === 2 && parts[0].length < 30 && parts[1].length < 30) {
        artist = parts[0];
        title = parts[1];
      }
    }
  }

  let contentType: 'song' | 'tv' | 'podcast' | 'other' = 'other';
  if (overrides.contentType) {
    contentType = overrides.contentType as ContentMetadata['contentType'];
  } else {
    const lineCount = text.trim().split('\n').filter((l) => l.trim()).length;
    if (lineCount <= 80) contentType = 'song';
  }

  return {
    title,
    artist,
    contentType,
    languageVariant: detectLanguageVariant(text),
  };
}
