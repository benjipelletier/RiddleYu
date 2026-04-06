'use client';

import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@tongyizuo/app/page'), { ssr: false });

export default function TongyizuoPage() {
  return <HomePage />;
}
