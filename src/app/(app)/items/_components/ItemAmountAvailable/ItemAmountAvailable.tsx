import { api } from "@/trpc/react";
import { Minus, Plus } from "lucide-react";
import { LoadingButton } from "@/components/LoadingButton";
import type { ItemAmountAvailableProps } from "./ItemAmountAvailable.types";

export const ItemAmountAvailable = ({ item }: ItemAmountAvailableProps) => {
  const { id, amountAvailable } = item;

  const utils = api.useUtils();

  const { mutate: increaseAmountAvailable, isPending: isIncreasing } =
    api.items.increaseAmountAvailable.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
      },
    });

  const { mutate: decreaseAmountAvailable, isPending: isDecreasing } =
    api.items.decreaseAmountAvailable.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
      },
    });

  return (
    <div className="outline-secondary flex min-w-24 items-center justify-between gap-1 rounded-lg p-1 outline @md/item:min-w-32">
      <LoadingButton
        size="icon-xs"
        variant="ghost"
        isLoading={isDecreasing}
        onClick={() => {
          decreaseAmountAvailable({
            id,
            amount: 1,
          });
        }}
        disabled={amountAvailable === 0}
      >
        <Minus className="h-3 w-3" />
      </LoadingButton>
      <span className="px-2 text-sm">{amountAvailable}</span>
      <LoadingButton
        size="icon-xs"
        variant="ghost"
        isLoading={isIncreasing}
        onClick={() => {
          increaseAmountAvailable({
            id,
            amount: 1,
          });
        }}
      >
        <Plus className="h-3 w-3" />
      </LoadingButton>
    </div>
  );
};
