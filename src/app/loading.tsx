import { Spinner } from "@/components/Spinner";
import { AppLogo } from "./_components/AppLogo";

export default function Loading() {
  return (
    <div className="grid h-full min-h-0 place-items-center p-6">
      <div className="grid justify-items-center gap-3">
        <AppLogo />
        <Spinner />
      </div>
    </div>
  );
}
