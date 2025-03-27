"use client";

import { api } from "@/trpc/react";
import { ItemsListItem } from "../ItemsListItem";
import { useState } from "react";

export const ItemsList = () => {
  const [isExpandedId, setIsExpandedId] = useState<string | null>(null);

  const [items] = api.items.getAll.useSuspenseQuery();

  const handleEdit = (id: string | null) => {
    setIsExpandedId(id);
  };

  return (
    <div className="grid gap-1 px-3">
      {items.map((item) => (
        <ItemsListItem
          key={item.id}
          item={item}
          isExpandedId={isExpandedId}
          handleExpanded={handleEdit}
        />
      ))}
    </div>
  );
};
