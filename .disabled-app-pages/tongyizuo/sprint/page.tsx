import type { Metadata } from 'next';
import SprintClient from './SprintClient';

export const metadata: Metadata = {
  title: '词语冲刺 — Synonym Sprint',
  description: 'A prototype side-scroller where you survive by choosing the synonym that actually fits.',
};

export default function SprintPage() {
  return <SprintClient />;
}
