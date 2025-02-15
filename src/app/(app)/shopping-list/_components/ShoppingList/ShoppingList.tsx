"use client";

import { api } from "@/trpc/react";
import { ShoppingListItem } from "./components/ShoppingListItem";

export const ShoppingList = () => {
  const [shoppingList] = api.shoppingList.getAll.useSuspenseQuery();

  return (
    <div className="grid gap-6">
      <h3 className="text-lg font-medium">Ingredients</h3>

      <div className="grid gap-3">
        {shoppingList.map((item) => (
          <ShoppingListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
