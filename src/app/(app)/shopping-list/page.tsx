import { api, HydrateClient } from "@/trpc/server";
import { ShoppingList } from "./_components/ShoppingList";
import { ShoppingAdditionalItemsList } from "./_components/ShoppingAdditionalItemsList";
import { Separator } from "@/components/ui/separator";
import { AdditionalItemsPicker } from "./_components/AdditionalItemsPicker";

export default async function ShoppingListPage() {
  void api.shoppingList.getAll.prefetch();
  void api.shoppingList.getAllAdditionalItems.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 p-6">
        <h1 className="text-3xl font-bold">Shopping List</h1>
        <ShoppingList />
        <Separator />
        <ShoppingAdditionalItemsList />
        <Separator />
        <AdditionalItemsPicker />
      </main>
    </HydrateClient>
  );
}
