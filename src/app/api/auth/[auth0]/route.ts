/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/[...auth0]/route.ts
import { handleAuth, handleCallback} from '@auth0/nextjs-auth0';
import { cookies } from 'next/headers';

export const GET = handleAuth({
  
  callback: handleCallback({
    afterCallback: async (req:any, session:any) => {
      // console.log("session", session.token)
      const response = await fetch('http://localhost:4000/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      
      const user = await response.json();
      const cookieStore = await cookies()
      // Set cookies that will be used across the app
      const res = cookieStore.set('user_role', user.role, {
        httpOnly: false, // if you need client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 1 day
      });
      
      // Keep token httpOnly for security
      cookieStore.set('auth_token', session.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 1 day
      });

      return session;
    }
  }),
});

export const POST = handleAuth();