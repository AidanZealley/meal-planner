import { useState } from "react";
import { Pencil, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditItemForm } from "../EditItemForm";
import type { EditableItemNameProps } from "./EditableItemName.types";

export const EditableItemName = ({ item }: EditableItemNameProps) => {
  const { name } = item;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="group relative grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg pl-2">
      {isEditing ? (
        <EditItemForm item={item} onUpdate={toggleEdit} />
      ) : (
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {name}
        </span>
      )}
      <Button size="icon-sm" variant="ghost" onClick={toggleEdit}>
        {isEditing ? <X /> : <Pencil />}
      </Button>
    </div>
  );
};
