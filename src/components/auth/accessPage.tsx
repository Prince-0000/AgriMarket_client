'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

interface Props {
  token: string;
  role: string;
}

export default function AccessPage({ token, role }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setAuthData({ token, role }));

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
  }, [dispatch, token, role]);

  return <div>Redirecting you based on your role...</div>;
}
