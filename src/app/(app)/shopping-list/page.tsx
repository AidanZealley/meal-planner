import { api, HydrateClient } from "@/trpc/server";
import { ShoppingList } from "./_components/ShoppingList";

export default async function ShoppingListPage() {
  void api.shoppingList.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 p-6">
        <h1 className="text-3xl font-bold">Shopping List</h1>
        <ShoppingList />
      </main>
    </HydrateClient>
  );
}
