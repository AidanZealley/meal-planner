import { HydrateClient } from "@/trpc/server";

export default async function MealsPage() {
  return (
    <HydrateClient>
      <main className="grid gap-6 p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </main>
    </HydrateClient>
  );
}
