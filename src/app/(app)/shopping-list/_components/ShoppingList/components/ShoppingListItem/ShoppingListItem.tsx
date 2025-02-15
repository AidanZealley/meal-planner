import { type ShoppingListItemProps } from "./ShoppingListItem.types";
import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/LoadingButton";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";

export const ShoppingListItem = ({ item }: ShoppingListItemProps) => {
  const {
    id,
    amountNeeded,
    done,
    ingredient: { name, useAmount },
  } = item;
  const utils = api.useUtils();

  const { mutate: updateItem, isPending: isUpdatePending } =
    api.shoppingList.update.useMutation({
      onSuccess: async () => {
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const { mutate: deleteItem, isPending: isDeletePending } =
    api.shoppingList.delete.useMutation({
      onSuccess: async () => {
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const handleUpdate = () => {
    if (!id) {
      return;
    }

    updateItem({ id, done: !done });
  };

  const handleDelete = () => {
    deleteItem({ id });
  };

  const showQuantity = useAmount;

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

      <LoadingButton
        isLoading={isDeletePending}
        size="icon-sm"
        variant="destructive"
        onClick={handleDelete}
      >
        <Trash2 />
      </LoadingButton>
    </div>
  );
};
