"use client";

import { api } from "@/trpc/react";
import { IngredientHeader } from "./components/IngredientHeader";
import Link from "next/link";
import { type IngredientProps } from "./Ingredient.types";

export const Ingredient = ({ id }: IngredientProps) => {
  const [ingredient] = api.ingredients.getById.useSuspenseQuery({
    id,
  });

  const meals = ingredient?.mealIngredients.map(
    (mealIngredient) => mealIngredient.meal,
  );

  return (
    <div className="grid gap-12">
      <IngredientHeader ingredient={ingredient} />

      <div className="grid gap-3">
        <h3 className="text-lg font-medium">Used in these meals</h3>
        <div className="grid gap-3">
          {meals?.map((meal) => (
            <Link key={meal.id} href={`/meals/${meal.id}`}>
              {meal.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
