// src/hooks/useAuth.ts (Client-side)
'use client';

import { useEffect, useState } from 'react';

export function useAuth() {
  const [auth, setAuth] = useState<{ token: string | null, role_id: string | null }>({ 
    token: null, 
    role_id: null 
  });

  useEffect(() => {
    // This runs only on client side
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    setAuth({
      token: getCookie('token') || null,
      role_id: getCookie('role_id') || null
    });
  }, []);

  return auth;
}