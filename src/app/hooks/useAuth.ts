// lib/auth.ts
import { cookies } from 'next/headers'

export async function getAuth() {
  const cookieStore = await cookies()

  const token = cookieStore.get('auth_token')?.value || null
  const role = cookieStore.get('user_role')?.value || null
  console.log(token, role);

  return {
    token,
    role,
    isAuthenticated: !!token,
  }
}
