"use client"
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from "@heroui/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";


export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarView() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useUser();

  const menuItems = [
    "Profile",
    "Dashboard",
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit"><Link color="foreground" href="/">AgriMarket</Link></p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit"><Link color="foreground" href="/">AgriMarket</Link></p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        {/* <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      
      <NavbarContent justify="end">
        {!user ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/api/auth/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="warning" href="/api/auth/login" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden md:flex">
              <p className="font-medium text-sm">Hello, {user.name}</p>
            </NavbarItem>
            <NavbarItem>
            
              <Dropdown>
                <DropdownTrigger>
                <Avatar
                as={Link}
                src={user.picture || "/default-avatar.png"}
                size="sm"
                className="cursor-pointer"
              />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions">
                  <DropdownItem key="profile">{user.name}</DropdownItem>
                  <DropdownItem key="dashboard">{user.email}</DropdownItem>
                  <DropdownItem key="logout" className="text-danger">
                    <Link color="danger" href='api/auth/logout'>Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

