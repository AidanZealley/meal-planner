import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CounterProps } from "./Counter.types";

export const Counter = ({
  value,
  onDecrement,
  onIncrement,
  minValue = Infinity,
  maxValue = Infinity,
}: CounterProps) => {
  const handleDecrement = () => onDecrement(Math.max(minValue, value - 1));
  const handleIncrement = () => onIncrement(Math.min(maxValue, value + 1));

  return (
    <div className="outline-secondary flex min-w-24 items-center justify-between gap-1 rounded-lg p-0.5 outline-1 sm:min-w-28">
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleDecrement}
        disabled={value === minValue}
        type="button"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="px-2 text-sm">{value}</span>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleIncrement}
        disabled={value === maxValue}
        type="button"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};
