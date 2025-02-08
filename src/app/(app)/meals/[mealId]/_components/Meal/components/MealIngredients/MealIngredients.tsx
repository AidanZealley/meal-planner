"use client";

import { MealIngredientsProps } from "./MealIngredients.types";
import { MealIngredientsItem } from "./components/MealIngredientsItem";

export const MealIngredients = ({ mealIngredients }: MealIngredientsProps) => {
  return (
    <div className="grid gap-3">
      {mealIngredients?.map((mealIngredient) => (
        <MealIngredientsItem
          key={mealIngredient.ingredientId}
          ingredient={mealIngredient.ingredient}
          mealId={mealIngredient.mealId}
        />
      ))}
    </div>
  );
};
