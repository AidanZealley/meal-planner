import { api, HydrateClient } from "@/trpc/server";
import { AdditionalItem } from "./_components/AdditionalItem";

type AdditionalItemPageProps = {
  params: Promise<{ additionalItemId: string }>;
};

export default async function Home({ params }: AdditionalItemPageProps) {
  const { additionalItemId } = await params;

  void api.additionalItems.getById.prefetch({
    id: additionalItemId,
  });

  return (
    <HydrateClient>
      <main className="p-6">
        <AdditionalItem id={additionalItemId} />
      </main>
    </HydrateClient>
  );
}
