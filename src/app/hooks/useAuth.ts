// lib/auth.ts
import { cookies } from 'next/headers'

export async function getAuth() {
  const cookieStore = await cookies()

  const token = cookieStore.get('auth_token')?.value || null
  const role = cookieStore.get('user_role')?.value || null
  const role_id = cookieStore.get('role_id')?.value || null;
  console.log(token, role, role_id);

  return {
    token,
    role,
    isAuthenticated: !!token,
    role_id,
  }
}
