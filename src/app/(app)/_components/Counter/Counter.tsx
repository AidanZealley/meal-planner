import { Minus, Plus } from "lucide-react";
import { LoadingButton } from "@/components/LoadingButton";
import { useDebouncedCounter } from "../../hooks/useDebouncedCounter";
import type { CounterProps } from "./Counter.types";

export const Counter = ({
  value,
  onIncrement,
  onDecrement,
  isPendingDecrement,
  isPendingIncrement,
  minValue,
}: CounterProps) => {
  const { debouncedValue, handleIncrement, handleDecrement } =
    useDebouncedCounter({
      value,
      onIncrement: async (newValue) => {
        await onIncrement(newValue);
      },
      onDecrement: async (newValue) => {
        await onDecrement(newValue);
      },
      minValue,
    });

  const disabled = isPendingDecrement || isPendingIncrement;

  return (
    <div className="flex min-w-24 items-center justify-between gap-1 rounded-lg p-0.5 outline outline-1 outline-secondary sm:min-w-28">
      <LoadingButton
        variant="ghost"
        isLoading={isPendingDecrement}
        size="icon-xs"
        onClick={handleDecrement}
        disabled={disabled || debouncedValue === minValue}
      >
        <Minus className="h-3 w-3" />
      </LoadingButton>
      <span className="px-2 text-sm">{debouncedValue}</span>
      <LoadingButton
        variant="ghost"
        isLoading={isPendingIncrement}
        size="icon-xs"
        onClick={handleIncrement}
        disabled={disabled}
      >
        <Plus className="h-3 w-3" />
      </LoadingButton>
    </div>
  );
};
