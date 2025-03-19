import { api, HydrateClient } from "@/trpc/server";
import { Item } from "./_components/Item";

type ItemPageProps = {
  params: Promise<{ itemId: string }>;
};

export default async function Home({ params }: ItemPageProps) {
  const { itemId } = await params;

  void api.items.getById.prefetch({
    id: itemId,
  });

  void api.items.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="p-6">
        <Item id={itemId} />
      </main>
    </HydrateClient>
  );
}
