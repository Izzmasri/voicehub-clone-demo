"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, HomeIcon, MessageSquareText, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCredits } from "./dashboard-user-credits";

const pages = [
  {
    icon: HomeIcon,
    label: "Home",
    href: "/",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
  {
    icon: MessageSquareText,
    label: "Conversation",
    href: "/conversation",
  },
];

const user = {
  icon: User,
  label: "User Account",
  href: "/user",
};

export const DashboardSidebar = () => {
  const pathName = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" height={36} width={36} alt="logo" />
          <p className="text-2xl font-semibold">Voicehub.clone</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-100 text-[#133b89]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) => (
                <SidebarMenuItem key={page.href}>
                  <SidebarMenuButton
                    asChild
                    className="mt-4"
                    isActive={pathName === page.href}
                  >
                    <Link href={page.href}>
                      <page.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {page.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-black">
        <SidebarMenu className="mb-4">
          <UserCredits />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarFooter className="text-black">
        {/* <DashboardUserButton /> */}
        <SidebarMenu>
          <SidebarMenuItem key={user.href}>
            <SidebarMenuButton
              asChild
              className="mb-2"
              isActive={pathName === user.href}
            >
              <Link href={user.href}>
                <user.icon className="size-5" />
                <span className="text-sm font-medium tracking-tight">
                  {user.label}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
