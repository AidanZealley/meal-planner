import { Button } from "@/components/ui/button";
import { type ShoppingListItemProps } from "./ShoppingListItem.types";
import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/LoadingButton";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";

export const ShoppingListItem = ({ item }: ShoppingListItemProps) => {
  const {
    ingredientId,
    done,
    ingredient: { name },
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
    updateItem({ ingredientId, done: !done });
  };

  const handleDelete = () => {
    deleteItem({ ingredientId });
  };

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
      <div className="grid grid-cols-[auto_1fr] items-center gap-3">
        <span className="relative grid place-items-center">
          <Checkbox
            checked={done}
            onCheckedChange={handleUpdate}
            className={cn(
              "transition-opacity",
              isUpdatePending ? "opacity-50" : "opacity-100",
            )}
          />

          {isUpdatePending && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </span>
          )}
        </span>

        <span>{name}</span>
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
