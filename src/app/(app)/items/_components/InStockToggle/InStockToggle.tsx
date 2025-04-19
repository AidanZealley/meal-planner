import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import type { InStockToggleProps } from "./InStockToggle.types";

export const InStockToggle = ({
  inStock,
  loading = false,
  onInStockChange,
}: InStockToggleProps) => {
  const handleChange = () => {
    onInStockChange(!inStock);
  };

  return (
    <LoadingButton
      variant="secondary"
      onClick={handleChange}
      className="group pl-2"
      type="button"
      isLoading={loading}
    >
      <span className="grid w-full grid-cols-[auto_1fr] items-center gap-2.5">
        <span
          className={cn(
            "bg-input dark:bg-input/75 grid h-5 w-5 place-items-center rounded-sm transition-colors",
            inStock ? "bg-primary text-primary-foreground dark:bg-primary" : "",
          )}
        >
          {inStock && (
            <Check className="text-secondary h-2 w-2 opacity-100 transition-opacity" />
          )}
        </span>
        <span className={cn("text-left", inStock ? "" : "line-through")}>
          In Stock
        </span>
      </span>
    </LoadingButton>
  );
};
