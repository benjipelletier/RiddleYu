import { NextResponse } from 'next/server';
import { getViewedUser, getSessionUser, getRawAuthUser } from '@jazz/lib/session-user';

// Returns who the UI is viewing (session user or owner-in-spectator-mode)
// plus whether the current request is authenticated.
//
// `rejectedAuth` is set when a non-owner email completed the OAuth flow:
// they have a valid Neon Auth cookie, but our app refuses to grant them a
// session because they're not JAZZ_OWNER_EMAIL. The UI uses this to show a
// "only Benji can sign in" banner instead of pretending nothing happened.
export async function GET() {
  const session = await getSessionUser();
  const { user, isSpectator, isOwner } = await getViewedUser();
  const rawAuth = session ? null : await getRawAuthUser();
  return NextResponse.json({
    signedIn: !!session,
    isSpectator,
    isOwner,
    rejectedAuth: rawAuth ? { email: rawAuth.email, name: rawAuth.name } : null,
    viewedUser: user ? { id: user.id, name: user.name, email: user.email, image: user.image } : null,
    sessionUser: session ? { id: session.id, name: session.name, email: session.email, image: session.image } : null,
  });
}
