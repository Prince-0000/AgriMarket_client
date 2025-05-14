// app/access/page.tsx
import { cookies } from 'next/headers';
import AccessPage from '@/components/auth/accessPage';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const role = cookieStore.get('user_role')?.value;

  // If token is missing, redirect to login
  if (!token) {
    redirect('/api/auth/login');
  }

  // If role is missing, we still need to call /auth/me or setup profile
  if (!role) {
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

    return <AccessPage token={token} role={userData.role} />;
  }

  // If everything is already in cookies, just render
  return <AccessPage token={token} role={role} />;
}
