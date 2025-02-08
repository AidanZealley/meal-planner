import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppHeaderLogo } from "./components/AppheaderLogo";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

export const AppHeader = () => {
  return (
    <div className="bg-background/80 sticky top-0 flex items-center justify-between border-b p-3 backdrop-blur-sm">
      <SidebarTrigger />
      <AppHeaderLogo />
      <ThemeToggle />
    </div>
  );
};
