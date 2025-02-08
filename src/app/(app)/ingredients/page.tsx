import { api, HydrateClient } from "@/trpc/server";
import { IngredientsList } from "./_components/IngredientsList";
import { NewIngredient } from "./_components/NewIngredient";

export default async function IngredientsPage() {
  void api.ingredients.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 p-6">
        <h1 className="text-3xl font-bold">Ingredients</h1>
        <NewIngredient />
        <IngredientsList />
      </main>
    </HydrateClient>
  );
}
