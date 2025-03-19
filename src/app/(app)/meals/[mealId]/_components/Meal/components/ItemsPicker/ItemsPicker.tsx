import { api } from "@/trpc/react";
import { ItemsPickerItem } from "./components/ItemsPickerItem";
import { type ItemsPickerProps } from "./ItemsPicker.types";

export const ItemsPicker = ({ mealId, mealItemIds }: ItemsPickerProps) => {
  const [items] = api.items.getAll.useSuspenseQuery();
  const unusedItems = mealItemIds
    ? items.filter((item) => !mealItemIds.includes(item.id))
    : items;

  return (
    <div className="grid gap-1">
      {unusedItems.map((item) => (
        <ItemsPickerItem key={item.id} item={item} mealId={mealId} />
      ))}
    </div>
  );
};
