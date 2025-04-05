import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { type StockItemFieldProps } from "./StockItemField.types";

export const StockItemField = ({ item, field }: StockItemFieldProps) => {
  const checked = field.value?.includes(item.itemId);

  const handleCheckedChange = (checked: boolean) => {
    const value = field.value || [];
    return checked
      ? field.onChange([...value, item.itemId])
      : field.onChange(value.filter((id) => id !== item.itemId));
  };

  return (
    <FormControl>
      <Button
        onClick={() => handleCheckedChange(!checked)}
        variant="outline"
        size="lg"
        className={cn(
          "group pl-2",
          checked
            ? "border-transparent bg-secondary/60 hover:bg-secondary/75"
            : "",
        )}
        type="button"
      >
        <span className="grid w-full grid-cols-[auto_1fr] items-center gap-3">
          <span
            className={cn(
              "rounded-full p-1 transition-colors",
              checked
                ? "bg-foreground"
                : "bg-foreground/10 group-hover:bg-foreground/20",
            )}
          >
            <X
              className={cn(
                "h-2 w-2 transition-opacity group-hover:opacity-100",
                checked ? "text-red-400 opacity-100" : "opacity-40",
              )}
            />
          </span>
          <span className={cn("text-left", checked ? "line-through" : "")}>
            {item.name}
          </span>
        </span>
      </Button>
    </FormControl>
  );
};
