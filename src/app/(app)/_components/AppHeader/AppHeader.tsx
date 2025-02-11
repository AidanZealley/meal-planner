import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppHeaderLogo } from "./components/AppheaderLogo";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

export const AppHeader = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card/80 p-3 backdrop-blur-sm">
      <SidebarTrigger />
      <AppHeaderLogo />
      <ThemeToggle />
    </div>
  );
};
