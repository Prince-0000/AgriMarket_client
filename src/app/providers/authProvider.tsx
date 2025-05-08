/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData, clearAuth } from '@/store/slices/authSlice';

export default function AuthProvider() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch('/api/auth/token');
        const { role, roleId, token } = await res.json();

        // dispatch(clearAuth());
        dispatch(setAuthData({ role, roleId, token }));
      } catch (err) {
        console.error('Error fetching auth token:', err);
      }finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return null; // no UI
}
