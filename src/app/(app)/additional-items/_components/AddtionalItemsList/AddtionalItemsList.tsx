"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import { AddtionalItemListItem } from "../AddtionalItemListItem";

export const AddtionalItemsList = () => {
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  const [additionalItems] = api.additionalItems.getAll.useSuspenseQuery();

  const handleEdit = (id: string | null) => {
    setIsEditingId(id);
  };

  return (
    <div className="grid gap-1 pl-3 pr-5">
      {additionalItems.map((additionalItem) => (
        <AddtionalItemListItem
          key={additionalItem.id}
          additionalItem={additionalItem}
          isEditingId={isEditingId}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};
