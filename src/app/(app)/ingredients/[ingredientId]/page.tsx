import { api, HydrateClient } from "@/trpc/server";
import { Ingredient } from "./_components/Ingredient";

type IngredientPageProps = {
  params: Promise<{ ingredientId: string }>;
};

export default async function Home({ params }: IngredientPageProps) {
  const { ingredientId } = await params;

  void api.ingredients.getById.prefetch({
    id: ingredientId,
  });

  void api.ingredients.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="p-6">
        <Ingredient id={ingredientId} />
      </main>
    </HydrateClient>
  );
}
