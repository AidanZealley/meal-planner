"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import { ItemsListItem } from "../ItemsListItem";
import { ItemDrawer } from "../ItemDrawer";

export const ItemsList = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleSelectItem = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleOpenChange = (open: boolean) => {
    setSelectedItemId(open ? selectedItemId : null);
  };

  const [items] = api.items.getAll.useSuspenseQuery();

  return (
    <>
      <div className="grid gap-1 px-3">
        {items.map((item) => (
          <ItemsListItem
            key={item.id}
            item={item}
            selectItem={handleSelectItem}
          />
        ))}
      </div>

      <ItemDrawer
        item={
          selectedItemId
            ? items.find((item) => item.id === selectedItemId)
            : null
        }
        open={!!selectedItemId}
        onOpenChange={handleOpenChange}
      />
    </>
  );
};
