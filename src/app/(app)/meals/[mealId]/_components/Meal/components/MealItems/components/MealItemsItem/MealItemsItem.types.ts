import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type MealItemsItemProps = {
  mealItem: ArrayElement<RouterOutputs["mealItems"]["getAll"]>;
};
