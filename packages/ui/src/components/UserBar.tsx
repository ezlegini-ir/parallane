"use client";

import { User } from "@parallane/database";
import { Button } from "@parallane/ui/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@parallane/ui/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  Headset,
  LogOut,
  PanelRight,
  TvMinimalPlay,
  User as UserIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Avatar from "./Avatar";

interface Props {
  user: User;
}

const UserBar = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="min-w-[175px] px-2">
        <Button variant={"outline"} className="justify-between">
          <div className="flex gap-2 items-center">
            <Avatar src={user?.image} size={26} />
            {user?.name || "User Panel"}
          </div>
          <ChevronDown className="text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>
                <DropdownMenuItem className="cursor-pointer py-2">
                  <item.icon className="text-primary/80" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              </Link>
            </div>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-slate-500 cursor-pointer"
        >
          <LogOut className="text-destructive" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const menuItems = [
  { label: "Dashboard", href: "/panel", icon: PanelRight },
  { label: "Courses", href: "/panel/courses", icon: TvMinimalPlay },
  { label: "Tickets", href: "/panel/tickets", icon: Headset },
  { label: "Profile", href: "/panel/profile", icon: UserIcon },
];

export default UserBar;
