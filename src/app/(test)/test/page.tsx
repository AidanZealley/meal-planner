import { NewItemButton } from "@/app/(app)/items/_components/NewItemButton";

export default async function TestPage() {
  return (
    <main className="relative grid gap-6 py-6">
      <div className="grid h-[9999px] gap-6 px-6 py-2">
        <h1 className="text-3xl font-bold">Items</h1>
      </div>
      <NewItemButton />
    </main>
  );
}
