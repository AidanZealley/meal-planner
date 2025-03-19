"use client";

import { api } from "@/trpc/react";
import { ShoppingListItem } from "./components/ShoppingListItem";

export const ShoppingList = () => {
  const [shoppingList] = api.shoppingList.getAll.useSuspenseQuery();

  return (
    <div className="grid gap-6">
      <h3 className="text-lg font-medium">Items</h3>

      <div className="grid gap-3">
        {shoppingList.map((item, index) => (
          <ShoppingListItem key={`${item.itemId}_${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};
