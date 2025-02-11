"use client";

import { api } from "@/trpc/react";
import { PlannedMealsListItem } from "../PlannedMealsListItem";
import { type PlannedMealsListProps } from "./PlannedMealsList.types";

export const PlannedMealsList = ({ status }: PlannedMealsListProps) => {
  const [plannedMeals] = api.plannedMeals.getAllByStatus.useSuspenseQuery({
    status,
  });

  return (
    <div className="grid gap-1 pl-3 pr-5">
      {plannedMeals.map((plannedMeal) => (
        <PlannedMealsListItem key={plannedMeal.id} plannedMeal={plannedMeal} />
      ))}
    </div>
  );
};
