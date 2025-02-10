"use client";

import { type MealIngredientsProps } from "./MealIngredients.types";
import { MealIngredientsItem } from "./components/MealIngredientsItem";

export const MealIngredients = ({ mealIngredients }: MealIngredientsProps) => {
  return (
    <div className="grid gap-3">
      {mealIngredients?.map((mealIngredient) => (
        <MealIngredientsItem
          key={mealIngredient.ingredientId}
          mealIngredient={mealIngredient}
        />
      ))}
    </div>
  );
};
