import { api, HydrateClient } from "@/trpc/server";
import { MealsList } from "./_components/MealsList";
import { NewMeal } from "./_components/NewMeal";

export default async function MealsPage() {
  void api.meals.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 py-6">
        <div className="grid gap-6 px-6">
          <h1 className="text-3xl font-bold">Meals</h1>
          <NewMeal />
        </div>

        <MealsList />
      </main>
    </HydrateClient>
  );
}
