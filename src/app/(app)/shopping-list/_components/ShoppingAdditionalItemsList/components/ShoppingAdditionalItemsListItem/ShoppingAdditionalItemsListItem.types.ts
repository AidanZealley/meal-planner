import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type ShoppingAdditionalItemsListItemProps = {
  item: ArrayElement<RouterOutputs["shoppingList"]["getAllAdditionalItems"]>;
};
