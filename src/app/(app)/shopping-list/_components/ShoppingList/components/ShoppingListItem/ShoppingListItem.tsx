import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/LoadingButton";
import { Spinner } from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/app/(app)/_components/Counter";
import { type ShoppingListItemProps } from "./ShoppingListItem.types";

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
        await Promise.all([await utils.shoppingList.getAll.invalidate()]);
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
        await Promise.all([await utils.shoppingList.getAll.invalidate()]);
      },
      onError: (error) => {
        toast("Failed to decrease amount", {
          description: error.message,
        });
      },
    });

  const plannedItems = amountNeeded - amountUnplanned;

  const decrement = async (newValue: number) => {
    await decreaseQuantity({
      itemId,
      amount: amountUnplanned - newValue,
    });
  };

  const increment = async (newValue: number) => {
    await increaseQuantity({
      itemId,
      amount: newValue - amountUnplanned,
    });
  };

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
    <div className="-ml-2 -mr-2 grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl p-2 pl-3 hover:bg-muted/50">
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
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
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

      <div className="flex items-center gap-3">
        {showQuantity && (
          <Counter
            value={amountNeeded}
            onIncrement={increment}
            onDecrement={decrement}
            isPendingDecrement={isDecreasePending}
            isPendingIncrement={isIncreasePending}
            minValue={Math.max(1, plannedItems)}
          />
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
