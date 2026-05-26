// Next.js 16 proxy (formerly middleware). Neon Auth's `auth.middleware()`
// handles the OAuth verifier → session cookie exchange after the Google
// callback redirects back to our app. But by default it ALSO redirects
// unauthenticated visitors to a sign-in page on every protected route, which
// would break spectator mode (we want unauthenticated users to browse).
//
// So we only run Neon's middleware when the verifier query param is present —
// exactly the case where we need it to set the cookie and redirect to a clean
// URL. All other requests pass straight through.
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@jazz/lib/auth';

const neonMiddleware = auth.middleware();

export default async function proxy(request: NextRequest) {
  if (request.nextUrl.searchParams.has('neon_auth_session_verifier')) {
    return neonMiddleware(request);
  }
  return NextResponse.next();
}

export const config = {
  // Run only on jazz user-facing routes. The /api/auth/* handler does its own
  // proxying — middleware would be redundant there.
  matcher: ['/jazz/:path*'],
};
