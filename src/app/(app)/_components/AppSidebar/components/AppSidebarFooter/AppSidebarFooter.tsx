"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { initialsFromName } from "@/lib/utils";

export const AppSidebarFooter = () => {
  const { useSession, signOut } = authClient;
  const { data: session } = useSession();

  const router = useRouter();

  const user = session?.user;

  const initials = initialsFromName(user?.name);

  const handleSignOut = async () => {
    signOut();
    router.push("/");
  };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-14 w-full p-2">
                <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3">
                  <Avatar className="rounded-lg">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback className="text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid justify-start text-left">
                    <span className="font-bold">{user?.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="h-4 w-4" />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <span className="flex items-center gap-3">
                    <User />
                    Profile
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
