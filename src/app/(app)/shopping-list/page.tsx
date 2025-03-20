import { api, HydrateClient } from "@/trpc/server";
import { ShoppingList } from "./_components/ShoppingList";
import { Separator } from "@/components/ui/separator";
import { AdditionalItemsPicker } from "./_components/AdditionalItemsPicker";
import { GenerateShoppingList } from "./_components/GenerateShoppingList";
import { ClearShoppingList } from "./_components/ClearShoppingList";

export default async function ShoppingListPage() {
  void api.shoppingList.getAll.prefetch();
  void api.items.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-8 p-6">
        <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Shopping List</h1>

          <div className="flex items-center gap-2">
            <ClearShoppingList />
            <GenerateShoppingList />
          </div>
        </div>
        <ShoppingList />
        <Separator />
        <AdditionalItemsPicker />
      </main>
    </HydrateClient>
  );
}
