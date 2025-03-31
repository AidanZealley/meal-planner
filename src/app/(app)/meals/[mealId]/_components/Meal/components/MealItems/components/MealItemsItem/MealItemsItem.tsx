import { api } from "@/trpc/react";
import { type MealItemsItemProps } from "./MealItemsItem.types";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { useDebouncedCounter } from "@/app/(app)/hooks/useDebouncedCounter";

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

  const { debouncedValue, handleIncrement, handleDecrement } =
    useDebouncedCounter({
      value: amountRequired,
      onIncrement: async (newValue) => {
        await increaseAmountRequired({
          id,
          amount: newValue,
        });
      },
      onDecrement: async (newValue) => {
        await decreaseAmountRequired({
          id,
          amount: newValue,
        });
      },
      minValue: 1,
    });

  const handleRemoveItem = () => {
    deletemealItem({
      mealId,
      itemId,
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
        <div className="flex min-w-24 items-center justify-between gap-1 rounded-lg p-1 outline outline-secondary sm:min-w-32">
          <LoadingButton
            variant="ghost"
            isLoading={isPendingDecrement}
            size="icon-xs"
            onClick={handleDecrement}
            disabled={
              isPendingDecrement || isPendingIncrement || debouncedValue === 0
            }
          >
            <Minus className="h-3 w-3" />
          </LoadingButton>
          <span className="px-2 text-sm">{debouncedValue}</span>
          <LoadingButton
            variant="ghost"
            isLoading={isPendingIncrement}
            size="icon-xs"
            onClick={handleIncrement}
            disabled={isPendingDecrement || isPendingIncrement}
          >
            <Plus className="h-3 w-3" />
          </LoadingButton>
        </div>
      )}
    </div>
  );
};
