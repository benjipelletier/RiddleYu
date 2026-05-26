import { NextResponse } from 'next/server';
import { getViewedUser, getSessionUser } from '@jazz/lib/session-user';

// Returns who the UI is viewing (session user or owner-in-spectator-mode)
// plus whether the current request is authenticated.
export async function GET() {
  const session = await getSessionUser();
  const { user, isSpectator, isOwner } = await getViewedUser();
  return NextResponse.json({
    signedIn: !!session,
    isSpectator,
    isOwner,
    viewedUser: user ? { id: user.id, name: user.name, email: user.email, image: user.image } : null,
    sessionUser: session ? { id: session.id, name: session.name, email: session.email, image: session.image } : null,
  });
}
