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
    mutate: increaseAmountRequired,
    isPending: isPendingIncreaseAmountRequired,
  } = api.mealItems.increaseAmountRequired.useMutation({
    onSuccess: async () => {
      await utils.meals.getById.invalidate({
        id: mealId,
      });
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const {
    mutate: decreaseAmountRequired,
    isPending: isPendingDecreaseAmountRequired,
  } = api.mealItems.decreaseAmountRequired.useMutation({
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

  const handleIncreaseAmountRequired = () => {
    increaseAmountRequired({
      id,
      amount: 1,
    });
  };

  const handleDecreaseAmountRequired = () => {
    decreaseAmountRequired({
      id,
      amount: 1,
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
            variant="ghost"
            isLoading={isPendingDecreaseAmountRequired}
            size="icon-sm"
            onClick={handleDecreaseAmountRequired}
          >
            <Minus />
          </LoadingButton>
          <span className="min-w-6 px-1 text-center">{amountRequired}</span>
          <LoadingButton
            variant="ghost"
            isLoading={isPendingIncreaseAmountRequired}
            size="icon-sm"
            onClick={handleIncreaseAmountRequired}
          >
            <Plus />
          </LoadingButton>
        </div>
      )}
    </div>
  );
};
