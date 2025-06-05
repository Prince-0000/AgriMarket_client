/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navVertical";

interface SidebarProps {
  role: string | null;
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full bg-white text-green-900 flex flex-col justify-between border-r border-green-200">
      <div>
        <div className="p-6 text-xl font-bold border-b border-green-300">
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
                    isActive
                      ? "bg-green-700 font-semibold text-white"
                      : "hover:bg-green-100 text-green-800"
                  }`}
                >
                  {item.icon()}
                  <span>{item.label}</span>
                </Link>
              );
            })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
