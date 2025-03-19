import { api } from "@/trpc/react";
import { type MealItemsItemProps } from "./MealItemsItem.types";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";

export const MealItemsItem = ({ mealItem }: MealItemsItemProps) => {
  const { id, item, mealId, amountRequired } = mealItem;
  const { id: itemId, name, amountAvailable, type } = item;

  const inStock = amountAvailable > 0;
  const useAmount = type === "amount";

  const utils = api.useUtils();

  const { mutate: deletemealItem, isPending: isPendingDeletemealItem } =
    api.mealItems.removeItem.useMutation({
      onSuccess: async () => {
        await utils.meals.getById.invalidate({
          id: mealId,
        });
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const {
    mutate: updateAmountRequired,
    isPending: isPendingUpdateAmountRequired,
  } = api.mealItems.updateAmountRequired.useMutation({
    onSuccess: async () => {
      await utils.meals.getById.invalidate({
        id: mealId,
      });
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const handleRemoveItem = () => {
    deletemealItem({
      mealId,
      itemId,
    });
  };

  const handleUpdateRequiredAmount = (amount: number) => {
    if (amountRequired === null) {
      return;
    }

    updateAmountRequired({
      id,
      amount: amountRequired + amount,
    });
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <LoadingButton
        variant="secondary"
        isLoading={isPendingDeletemealItem}
        size="icon-sm"
        onClick={handleRemoveItem}
      >
        <Minus />
      </LoadingButton>
      <span className={cn(!inStock ? "text-destructive line-through" : "")}>
        {name}
      </span>
      {useAmount && (
        <div className="flex items-center gap-1">
          <LoadingButton
            variant="outline"
            isLoading={isPendingUpdateAmountRequired}
            size="icon-sm"
            onClick={() => handleUpdateRequiredAmount(-1)}
          >
            <Minus />
          </LoadingButton>
          <span className="px-2">{amountRequired}</span>
          <LoadingButton
            variant="outline"
            isLoading={isPendingUpdateAmountRequired}
            size="icon-sm"
            onClick={() => handleUpdateRequiredAmount(1)}
          >
            <Plus />
          </LoadingButton>
        </div>
      )}
    </div>
  );
};
