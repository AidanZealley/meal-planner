import { Button } from "@/components/ui/button";
import { type IngredientListItemProps } from "./IngredientListItem.types";
import { Pencil, SquareCheck, SquareX, Trash2, X } from "lucide-react";
import { EditableIngredient } from "../EditableIngredient";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";
import { LoadingButton } from "@/components/LoadingButton";

export const IngredientListItem = ({
  ingredient,
  isEditingId,
  handleEdit,
}: IngredientListItemProps) => {
  const { id, name, inStock } = ingredient;

  const isEditing = isEditingId === id;

  const utils = api.useUtils();

  const { mutate: deleteIngredient, isPending: isDeletePending } =
    api.ingredients.delete.useMutation({
      onSuccess: async () => {
        await utils.ingredients.getAll.invalidate();
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const { mutate: updateStock, isPending: isUpdatePending } =
    api.ingredients.updateStock.useMutation({
      onSuccess: async () => {
        await utils.ingredients.getAll.invalidate();
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const toggleEdit = () => {
    handleEdit(isEditing ? null : id);
  };

  const endEdit = () => {
    handleEdit(null);
  };

  const handleUpdateStock = () => {
    updateStock({
      id,
      inStock: !inStock,
    });
  };

  const handleDelete = () => {
    deleteIngredient({ id });
  };

  return (
    <div
      className={cn(
        "group relative grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg p-1 pl-3 hover:bg-muted/50",
        isEditing ? "bg-muted/50" : "",
      )}
    >
      <Link href={`/ingredients/${id}`} className="absolute inset-0" />
      {isEditing ? (
        <EditableIngredient ingredient={ingredient} onUpdate={endEdit} />
      ) : (
        <span
          className={cn(
            "transition-all",
            !isEditingId || isEditing ? "opacity-100" : "opacity-30",
            !inStock ? "text-destructive line-through" : "",
          )}
        >
          {name}
        </span>
      )}
      <div
        className={cn(
          "relative flex items-center gap-2 opacity-30 transition-opacity group-hover:opacity-100",
          isEditing ? "opacity-100" : "",
        )}
      >
        <Button size="icon-sm" variant="ghost" onClick={toggleEdit}>
          {isEditing ? <X /> : <Pencil />}
        </Button>
        <LoadingButton
          isLoading={isUpdatePending}
          size="icon-sm"
          variant="secondary"
          onClick={handleUpdateStock}
        >
          {inStock ? <SquareX /> : <SquareCheck />}
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
    </div>
  );
};
