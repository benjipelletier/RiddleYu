import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ word: string }> }
): Promise<Metadata> {
  const { word } = await params;
  const simplified = decodeURIComponent(word);
  return { title: `${simplified} · 同义词星图` };
}

export default function ClusterWordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
