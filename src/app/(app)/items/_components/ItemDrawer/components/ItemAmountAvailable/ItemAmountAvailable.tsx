import { api } from "@/trpc/react";
import { Counter } from "@/app/(app)/_components/Counter";
import { type ItemAmountAvailableProps } from "./ItemAmountAvailable.types";

export const ItemAmountAvailable = ({ item }: ItemAmountAvailableProps) => {
  const { id, amountAvailable } = item;

  const utils = api.useUtils();

  const { mutateAsync: increaseAmount, isPending: increasePending } =
    api.items.increaseAmountAvailable.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
        await utils.shoppingList.getAll.invalidate();
        await utils.meals.getById.invalidate();
      },
    });

  const { mutateAsync: decreaseAmount, isPending: decreasePending } =
    api.items.decreaseAmountAvailable.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
        await utils.shoppingList.getAll.invalidate();
        await utils.meals.getById.invalidate();
      },
    });

  const decrement = async (newValue: number) => {
    await decreaseAmount({
      id,
      amount: newValue,
    });
  };

  const increment = async (newValue: number) => {
    await increaseAmount({
      id,
      amount: newValue,
    });
  };

  return (
    <Counter
      value={amountAvailable}
      onIncrement={increment}
      onDecrement={decrement}
      isPendingDecrement={decreasePending}
      isPendingIncrement={increasePending}
      minValue={0}
    />
  );
};
