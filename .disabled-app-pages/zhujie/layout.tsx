import { Analytics } from '@vercel/analytics/react';
import Providers from '@zhujie/components/Providers';
import '@zhujie/styles/globals.css';

export const metadata = {
  title: '注解 Zhùjiě',
  description: 'Pre-study every line before you press play',
};

export default function ZhujieLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
      <Analytics />
    </Providers>
  );
}
