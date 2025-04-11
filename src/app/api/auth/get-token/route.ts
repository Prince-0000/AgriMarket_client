import { getAccessToken } from '@auth0/nextjs-auth0'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { accessToken } = await getAccessToken(req as any) 
  return new Response(JSON.stringify({ accessToken }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
