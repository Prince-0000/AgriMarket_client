'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@heroui/react'; 

interface Props {
  token: string;
  role: string;
}

export default function AccessPage({ token, role }: Props) {
  const router = useRouter();

  useEffect(() => {

    switch (role) {
      case 'farmer':
        router.push('/farmer/products/view');
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

  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-white">
<Spinner size="lg" color="primary" />
<p className="mt-4 text-gray-600 text-sm">Redirecting you based on your role...</p>
</div>
);
}
