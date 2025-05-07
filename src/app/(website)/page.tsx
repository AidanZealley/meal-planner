import { NewItemButton } from "../(app)/items/_components/NewItemButton";

export default async function DashboardPage() {
  return (
    <div className="relative grid gap-6">
      <div className="h-[9999px]">
        <span>Home</span>
      </div>
      <div className="sticky right-6 bottom-6 justify-self-end">
        <NewItemButton />
      </div>
    </div>
  );
}
