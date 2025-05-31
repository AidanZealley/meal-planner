import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";

import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { AppLogo } from "../_components/AppLogo";
import { ThemeToggle } from "../_components/ThemeToggle";

export default async function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAuthenticated = !!session?.user;

  return (
    <div className="relative grid grid-rows-[auto_1fr]">
      <div className="bg-background/60 sticky top-0 z-50 flex justify-center border-b px-4 backdrop-blur-sm md:px-6">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <AppLogo />
          </Link>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </>
            ) : null}
            <Button asChild variant="ghost">
              <Link href={isAuthenticated ? "/dashboard" : "/meals"}>
                <span className="flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
