import { Plus } from "lucide-react";

import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { ItemDrawerToggle } from "@/app/(app)/items/_components/ItemDrawerToggle";
import { type ItemsPickerItemProps } from "./ItemsPickerItem.types";

export const ItemsPickerItem = ({ item, mealId }: ItemsPickerItemProps) => {
  const { id, name, amountAvailable } = item;

  const inStock = amountAvailable > 0;

  const utils = api.useUtils();

  const { mutate, isPending } = api.mealItems.pickItem.useMutation({
    onSuccess: async () => {
      await utils.mealItems.getAll.invalidate();
      await utils.meals.getById.invalidate({
        id: mealId,
      });
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const handlePickItem = () => {
    mutate({
      mealId,
      itemId: id,
    });
  };

  return (
    <div className="hover:bg-muted/50 -mx-2 grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl p-2">
      <LoadingButton
        variant="secondary"
        isLoading={isPending}
        size="icon-sm"
        onClick={handlePickItem}
      >
        <Plus />
      </LoadingButton>
      <span className={cn(!inStock ? "text-destructive line-through" : "")}>
        {name}
      </span>
      <ItemDrawerToggle item={item} />
    </div>
  );
};
