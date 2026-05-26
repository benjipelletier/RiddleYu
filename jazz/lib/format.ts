export const NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export function keyName(homeKey: number, isMinor = false): string {
  const i = ((homeKey % 12) + 12) % 12;
  return NOTE_NAMES[i] + (isMinor ? 'm' : '');
}

/** "today" | "3d" | "2mo" | "1y" | "never" */
export function relativeShort(iso: string | null | undefined): string {
  if (!iso) return 'never';
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return '1d';
  if (days < 30) return `${days}d`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo`;
  return `${Math.round(months / 12)}y`;
}

/** Days since the given ISO date (0 = today). */
export function daysSince(iso: string | null | undefined): number | null {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

/** Map an iReal style to a style-pill accent class. */
export function styleAccent(style: string | null | undefined): string {
  if (!style) return 'a-mute';
  const s = style.toLowerCase();
  if (s.includes('up tempo')) return 'a-up';
  if (s.includes('medium up')) return 'a-medup';
  if (s.includes('medium swing')) return 'a-swing';
  if (s.includes('medium slow')) return 'a-slow';
  if (s.includes('slow swing')) return 'a-slow';
  if (s.includes('ballad')) return 'a-ballad';
  if (s.includes('bossa')) return 'a-bossa';
  if (s.includes('samba')) return 'a-samba';
  if (s.includes('afro')) return 'a-afro';
  if (s.includes('latin')) return 'a-latin';
  if (s.includes('waltz')) return 'a-waltz';
  if (s.includes('funk')) return 'a-funk';
  if (s.includes('rock')) return 'a-rock';
  if (s.includes('calypso')) return 'a-calypso';
  if (s.includes('even 8')) return 'a-even8';
  if (s.includes('even 16')) return 'a-even16';
  return 'a-mute';
}
