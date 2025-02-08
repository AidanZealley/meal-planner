"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { AppLogo } from "@/app/_components/AppLogo";
import { cn } from "@/lib/utils";

export const AppHeaderLogo = () => {
  const { open, isMobile } = useSidebar();

  return (
    <div
      className={cn(
        "transition-opacity",
        isMobile ? "opacity-100" : open ? "opacity-0" : "opacity-100",
      )}
    >
      <AppLogo />
    </div>
  );
};
