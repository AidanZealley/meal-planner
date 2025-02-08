"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarNavItemProps } from "./SidebarNavItem.types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SidebarNavItem = ({
  title,
  url,
  icon,
  isActive,
}: SidebarNavItemProps) => {
  const router = useRouter();

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
