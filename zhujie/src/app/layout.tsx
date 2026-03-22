import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '注解 Zhùjiě',
  description: 'Pre-study every line before you press play',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
