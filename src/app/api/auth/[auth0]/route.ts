/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/[...auth0]/route.ts
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";

const isProduction = process.env.NODE_ENV === "production";

export const GET = handleAuth({
  callback: handleCallback({
    afterCallback: async (req: any, session: any) => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user data");
          throw new Error("User fetch failed");
        }

        const user = await response.json();
        const cookieStore = await cookies();

        const cookieOptions = {
          httpOnly: true,
          secure: isProduction,
          sameSite: 'lax' as const,
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
        };

        // Set secure cookies
        if(user.role){
          cookieStore.set("user_role", user.role, cookieOptions);
        }

        const roleId =
          user.farmer?.farmer_id ||
          user.consumer?.consumer_id ||
          user.retailer?.retailer_id ||
          null;

        if (roleId) {
          cookieStore.set("role_id", roleId.toString(), cookieOptions);
        }

        cookieStore.set("auth_token", session.accessToken, cookieOptions);

        return session;
      } catch (err) {
        console.error("Callback error:", err);
        throw new Error("Authentication processing failed");
      }
    },
  }),
});

export const POST = handleAuth();
