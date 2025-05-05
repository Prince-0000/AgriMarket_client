// app/api/custom-logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const logoutURL = `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.AUTH0_LOGOUT_REDIRECT}`;

  const response = NextResponse.redirect(logoutURL);

  // Clear your app's cookies
  response.cookies.delete('appSession');
  response.cookies.delete('auth_token');
  response.cookies.delete('user_role');

  return response;
}
