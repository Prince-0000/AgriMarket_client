// lib/navItems.ts
import { HomeIcon, SettingsIcon } from "lucide-react";
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
    label: "Auction List",
    href: "/farmer/auctions/list",
    icon: () => <HomeIcon size={18} />,
    roles: ["farmer"],
  },
  {
    label: "View Products",
    href: "/farmer/products/view",
    icon: () => <SettingsIcon size={18} />,
    roles: ["farmer"],
  },
  {
    label: "Products",
    href: "/retailer",
    icon: () => <HomeIcon size={18} />,
    roles: ["retailer"],
  },
   {
    label: "Join Auction",
    href: "/retailer/auctions",
    icon: () => <HomeIcon size={18} />,
    roles: ["retailer"],
  },
  
];
