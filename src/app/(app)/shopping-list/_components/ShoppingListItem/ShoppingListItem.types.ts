import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type ShoppingListItemProps = {
  item: ArrayElement<RouterOutputs["shoppingList"]["getAll"]>;
};
