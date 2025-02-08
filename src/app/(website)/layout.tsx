import { Button } from "@/components/ui/button";
import { AppLogo } from "../_components/AppLogo";
import Link from "next/link";

export default function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <div className="flex justify-center border-b px-6">
        <div className="flex h-16 w-full max-w-7xl items-center justify-between">
          <AppLogo />

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/meals">Launch App</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="w-100 max-w-7xl">{children}</div>
      </div>
    </div>
  );
}
