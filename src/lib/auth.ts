// lib/auth.ts
import { getSession } from '@auth0/nextjs-auth0';

export async function getCurrentRole() {
  const session = await getSession();
  return session?.user.role || null;
}

export async function getAuthToken() {
  const session = await getSession();
  return session?.accessToken || null;
}