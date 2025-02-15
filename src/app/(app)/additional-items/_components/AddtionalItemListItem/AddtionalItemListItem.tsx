import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { EditableAddtionalItem } from "../EditableAddtionalItem";
import { cn } from "@/lib/utils";
import { type AddtionalItemListItemProps } from "./AddtionalItemListItem.types";
import Link from "next/link";
import { AddtionalItemListItemMenu } from "../AddtionalItemListItemMenu";

export const AddtionalItemListItem = ({
  additionalItem,
  isEditingId,
  handleEdit,
}: AddtionalItemListItemProps) => {
  const { id, name } = additionalItem;

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
      <Link href={`/additional-items/${id}`} className="absolute inset-0" />
      {isEditing ? (
        <EditableAddtionalItem id={id} name={name} onUpdate={endEdit} />
      ) : (
        <div
          className={cn(
            "flex items-center gap-3 transition-opacity",
            !isEditingId || isEditing ? "opacity-100" : "opacity-30",
          )}
        >
          {name}
        </div>
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
        <AddtionalItemListItemMenu id={id} />
      </div>
    </div>
  );
};
