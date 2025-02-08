import { api, HydrateClient } from "@/trpc/server";
import { PlannedMealsList } from "../_components/PlannedMealsList";

export default async function PlannerPage() {
  void api.plannedMeals.getAllByStatus.prefetch({
    status: "planned",
  });

  return (
    <HydrateClient>
      <main className="grid gap-6 py-6">
        <div className="px-6">
          <h1 className="text-3xl font-bold">Planned Meals</h1>
        </div>

        <PlannedMealsList status="planned" />
      </main>
    </HydrateClient>
  );
}
