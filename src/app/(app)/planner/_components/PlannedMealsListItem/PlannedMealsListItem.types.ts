import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type PlannedMealsListItemProps = {
  plannedMeal: ArrayElement<RouterOutputs["plannedMeals"]["getAllByStatus"]>;
};
