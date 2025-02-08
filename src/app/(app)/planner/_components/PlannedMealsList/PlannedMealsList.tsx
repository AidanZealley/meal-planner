"use client";

import { api } from "@/trpc/react";
import { PlannedMealsListItem } from "../PlannedMealsListItem";
import { PlannedMealsListProps } from "./PlannedMealsList.types";

export const PlannedMealsList = ({ status }: PlannedMealsListProps) => {
  const [plannedMeals] = api.plannedMeals.getAllByStatus.useSuspenseQuery({
    status,
  });

  return (
    <div className="grid gap-3">
      {plannedMeals.map((plannedMeal) => (
        <PlannedMealsListItem key={plannedMeal.id} plannedMeal={plannedMeal} />
      ))}
    </div>
  );
};
