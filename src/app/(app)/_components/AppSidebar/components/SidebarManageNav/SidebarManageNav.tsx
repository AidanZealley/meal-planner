"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import { Carrot, ShoppingBasket, Utensils } from "lucide-react";
import { SidebarNavItem } from "../SidebarNavItem";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Meals",
    url: "/meals",
    icon: Utensils,
  },
  {
    title: "Items",
    url: "/items",
    icon: Carrot,
  },
];

export const SidebarManageNav = () => {
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
