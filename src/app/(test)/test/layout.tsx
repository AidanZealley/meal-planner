import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(app)/_components/AppSidebar";
import { AppHeader } from "@/app/(app)/_components/AppHeader";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="peer grid min-h-0 w-full grid-rows-[auto_1fr] content-start">
        <AppHeader />

        <div className="grid min-h-0 content-start">{children}</div>
      </div>
    </SidebarProvider>
  );
}
