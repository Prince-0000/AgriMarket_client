// app/farmer/page.tsx
import Dashboard from '@/components/farmer/dashboard'
import { cookies } from 'next/headers'

export default async function FarmerPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  // console.log("token", token)

  let userData = null

  if (token) {
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      })

      if (response.ok) {
        userData = await response.json()
      } else {
        console.error('User data fetch failed.')
      }
    } catch (err) {
      console.error('Error fetching user:', err)
    }
  }

  return <Dashboard user={userData} />
}
