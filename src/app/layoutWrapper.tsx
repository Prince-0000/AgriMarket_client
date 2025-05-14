/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Sidebar from "@/components/navbar/verticalNav/sidebar";

const layoutRoutes = ["/farmer", "/retailer"];

export default function LayoutWrapper({
  children,
  role,
}: {
  children: React.ReactNode;
  role: any;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useUser();

  const isProtectedRoute = layoutRoutes.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users from protected routes
  if (!isLoading && isProtectedRoute && !user) {
    if (typeof window !== "undefined") {
      router.push("/access"); // Or your login page
    }
    return null; // Prevent rendering until redirect completes
  }

  const shouldShowLayout = isProtectedRoute && !!user;

  return (
    <div className="flex min-h-screen">
      {shouldShowLayout && (
        <div className="w-[20%] bg-black text-white">
          <Sidebar role={role} />
        </div>
      )}
      <div className={`${shouldShowLayout ? "w-[80%]" : "w-full"} p-6 bg-white text-black dark:text-black`}>
        {children}
      </div>
    </div>
  );
}
