import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type IngredientsPickerItemProps = {
  ingredient: ArrayElement<RouterOutputs["ingredients"]["getAll"]>;
  mealId: string;
};
