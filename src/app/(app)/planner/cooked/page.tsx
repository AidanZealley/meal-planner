import { api, HydrateClient } from "@/trpc/server";
import { PlannedMealsList } from "../_components/PlannedMealsList";

export default async function PlannerPage() {
  void api.plannedMeals.getAllByStatus.prefetch({
    status: "cooked",
  });

  return (
    <HydrateClient>
      <main className="grid gap-6 p-6">
        <h1 className="text-3xl font-bold">Meal Planner</h1>
        <PlannedMealsList status="cooked" />
      </main>
    </HydrateClient>
  );
}
