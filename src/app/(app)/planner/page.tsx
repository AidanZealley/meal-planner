import { api, HydrateClient } from "@/trpc/server";

export default async function PlannedPage() {
  void api.plannedMeals.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 p-6">
        <h1 className="text-3xl font-bold">Meal Planner</h1>
        <p>Summary</p>
      </main>
    </HydrateClient>
  );
}
