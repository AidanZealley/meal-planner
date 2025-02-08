import { type RouterOutputs } from "@/trpc/react";

export type MealIngredientsProps = {
  mealIngredients?: RouterOutputs["mealIngredients"]["getAll"];
};
