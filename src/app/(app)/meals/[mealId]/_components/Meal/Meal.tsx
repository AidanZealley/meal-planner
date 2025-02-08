"use client";

import { api } from "@/trpc/react";
import { IngredientsPicker } from "./components/IngredientsPicker";
import { MealIngredients } from "./components/MealIngredients";
import { NewIngredient } from "@/app/(app)/ingredients/_components/NewIngredient";
import { Separator } from "@/components/ui/separator";
import { MealHeader } from "./components/MealHeader";
import { MealProps } from "./Meal.types";

export const Meal = ({ id }: MealProps) => {
  const [meal] = api.meals.getById.useSuspenseQuery({
    id,
  });

  const mealIngredientIds = meal?.mealIngredients.map(
    (mealIngredient) => mealIngredient.ingredientId,
  );

  return (
    <div className="grid gap-12">
      <MealHeader meal={meal} />

      <div className="grid gap-3">
        <h3 className="text-lg font-medium">Meal Ingredients</h3>
        <MealIngredients mealIngredients={meal?.mealIngredients} />
      </div>
      <div className="grid gap-6">
        <Separator />

        <div className="grid gap-3">
          <h3 className="text-lg font-medium">Unused Ingredients</h3>
          <div className="grid gap-6">
            <NewIngredient />
            <IngredientsPicker
              mealId={id}
              mealIngredientIds={mealIngredientIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
