import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type ShoppingListItemProps = {
  item: ArrayElement<RouterOutputs["shoppingList"]["getAll"]>;
};
