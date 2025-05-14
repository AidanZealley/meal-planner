import { Suspense } from "react";

import { api, HydrateClient } from "@/trpc/server";
import { Item } from "./_components/Item";
import { Spinner } from "@/components/Spinner";

type ItemPageProps = {
  params: Promise<{ itemId: string }>;
};

export default async function Home({ params }: ItemPageProps) {
  const { itemId } = await params;

  void api.items.getById.prefetch({
    id: itemId,
  });

  return (
    <HydrateClient>
      <main className="p-6">
        <Suspense fallback={<Spinner />}>
          <Item id={itemId} />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
