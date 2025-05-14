import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookieStore = await cookies();

  const role = cookieStore.get("user_role")?.value || null;
  const roleId = cookieStore.get("role_id")?.value || null;
  const token = cookieStore.get("auth_token")?.value || null;

  return NextResponse.json({
    role,
    roleId,
    token,
  });
};
