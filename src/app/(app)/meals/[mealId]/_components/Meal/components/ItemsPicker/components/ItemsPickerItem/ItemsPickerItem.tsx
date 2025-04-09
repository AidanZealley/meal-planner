import { type ItemsPickerItemProps } from "./ItemsPickerItem.types";
import { api } from "@/trpc/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { ItemDrawer } from "@/app/(app)/items/_components/ItemDrawer";

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
    <div className="-mx-2 grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl p-2 hover:bg-muted/50">
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
      <ItemDrawer item={item} />
    </div>
  );
};
