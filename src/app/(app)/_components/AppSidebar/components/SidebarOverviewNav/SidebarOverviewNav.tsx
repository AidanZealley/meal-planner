"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import { SidebarNavItem } from "../SidebarNavItem";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
];

export const SidebarOverviewNav = () => {
  return (
    <SidebarMenu>
      {items.map(({ title, url, icon }, index) => (
        <SidebarNavItem
          key={`${url}_${index}`}
          title={title}
          url={url}
          icon={icon}
        />
      ))}
    </SidebarMenu>
  );
};
