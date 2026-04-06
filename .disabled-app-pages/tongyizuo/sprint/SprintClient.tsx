'use client';

import dynamic from 'next/dynamic';

const SynonymSprintDemo = dynamic(
  () => import('@tongyizuo/components/SynonymSprintDemo'),
  { ssr: false }
);

export default function SprintClient() {
  return <SynonymSprintDemo />;
}
