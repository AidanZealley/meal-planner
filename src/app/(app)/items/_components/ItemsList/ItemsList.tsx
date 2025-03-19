"use client";

import { api } from "@/trpc/react";
import { ItemsListItem } from "../ItemsListItem";
import { useState } from "react";

export const ItemsList = () => {
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  const [items] = api.items.getAll.useSuspenseQuery();

  const handleEdit = (id: string | null) => {
    setIsEditingId(id);
  };

  return (
    <div className="grid gap-1 pl-3 pr-5">
      {items.map((item) => (
        <ItemsListItem
          key={item.id}
          item={item}
          isEditingId={isEditingId}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};
