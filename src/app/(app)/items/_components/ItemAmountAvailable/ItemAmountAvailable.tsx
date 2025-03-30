import { useEffect, useState, useRef } from "react";
import { api } from "@/trpc/react";
import { LoadingButton } from "@/components/LoadingButton";
import { Minus, Plus } from "lucide-react";
import { type ItemAmountAvailableProps } from "./ItemAmountAvailable.types";

export const ItemAmountAvailable = ({ item }: ItemAmountAvailableProps) => {
  const { id, amountAvailable } = item;

  const [pendingChange, setPendingChange] = useState<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const utils = api.useUtils();

  const { mutate: increaseAmount, isPending: increasePending } =
    api.items.increaseAmountAvailable.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
        setPendingChange(0);
      },
    });

  const { mutate: decreaseAmount, isPending: decreasePending } =
    api.items.decreaseAmountAvailable.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
        setPendingChange(0);
      },
    });

  const handleIncrement = () => {
    const newPendingChange = pendingChange + 1;
    const newAmount = amountAvailable + newPendingChange;

    setPendingChange(newPendingChange);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      increaseAmount({ id, amount: newAmount });
    }, 500);
  };

  const handleDecrement = () => {
    const newPendingChange = Math.max(pendingChange - 1, -amountAvailable);
    const newAmount = Math.max(0, amountAvailable + newPendingChange);

    setPendingChange(newPendingChange);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      decreaseAmount({ id, amount: newAmount });
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex min-w-24 items-center justify-between gap-1 rounded-lg p-1 outline outline-secondary sm:min-w-32">
      <LoadingButton
        size="icon-xs"
        variant="ghost"
        isLoading={decreasePending}
        onClick={handleDecrement}
        disabled={
          decreasePending ||
          increasePending ||
          pendingChange + amountAvailable === 0
        }
      >
        <Minus className="h-3 w-3" />
      </LoadingButton>
      <span className="px-2 text-sm">
        {pendingChange !== 0
          ? pendingChange + amountAvailable
          : amountAvailable}
      </span>
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
