import { redirect } from 'next/navigation';
import { getSessionUser } from '@jazz/lib/session-user';
import { ImportClient } from './ImportClient';

export const metadata = {
  title: 'jazz · import charts',
};

export default async function ImportPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/jazz/standards');
  }
  return <ImportClient />;
}
