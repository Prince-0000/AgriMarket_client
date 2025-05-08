// lib/navItems.ts
import { HomeIcon, SettingsIcon, UserIcon, ShieldCheckIcon } from "lucide-react";
import { JSX } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: () => JSX.Element;
  roles: string[];
}

export const navItems: NavItem[] = [
  {
    label: "Create Auction",
    href: "/farmer/auctions/create",
    icon: () => <HomeIcon size={18} />,
    roles: ["farmer"],
  },
  {
    label: "Dashboard",
    href: "/farmer",
    icon: () => <HomeIcon size={18} />,
    roles: ["farmer"],
  },
  {
    label: "Auction List",
    href: "/farmer/auctions/list",
    icon: () => <HomeIcon size={18} />,
    roles: ["farmer"],
  },
  {
    label: "Add Products",
    href: "/farmer/products/add",
    icon: () => <UserIcon size={18} />,
    roles: ["farmer"],
  },
  {
    label: "View Products",
    href: "/farmer/products/view",
    icon: () => <SettingsIcon size={18} />,
    roles: ["farmer"],
  },
  {
    label: "Manage Inventory",
    href: "/farmer",
    icon: () => <ShieldCheckIcon size={18} />,
    roles: ["farmer"],
  },

  {
    label: "Dashboard",
    href: "/dashboard",
    icon: () => <HomeIcon size={18} />,
    roles: ["admin", "supplier"],
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: () => <HomeIcon size={18} />,
    roles: ["admin", "retailer"],
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: () => <HomeIcon size={18} />,
    roles: ["admin", "consumer"],
  },
];
