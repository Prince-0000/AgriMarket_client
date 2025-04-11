"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <a href="api/auth/logout">Logout</a>
        </>
      ) : (
        <a href="api/auth/login">Login</a>
      )}
    </div>
    
  );
}
