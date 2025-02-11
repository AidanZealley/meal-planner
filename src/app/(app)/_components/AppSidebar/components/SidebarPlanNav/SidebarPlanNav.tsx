"use client";

import { SidebarMenu, SidebarMenuSub } from "@/components/ui/sidebar";
import { Calendar, ListCheck } from "lucide-react";
import { SidebarNavItem } from "../SidebarNavItem";
import { SidebarSubNavItem } from "../SidebarSubNavItem";
import { Fragment } from "react";

const items = [
  {
    title: "Meal Planner",
    url: "/planner",
    icon: Calendar,
    subItems: [
      {
        title: "Planned",
        url: "/planner/planned",
      },
      {
        title: "Cooked",
        url: "/planner/cooked",
      },
    ],
  },
  {
    title: "Shopping List",
    url: "/shopping-list",
    icon: ListCheck,
  },
];

export const SidebarPlanNav = () => {
  return (
    <SidebarMenu>
      {items.map(({ title, url, icon, subItems }, index) => (
        <Fragment key={`${url}_${index}`}>
          <SidebarNavItem title={title} url={url} icon={icon} />
          {subItems && (
            <SidebarMenuSub>
              {subItems.map((subItem) => (
                <SidebarSubNavItem
                  key={`${subItem.url}_${index}`}
                  title={subItem.title}
                  url={subItem.url}
                />
              ))}
            </SidebarMenuSub>
          )}
        </Fragment>
      ))}
    </SidebarMenu>
  );
};
