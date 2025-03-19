import { Button } from "@/components/ui/button";
import { type ItemsListItemProps } from "./ItemsListItem.types";
import { Pencil, X } from "lucide-react";
import { EditableItem } from "../EditableItem";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UpdateStockDrawer } from "../UpdateStockDrawer";
import { Badge } from "@/components/ui/badge";

export const ItemsListItem = ({
  item,
  isEditingId,
  handleEdit,
}: ItemsListItemProps) => {
  const { id, name, type, amountAvailable } = item;

  const isEditing = isEditingId === id;
  const inStock = amountAvailable > 0;
  const showQuantity = type === "amount";

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
      <Link href={`/items/${id}`} className="absolute inset-0" />
      {isEditing ? (
        <EditableItem item={item} onUpdate={endEdit} />
      ) : (
        <span
          className={cn(
            "flex items-center gap-3 transition-opacity",
            !isEditingId || isEditing ? "opacity-100" : "opacity-30",
          )}
        >
          {name}
          {showQuantity && <Badge variant="secondary">{amountAvailable}</Badge>}
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
        <UpdateStockDrawer item={item} />
      </div>
    </div>
  );
};
