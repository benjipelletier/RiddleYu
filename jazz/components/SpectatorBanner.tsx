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

export function SpectatorBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch('/api/jazz/viewer')
      .then(r => r.json())
      .then(v => setShow(!!v?.isSpectator))
      .catch(() => {});
  }, []);

  if (!show) return null;

  return (
    <div className="spectator-banner">
      <div className="spectator-banner-inner">
        <span className="spectator-eyebrow">spectator mode</span>
        <span className="spectator-text">
          you&rsquo;re reading <em>Benji&rsquo;s</em> shed log — sign in to keep your own.
        </span>
        <button className="spectator-cta" onClick={signInWithGoogle}>
          Sign in with Google →
        </button>
      </div>
    </div>
  );
}
