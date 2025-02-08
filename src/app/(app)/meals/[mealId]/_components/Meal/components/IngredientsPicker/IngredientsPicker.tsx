import { api } from "@/trpc/react";
import { IngredientsPickerItem } from "./components/IngredientsPickerItem";
import { IngredientsPickerProps } from "./IngredientsPicker.types";

export const IngredientsPicker = ({
  mealId,
  mealIngredientIds,
}: IngredientsPickerProps) => {
  const [ingredients] = api.ingredients.getAll.useSuspenseQuery();
  const unusedIngredients = mealIngredientIds
    ? ingredients.filter(
        (ingredient) => !mealIngredientIds.includes(ingredient.id),
      )
    : ingredients;

  return (
    <div className="grid gap-3">
      {unusedIngredients.map((ingredient) => (
        <IngredientsPickerItem
          key={ingredient.id}
          ingredient={ingredient}
          mealId={mealId}
        />
      ))}
    </div>
  );
};
