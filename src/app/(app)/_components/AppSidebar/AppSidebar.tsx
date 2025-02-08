import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/app/_components/AppLogo";
import { SidebarManageNav } from "./components/SidebarManageNav";
import { SidebarPlanNav } from "./components/SidebarPlanNav";
import { SidebarOverviewNav } from "./components/SidebarOverviewNav";
import { AppSidebarFooter } from "./components/AppSidebarFooter";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <AppLogo />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarOverviewNav />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarManageNav />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Plan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarPlanNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}
