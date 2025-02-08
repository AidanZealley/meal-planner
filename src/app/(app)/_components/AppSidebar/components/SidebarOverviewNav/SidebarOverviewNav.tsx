"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import { SidebarNavItem } from "../SidebarNavItem";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
];

export const SidebarOverviewNav = () => {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map(({ title, url, icon }, index) => (
        <SidebarNavItem
          key={`${url}_${index}`}
          title={title}
          url={url}
          icon={icon}
          isActive={pathname.includes(url)}
        />
      ))}
    </SidebarMenu>
  );
};
