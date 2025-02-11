"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import { Carrot, Utensils } from "lucide-react";
import { SidebarNavItem } from "../SidebarNavItem";

const items = [
  {
    title: "Meals",
    url: "/meals",
    icon: Utensils,
  },
  {
    title: "Ingredients",
    url: "/ingredients",
    icon: Carrot,
  },
];

export const SidebarManageNav = () => {
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
