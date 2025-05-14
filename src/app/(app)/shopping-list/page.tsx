import { Suspense } from "react";

import { api, HydrateClient } from "@/trpc/server";
import { ShoppingList } from "./_components/ShoppingList";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/Spinner";
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
            <Suspense fallback={<Spinner />}>
              <ClearShoppingList />
              <GenerateShoppingList />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<Spinner />}>
          <ShoppingList />
          <Separator />
          <AdditionalItemsPicker />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
