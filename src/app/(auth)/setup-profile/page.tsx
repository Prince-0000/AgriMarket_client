// app/setup-profile/page.tsx
import { getAuthToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SetupProfile from '@/components/auth/setupProfile';

export default async function Page() {
  const token = await getAuthToken()

  if (!token) {
    redirect('/api/auth/login')
  }

  return <SetupProfile token={token} />
}
