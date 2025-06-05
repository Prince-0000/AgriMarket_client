import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  // Clear custom cookies
  cookieStore.delete("auth_token");
  cookieStore.delete("role_id");
  cookieStore.delete("user_role");

  // Redirect to Auth0 logout (adjust domain and client_id accordingly)
  // const returnTo = encodeURIComponent("http://localhost:3000"); // Change to your desired return URL
  const logoutURL = `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.AUTH0_LOGOUT_REDIRECT}`;
  return NextResponse.redirect(logoutURL);
}
