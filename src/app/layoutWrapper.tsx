/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/navbar/verticalNav/sidebar";

const publicRoutes = ["/",];

export default function LayoutWrapper({
  children,
  role,
}: {
  children: React.ReactNode;
  role: any;
}) {
  const pathname = usePathname();
  const isPublic = publicRoutes.includes(pathname);

  return (
    <div className="flex min-h-screen">
      {!isPublic && (
        <div className="w-[20%] bg-black text-white">
          <Sidebar role={role} />
        </div>
      )}
      <div className={`${!isPublic ? "w-[80%]" : "w-full"} p-6 bg-white text-black dark:text-black`}>
        {children}
      </div>
    </div>
  );
}
