import { Suspense } from "react";

import { api, HydrateClient } from "@/trpc/server";
import { PlannedMealsList } from "../_components/PlannedMealsList";
import { Spinner } from "@/components/Spinner";

export default async function CookedPage() {
  void api.plannedMeals.getAllByStatus.prefetch({
    status: "cooked",
  });

  return (
    <HydrateClient>
      <main className="grid gap-6 p-6">
        <h1 className="text-3xl font-bold">Cooked Meals</h1>
        <Suspense fallback={<Spinner />}>
          <PlannedMealsList status="cooked" />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
