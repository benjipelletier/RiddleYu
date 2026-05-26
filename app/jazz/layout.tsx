import { Suspense } from 'react';
import { Masthead } from '@jazz/components/Masthead';
import { SpectatorBanner } from '@jazz/components/SpectatorBanner';
import '@jazz/styles/jazz.css';
import '@jazz/styles/themes.css';

export const metadata = {
  title: 'jazz · shed log',
  description: 'Practice log for jazz piano standards',
};

export default function JazzLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Limelight&family=Righteous&display=swap"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.theme = 'vinyl';`,
        }}
      />
      <div className="app theme-vinyl" data-theme="vinyl">
        <div className="page-top">
          <Suspense fallback={null}>
            <Masthead />
          </Suspense>
          <SpectatorBanner />
        </div>
        {children}
      </div>
    </>
  );
}
