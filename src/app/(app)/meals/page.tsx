import { Suspense } from "react";

import { api, HydrateClient } from "@/trpc/server";
import { MealsList } from "./_components/MealsList";
import { NewMeal } from "./_components/NewMeal";
import { Spinner } from "@/components/Spinner";

export default async function MealsPage() {
  void api.meals.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 py-6">
        <div className="grid gap-6 px-6 py-2">
          <h1 className="text-3xl font-bold">Meals</h1>
          <NewMeal />
        </div>

        <Suspense fallback={<Spinner />}>
          <MealsList />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
