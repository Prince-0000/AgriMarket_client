'use client';

import { useEffect } from 'react';
import { setAuthData } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

interface Props {
  token: string;
  role: string;
}

export default function AccessPage({ token, role }: Props) {
  const router = useRouter();

  useEffect(() => {

    switch (role) {
      case 'farmer':
        router.push('/farmer');
        break;
      case 'retailer':
        router.push('/retailer');
        break;
      case 'consumer':
        router.push('/consumer');
        break;
      default:
        router.push('/setup-profile');
    }
  }, [token, role]);

  return <div>Redirecting you based on your role...</div>;
}
