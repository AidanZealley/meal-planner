import { NewItemButton } from "@/app/(app)/items/_components/NewItemButton";

export default async function TestPage() {
  return (
    <main className="grid gap-6 py-6">
      <div className="relative grid h-[9999px] gap-6 px-6 py-2">
        <h1 className="text-3xl font-bold">Items</h1>
        <NewItemButton />
      </div>
    </main>
  );
}
