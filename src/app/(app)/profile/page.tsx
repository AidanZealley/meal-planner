import { api, HydrateClient } from "@/trpc/server";
import { UserProfile } from "./_components/UserProfile/UserProfile";

export default async function PlannerPage() {
  void api.users.getCurrentUser.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 p-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <UserProfile />
      </main>
    </HydrateClient>
  );
}
