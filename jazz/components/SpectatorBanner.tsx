'use client';

import { useEffect, useState } from 'react';

async function signInWithGoogle() {
  const callbackURL = `${window.location.origin}${window.location.pathname}${window.location.search}`;
  const res = await fetch('/api/auth/sign-in/social', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider: 'google', callbackURL }),
  });
  const data = await res.json().catch(() => ({}));
  if (data?.url) window.location.href = data.url;
}

async function signOut() {
  await fetch('/api/auth/sign-out', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });
  window.location.reload();
}

interface Viewer {
  isSpectator: boolean;
  rejectedAuth: { email: string; name: string | null } | null;
}

export function SpectatorBanner() {
  const [viewer, setViewer] = useState<Viewer | null>(null);

  useEffect(() => {
    fetch('/api/jazz/viewer')
      .then(r => r.json())
      .then(v => setViewer(v))
      .catch(() => {});
  }, []);

  if (!viewer || !viewer.isSpectator) return null;

  // Non-owner email completed OAuth — explain why we still treat them as
  // read-only and offer a sign-out to drop the stale cookie.
  if (viewer.rejectedAuth) {
    return (
      <div className="spectator-banner spectator-banner-rejected">
        <div className="spectator-banner-inner">
          <span className="spectator-eyebrow">read-only</span>
          <span className="spectator-text">
            Signed in as <em>{viewer.rejectedAuth.email}</em>. This is a single-user log — only <em>Benji</em> can write. You can keep browsing in read-only mode.
          </span>
          <button className="spectator-cta spectator-cta-secondary" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="spectator-banner">
      <div className="spectator-banner-inner">
        <span className="spectator-eyebrow">spectator mode</span>
        <span className="spectator-text">
          you&rsquo;re reading <em>Benji&rsquo;s</em> shed log — only Benji can sign in to write.
        </span>
        <button className="spectator-cta" onClick={signInWithGoogle}>
          Sign in with Google →
        </button>
      </div>
    </div>
  );
}
