"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type SidebarNavItemProps } from "./SidebarNavItem.types";
import { usePathname, useRouter } from "next/navigation";

export const SidebarNavItem = ({ title, url, icon }: SidebarNavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === url;

  const { setOpenMobile } = useSidebar();

  const Icon = icon;

  const handleNavigate = () => {
    router.push(url);
    setOpenMobile(false);
  };

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton isActive={isActive} onClick={handleNavigate}>
        <Icon />
        <span>{title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
