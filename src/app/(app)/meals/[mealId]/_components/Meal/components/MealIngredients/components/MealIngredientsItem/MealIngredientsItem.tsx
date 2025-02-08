import { api } from "@/trpc/react";
import { MealIngredientsItemProps } from "./MealIngredientsItem.types";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export const MealIngredientsItem = ({
  ingredient,
  mealId,
}: MealIngredientsItemProps) => {
  const { id, name, inStock } = ingredient;
  const utils = api.useUtils();

  const { mutate } = api.mealIngredients.removeIngredient.useMutation({
    onSuccess: async () => {
      await utils.meals.getById.invalidate({
        id: mealId,
      });
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const handleRemoveIngredient = () => {
    mutate({
      mealId,
      ingredientId: id,
    });
  };

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3">
      <Button size="icon-sm" onClick={handleRemoveIngredient}>
        <Minus />
      </Button>
      <span className={cn(!inStock ? "text-destructive line-through" : "")}>
        {name}
      </span>
    </div>
  );
};
