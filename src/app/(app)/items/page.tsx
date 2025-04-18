import { api, HydrateClient } from "@/trpc/server";
import { ItemsList } from "./_components/ItemsList";
import { NewItem } from "./_components/NewItem";

export default async function ItemsPage() {
  void api.items.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 py-6">
        <div className="grid gap-6 px-6 py-2">
          <h1 className="text-3xl font-bold">Items</h1>
          <NewItem />
        </div>
        <ItemsList />
      </main>
    </HydrateClient>
  );
}
