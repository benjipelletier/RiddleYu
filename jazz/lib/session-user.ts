import 'server-only';
import { auth } from './auth';
import { getDb } from '../../app/api/jazz/db';

export interface JazzUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

/**
 * Read the authenticated user (server-side) from the Neon Auth session.
 *
 * Single-tenant chokepoint: only sessions whose email matches JAZZ_OWNER_EMAIL
 * are treated as signed-in. Other Google accounts can complete the OAuth flow
 * (Neon Auth will mint them a cookie) but our app refuses to grant them a
 * session — they fall through to spectator mode and can't hit any mutation.
 * Fails closed if JAZZ_OWNER_EMAIL is unset.
 */
export async function getSessionUser(): Promise<JazzUser | null> {
  const { data } = await auth.getSession();
  const user = data?.user;
  if (!user) return null;

  const ownerEmail = process.env.JAZZ_OWNER_EMAIL;
  if (!ownerEmail || user.email !== ownerEmail) return null;

  return {
    id: user.id,
    email: user.email ?? '',
    name: user.name ?? null,
    image: user.image ?? null,
  };
}

/**
 * Look up the owner user from neon_auth.user by email. The Better Auth user
 * table is named `user` (singular) and lives in the `neon_auth` schema.
 * Returns null until the owner has signed in at least once.
 */
let _ownerCache: JazzUser | null = null;
let _ownerCacheAt = 0;
const OWNER_CACHE_TTL_MS = 60_000;

export async function getOwnerUser(): Promise<JazzUser | null> {
  const ownerEmail = process.env.JAZZ_OWNER_EMAIL;
  if (!ownerEmail) return null;
  if (_ownerCache && Date.now() - _ownerCacheAt < OWNER_CACHE_TTL_MS) return _ownerCache;

  const sql = getDb();
  try {
    const rows = await sql`
      SELECT id, email, name, image
      FROM neon_auth.user
      WHERE email = ${ownerEmail}
      LIMIT 1
    `;
    _ownerCache = (rows[0] as JazzUser | undefined) ?? null;
  } catch {
    // neon_auth.user is created on first sign-in. If it doesn't exist yet,
    // there's no owner to spectate on.
    _ownerCache = null;
  }
  _ownerCacheAt = Date.now();
  return _ownerCache;
}

/**
 * Resolve which user's data the UI should display.
 * Signed-in → that user. Otherwise → owner (spectator mode).
 */
export async function getViewedUser(): Promise<{ user: JazzUser | null; isSpectator: boolean; isOwner: boolean }> {
  const session = await getSessionUser();
  if (session) {
    const ownerEmail = process.env.JAZZ_OWNER_EMAIL;
    return { user: session, isSpectator: false, isOwner: session.email === ownerEmail };
  }
  const owner = await getOwnerUser();
  return { user: owner, isSpectator: true, isOwner: false };
}

export async function requireSessionUser(): Promise<JazzUser> {
  const user = await getSessionUser();
  if (!user) {
    const err = new Error('Unauthorized') as Error & { status?: number };
    err.status = 401;
    throw err;
  }
  return user;
}
