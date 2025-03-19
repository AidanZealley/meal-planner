import { api, HydrateClient } from "@/trpc/server";
import { Meal } from "./_components/Meal";

type MealPageProps = {
  params: Promise<{ mealId: string }>;
};

export default async function Home({ params }: MealPageProps) {
  const { mealId } = await params;

  void api.meals.getById.prefetch({
    id: mealId,
  });

  void api.mealItems.getAll.prefetch({
    mealId,
  });

  void api.items.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="p-6">
        <Meal id={mealId} />
      </main>
    </HydrateClient>
  );
}
