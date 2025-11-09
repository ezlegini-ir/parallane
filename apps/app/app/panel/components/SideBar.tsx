"use client";

import { loginPageRoute } from "@/middleware";
import { User } from "@parallane/database";
import Avatar from "@parallane/ui/components/Avatar";
import parallaneLogo from "@parallane/ui/components/parallaneLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@parallane/ui/components/ui/sidebar";
import {
  CreditCard,
  Headset,
  LogOut,
  PanelRight,
  Pencil,
  TvMinimalPlay,
  UserIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

interface Props {
  user: User | null | undefined;
}
export function SideBar({ user }: Props) {
  if (!user) return redirect(loginPageRoute);

  const pathName = usePathname();

  return (
    <Sidebar className="p-2 border-dashed border-muted bg-background">
      <SidebarHeader className="p-4 space-y-8">
        <Link href={"/"}>
          <parallaneLogo width={120} />
        </Link>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar src={user.image} />
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-[10px] text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>

          <Link href={"/panel/profile"} className="p-1">
            <Pencil size={14} className="text-muted-foreground" />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentMenu.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton size={"lg"} asChild>
                    <Link
                      href={item.href}
                      className={` ${pathName === item.href ? "bg-slate-900 text-primary" : "hover:bg-slate-900"}`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="mb-5">
          {footerMenu.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="cursor-pointer" onClick={() => signOut()}>
                <LogOut />
                <span>Log Out</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// CONTENT MENI ITEMS
const contentMenu = [
  {
    title: "Dashboard",
    href: "/panel",
    icon: PanelRight,
  },
  {
    title: "Courses",
    href: "/panel/courses",
    icon: TvMinimalPlay,
  },
  {
    title: "Tickets",
    href: "/panel/tickets",
    icon: Headset,
  },
  {
    title: "Payments",
    href: "/panel/payments",
    icon: CreditCard,
  },
];

// FOOTER MENU ITEMS
const footerMenu = [
  {
    title: "My Profile",
    href: "/panel/profile",
    icon: UserIcon,
  },
];
