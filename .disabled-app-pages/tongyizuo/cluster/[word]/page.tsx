'use client';

import dynamic from 'next/dynamic';

const ClusterPage = dynamic(
  () => import('@tongyizuo/app/cluster/[word]/page'),
  { ssr: false }
);

export default function TongyizuoClusterPage({ params }: { params: Promise<{ word: string }> }) {
  return <ClusterPage params={params} />;
}
