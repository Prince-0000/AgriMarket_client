/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData, clearAuth } from '@/store/slices/authSlice';

export default function AuthProvider() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionRes = await fetch('/api/auth/token'); // Get token from local API
        const { token } = await sessionRes.json();

        const userRes = await fetch('http://localhost:4000/api/v1/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = await userRes.json();

        const role = user.role; // "farmer", "consumer", "retailer"
        const roleId =
          user.farmer?.farmer_id ||
          user.consumer?.consumer_id ||
          user.retailer?.retailer_id ||
          null;

        dispatch(setAuthData({ role, roleId, token }));
      } catch (err) {
        console.error('Error fetching user from auth/me:', err);
        dispatch(clearAuth());
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return null; // no UI
}
