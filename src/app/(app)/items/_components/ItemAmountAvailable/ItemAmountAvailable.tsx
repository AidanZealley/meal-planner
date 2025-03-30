import { api } from "@/trpc/react";
import { LoadingButton } from "@/components/LoadingButton";
import { Minus, Plus } from "lucide-react";
import { type ItemAmountAvailableProps } from "./ItemAmountAvailable.types";
import { useDebouncedCounter } from "@/app/(app)/hooks/useDebouncedCounter";

export const ItemAmountAvailable = ({ item }: ItemAmountAvailableProps) => {
  const { id, amountAvailable } = item;

  const utils = api.useUtils();

  const { mutateAsync: increaseAmount, isPending: increasePending } =
    api.items.increaseAmountAvailable.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
      },
    });

  const { mutateAsync: decreaseAmount, isPending: decreasePending } =
    api.items.decreaseAmountAvailable.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
      },
    });

  const { debouncedValue, handleIncrement, handleDecrement } =
    useDebouncedCounter({
      value: amountAvailable,
      onIncrement: async (totalValue) => {
        await increaseAmount({
          id,
          amount: totalValue,
        });
      },
      onDecrement: async (totalValue) => {
        await decreaseAmount({
          id,
          amount: Math.max(0, totalValue),
        });
      },
      minValue: 0,
      timeout: 500,
    });

  return (
    <div className="flex min-w-24 items-center justify-between gap-1 rounded-lg p-1 outline outline-secondary sm:min-w-32">
      <LoadingButton
        size="icon-xs"
        variant="ghost"
        isLoading={decreasePending}
        onClick={handleDecrement}
        disabled={decreasePending || increasePending || debouncedValue === 0}
      >
        <Minus className="h-3 w-3" />
      </LoadingButton>
      <span className="px-2 text-sm">{debouncedValue}</span>
      <LoadingButton
        size="icon-xs"
        variant="ghost"
        isLoading={increasePending}
        onClick={handleIncrement}
        disabled={decreasePending || increasePending}
      >
        <Plus className="h-3 w-3" />
      </LoadingButton>
    </div>
  );
};
