import { type ShoppingListItemProps } from "./ShoppingListItem.types";
import { api } from "@/trpc/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/LoadingButton";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const ShoppingListItem = ({ item }: ShoppingListItemProps) => {
  const {
    amountNeeded,
    amountUnplanned,
    done,
    item: { id: itemId, name, type },
  } = item;
  const utils = api.useUtils();

  const { mutate: increaseQuantity, isPending: isIncreasePending } =
    api.shoppingList.increaseQuantity.useMutation({
      onSuccess: () => {
        Promise.all([
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
  const { mutate: decreaseQuantity, isPending: isDecreasePending } =
    api.shoppingList.decreaseQuantity.useMutation({
      onSuccess: () => {
        Promise.all([
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
  const { mutate: updateItem, isPending: isUpdatePending } =
    api.shoppingList.toggleDone.useMutation({
      onSuccess: () => {
        Promise.all([
          utils.shoppingList.getAll.invalidate(),
          utils.items.getAll.invalidate(),
        ]);
      },
    });

  const { mutate: deleteItem, isPending: isDeletePending } =
    api.shoppingList.delete.useMutation({
      onSuccess: () => {
        Promise.all([utils.shoppingList.getAll.invalidate()]);
      },
    });

  const handleUpdate = () => {
    if (!itemId) {
      return;
    }

    updateItem({ itemId, done: !done });
  };

  const handleIncrease = () => {
    increaseQuantity({ itemId });
  };

  const handleDecrease = () => {
    decreaseQuantity({ itemId });
  };

  const handleDelete = () => {
    deleteItem({ itemId });
  };

  const showQuantity = type === "amount";

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
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
              "transition-all",
              done ? "line-through opacity-30" : "",
            )}
          >
            {name}
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

      {showQuantity && (
        <div className="flex items-center gap-1">
          <LoadingButton
            isLoading={isDecreasePending}
            size="icon-sm"
            variant="ghost"
            onClick={handleDecrease}
            disabled={amountUnplanned === 0}
          >
            <Minus />
          </LoadingButton>
          <LoadingButton
            isLoading={isIncreasePending}
            size="icon-sm"
            variant="ghost"
            onClick={handleIncrease}
          >
            <Plus />
          </LoadingButton>
          <LoadingButton
            isLoading={isDeletePending}
            size="icon-sm"
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 />
          </LoadingButton>
        </div>
      )}
    </div>
  );
};
