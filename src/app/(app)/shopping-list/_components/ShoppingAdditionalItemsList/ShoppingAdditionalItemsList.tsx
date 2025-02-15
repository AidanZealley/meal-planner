"use client";

import { api } from "@/trpc/react";
import { ShoppingAdditionalItemsListItem } from "./components/ShoppingAdditionalItemsListItem";

export const ShoppingAdditionalItemsList = () => {
  const [additionalItems] =
    api.shoppingList.getAllAdditionalItems.useSuspenseQuery();

  return (
    <div className="grid gap-6">
      <h3 className="text-lg font-medium">Additional Items</h3>

      <div className="grid gap-3">
        {additionalItems.map((item) => (
          <ShoppingAdditionalItemsListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
