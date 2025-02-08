import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type MealIngredientsItemProps = {
  ingredient: ArrayElement<RouterOutputs["ingredients"]["getAll"]>;
  mealId: string;
};
