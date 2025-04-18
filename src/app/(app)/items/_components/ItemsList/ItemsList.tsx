"use client";

import { api } from "@/trpc/react";
import { ItemsListItem } from "../ItemsListItem";
import { NewItemButton } from "../NewItemButton";

export const ItemsList = () => {
  const [items] = api.items.getAll.useSuspenseQuery();

  return (
    <div className="relative grid gap-6">
      <div className="grid gap-1 px-3">
        {items.map((item) => (
          <ItemsListItem key={item.id} item={item} />
        ))}
      </div>

      <NewItemButton />
    </div>
  );
};
