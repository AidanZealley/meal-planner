import { RouterOutputs } from "@/trpc/react";

export type MealIngredientsProps = {
  mealIngredients?: RouterOutputs["mealIngredients"]["getAll"];
};
