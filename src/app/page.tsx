'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../store/slices/authSlice'

export default function HomePage() {
  const { user } = useUser();
  const dispatch = useDispatch();
  
  const handleClear = () => {
    console.log("in handle clear");
    dispatch(clearAuth());
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
      {user ? <p>Welcome, {user.name}</p> : <p>Please log in.</p>}
      <div>
        <Link href="/farmer">Farmer Route</Link>
        <Link href="/consumer">Consumer Route</Link>
        <Link href="/retailer">Retailer Route</Link>
      </div>
      <br/>
      <div>
        <Link href='/access'>Go to Dashboard</Link>
      </div>
      <br/>
      <button onClick={handleClear}>Clear Redux Auth</button>
    </main>
  );
}
