export const dynamic = "force-dynamic";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import { AppHeader } from "./_components/AppHeader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

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
