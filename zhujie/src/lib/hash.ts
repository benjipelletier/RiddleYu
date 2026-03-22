import { createHash } from 'crypto';

export function normalizeText(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

export function splitLines(text: string): string[] {
  return normalizeText(text).split('\n');
}

export function hashContent(normalizedText: string): string {
  return createHash('sha256').update(normalizedText, 'utf8').digest('hex');
}
