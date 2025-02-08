import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type PlannedMealsListItemProps = {
  plannedMeal: ArrayElement<RouterOutputs["plannedMeals"]["getAllByStatus"]>;
};
