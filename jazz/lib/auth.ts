import 'server-only';
import { createNeonAuth } from '@neondatabase/auth/next/server';

// Neon Auth (Better Auth) server instance.
// - JAZZ_NEON_AUTH_BASE_URL is auto-injected by the Neon ↔ Vercel integration.
// - JAZZ_NEON_AUTH_COOKIE_SECRET must be set manually (>=32 chars). Generate with:
//     openssl rand -base64 32
export const auth = createNeonAuth({
  baseUrl: process.env.JAZZ_NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.JAZZ_NEON_AUTH_COOKIE_SECRET!,
    // OAuth redirects from Google → Neon Auth → our app are cross-site top-level
    // navigations. SameSite=Strict (the SDK default) drops the cookie at the
    // last hop, so the session never lands. 'lax' is the standard for OAuth.
    sameSite: 'lax',
  },
});
