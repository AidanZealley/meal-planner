import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type PlannedMealsListItemProps = {
  plannedMeal: ArrayElement<RouterOutputs["plannedMeals"]["getAllByStatus"]>;
  onCookSuccess: (items: { itemId: string; name: string }[]) => void;
};
