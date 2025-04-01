import { type ShoppingListItemProps } from "./ShoppingListItem.types";
import { api } from "@/trpc/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/LoadingButton";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useDebouncedCounter } from "@/app/(app)/hooks/useDebouncedCounter";

export const ShoppingListItem = ({ item }: ShoppingListItemProps) => {
  const {
    amountNeeded,
    amountUnplanned,
    done,
    item: { id: itemId, name, type },
  } = item;
  const utils = api.useUtils();

  const { mutateAsync: increaseQuantity, isPending: isIncreasePending } =
    api.shoppingList.increaseQuantity.useMutation({
      onSuccess: async () => {
        await Promise.all([
          utils.shoppingList.getAll.invalidate(),
          utils.items.getAll.invalidate(),
        ]);
      },
      onError: (error) => {
        toast("Failed to increase amount", {
          description: error.message,
        });
      },
    });
  const { mutateAsync: decreaseQuantity, isPending: isDecreasePending } =
    api.shoppingList.decreaseQuantity.useMutation({
      onSuccess: async () => {
        await Promise.all([
          utils.shoppingList.getAll.invalidate(),
          utils.items.getAll.invalidate(),
        ]);
      },
      onError: (error) => {
        toast("Failed to decrease amount", {
          description: error.message,
        });
      },
    });

  // Calculate planned items (total needed minus unplanned)
  const plannedItems = amountNeeded - amountUnplanned;

  const { debouncedValue, handleIncrement, handleDecrement } =
    useDebouncedCounter({
      value: amountUnplanned,
      onIncrement: async (newValue) => {
        const amount = newValue - amountUnplanned;
        await increaseQuantity({ itemId, amount });
      },
      onDecrement: async (newValue) => {
        const amount = amountUnplanned - newValue;
        await decreaseQuantity({ itemId, amount });
      },
      minValue: Math.max(1, plannedItems),
    });
  const { mutate: updateItem, isPending: isUpdatePending } =
    api.shoppingList.toggleDone.useMutation({
      onSuccess: async () => {
        await Promise.all([
          utils.shoppingList.getAll.invalidate(),
          utils.items.getAll.invalidate(),
        ]);
      },
    });

  const { mutate: deleteItem, isPending: isDeletePending } =
    api.shoppingList.delete.useMutation({
      onSuccess: async () => {
        await Promise.all([utils.shoppingList.getAll.invalidate()]);
      },
    });

  const handleUpdate = () => {
    if (!itemId) {
      return;
    }

    updateItem({ itemId, done: !done });
  };

  const handleDelete = () => {
    deleteItem({ itemId });
  };

  const showQuantity = type === "amount";

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-2">
      <div className="grid grid-cols-[auto_1fr] items-center gap-3">
        <span className="relative grid place-items-center">
          <Checkbox
            checked={done}
            onCheckedChange={handleUpdate}
            className={cn(
              "transition-opacity",
              isUpdatePending ? "opacity-0" : "opacity-100",
            )}
          />

          {isUpdatePending && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Spinner className="h-4 w-4" />
            </span>
          )}
        </span>

        <span className="flex items-center gap-3">
          <span
            className={cn(
              "grid transition-all",
              done ? "line-through opacity-30" : "",
            )}
          >
            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {name}
            </span>
          </span>
          {showQuantity && (
            <Badge
              variant="secondary"
              className={cn("transition-opacity", done ? "opacity-30" : "")}
            >
              {amountNeeded}
            </Badge>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {showQuantity && (
          <div className="flex min-w-24 items-center justify-between gap-1 rounded-lg p-1 outline outline-secondary sm:min-w-32">
            <LoadingButton
              variant="ghost"
              isLoading={isDecreasePending}
              size="icon-xs"
              onClick={handleDecrement}
              disabled={
                isDecreasePending || isIncreasePending || debouncedValue === 1
              }
            >
              <Minus className="h-3 w-3" />
            </LoadingButton>
            <span className="px-2 text-sm">{debouncedValue}</span>
            <LoadingButton
              variant="ghost"
              isLoading={isIncreasePending}
              size="icon-xs"
              onClick={handleIncrement}
              disabled={isDecreasePending || isIncreasePending}
            >
              <Plus className="h-3 w-3" />
            </LoadingButton>
          </div>
        )}
        <LoadingButton
          isLoading={isDeletePending}
          size="icon-sm"
          variant="destructive"
          onClick={handleDelete}
        >
          <Trash2 />
        </LoadingButton>
      </div>
    </div>
  );
};
