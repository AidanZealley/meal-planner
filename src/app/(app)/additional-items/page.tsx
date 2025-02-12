import { api, HydrateClient } from "@/trpc/server";
import { AddtionalItemsList } from "./_components/AddtionalItemsList";
import { NewAddtionalItem } from "./_components/NewAddtionalItem";

export default async function AdditionalItemsPage() {
  void api.additionalItems.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="grid gap-6 py-6">
        <div className="grid gap-6 px-6 py-2">
          <h1 className="text-3xl font-bold">Additional Items</h1>
          <NewAddtionalItem />
        </div>

        <AddtionalItemsList />
      </main>
    </HydrateClient>
  );
}
