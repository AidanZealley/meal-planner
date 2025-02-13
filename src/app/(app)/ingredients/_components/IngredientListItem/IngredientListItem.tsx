import { Button } from "@/components/ui/button";
import { type IngredientListItemProps } from "./IngredientListItem.types";
import { Pencil, X } from "lucide-react";
import { EditableIngredient } from "../EditableIngredient";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UpdateStockDrawer } from "../UpdateStockDrawer";
import { Badge } from "@/components/ui/badge";

export const IngredientListItem = ({
  ingredient,
  isEditingId,
  handleEdit,
}: IngredientListItemProps) => {
  const { id, name, inStock } = ingredient;

  const isEditing = isEditingId === id;

  const toggleEdit = () => {
    handleEdit(isEditing ? null : id);
  };

  const endEdit = () => {
    handleEdit(null);
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
            "flex items-center gap-3 transition-opacity",
            !isEditingId || isEditing ? "opacity-100" : "opacity-30",
          )}
        >
          {name}
          {!inStock && <Badge variant="destructive">Out of stock</Badge>}
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
        <UpdateStockDrawer ingredient={ingredient} />
      </div>
    </div>
  );
};
