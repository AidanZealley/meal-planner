import { Button } from "@/components/ui/button";
import { type ShoppingListItemProps } from "./ShoppingListItem.types";
import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const ShoppingListItem = ({ item }: ShoppingListItemProps) => {
  const {
    ingredientId,
    done,
    ingredient: { name },
  } = item;

  const utils = api.useUtils();

  const { mutate: updateItem } = api.shoppingList.update.useMutation({
    onSuccess: async () => {
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const { mutate: deleteItem } = api.shoppingList.delete.useMutation({
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
        <Checkbox checked={done} onCheckedChange={handleUpdate} />
        <span>{name}</span>
      </div>

      <Button size="icon-sm" variant="destructive" onClick={handleDelete}>
        <Trash2 />
      </Button>
    </div>
  );
};
