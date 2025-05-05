import { getAuthToken } from '@/lib/auth';
import AccessPage from '@/components/auth/accessPage';
import { redirect } from 'next/navigation';

export default async function Page() {
  const token = await getAuthToken(); // Server-side token from cookies/session

  if (!token) {
    redirect('/api/auth/login');
  }

  const res = await fetch('http://localhost:4000/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    redirect('/api/auth/login');
  }

  const userData = await res.json();

  if (!userData.role) {
    redirect('/setup-profile');
  }


  return (
    <AccessPage token={token} role={userData.role} />
  );
}
