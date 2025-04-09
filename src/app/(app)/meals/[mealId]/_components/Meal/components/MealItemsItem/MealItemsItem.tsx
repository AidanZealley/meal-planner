import { Minus } from "lucide-react";

import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { ItemDrawer } from "@/app/(app)/items/_components/ItemDrawer";
import { Counter } from "@/app/(app)/_components/Counter";
import { type MealItemsItemProps } from "./MealItemsItem.types";

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

  const { mutateAsync: increaseAmountRequired, isPending: isPendingIncrement } =
    api.mealItems.increaseAmountRequired.useMutation({
      onSuccess: async () => {
        await utils.meals.getById.invalidate({
          id: mealId,
        });
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const { mutateAsync: decreaseAmountRequired, isPending: isPendingDecrement } =
    api.mealItems.decreaseAmountRequired.useMutation({
      onSuccess: async () => {
        await utils.meals.getById.invalidate({
          id: mealId,
        });
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const decrement = async (newValue: number) => {
    await decreaseAmountRequired({
      id,
      amount: newValue,
    });
  };

  const increment = async (newValue: number) => {
    await increaseAmountRequired({
      id,
      amount: newValue,
    });
  };

  const handleRemoveItem = () => {
    deletemealItem({
      mealId,
      itemId,
    });
  };

  return (
    <>
      <div className="-mx-2 grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl p-2 hover:bg-muted/50">
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
        <div className="flex items-center gap-3">
          {useAmount && (
            <Counter
              value={amountRequired}
              onIncrement={increment}
              onDecrement={decrement}
              isPendingDecrement={isPendingDecrement}
              isPendingIncrement={isPendingIncrement}
              minValue={1}
            />
          )}
          <ItemDrawer item={item} />
        </div>
      </div>
    </>
  );
};
