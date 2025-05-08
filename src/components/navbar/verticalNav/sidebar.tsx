/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { LogOutIcon } from "lucide-react";
import { navItems } from "@/lib/navVertical";

interface SidebarProps {
  role: string | null;
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="w-full h-screen bg-white text-black flex flex-col justify-between">
      <div>
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          AgriMarket
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {navItems
            .filter((item) => item.roles.includes(role || "guest"))
            .map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded transition ${
                    isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon()}
                  <span>{item.label}</span>
                </Link>
              );
            })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <Button
          color="danger"
          fullWidth
          variant="flat"
          as={Link}
          href="/api/auth/logout"
          startContent={<LogOutIcon size={16} />}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
