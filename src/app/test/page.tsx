// app/auth-test/page.tsx (must be a server component)
import { getAuth } from '@/app/hooks/useAuth'

export default async function AuthTestPage() {
  const { token, role, isAuthenticated } = await getAuth()

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>

      <div className="space-y-4">
        <div className="p-3 bg-gray-100 rounded">
          <h2 className="font-semibold">Authentication Status</h2>
          <p className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
            {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
          </p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <h2 className="font-semibold">Token</h2>
          <p className="break-all">
            {token ? `****${token.slice(-6)}` : 'No token found'}
          </p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <h2 className="font-semibold">User Role</h2>
          <p>{role || 'No role assigned'}</p>
        </div>
      </div>
    </div>
  )
}
