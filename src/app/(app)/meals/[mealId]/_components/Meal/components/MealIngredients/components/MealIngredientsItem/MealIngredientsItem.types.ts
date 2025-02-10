import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type MealIngredientsItemProps = {
  mealIngredient: ArrayElement<RouterOutputs["mealIngredients"]["getAll"]>;
};
