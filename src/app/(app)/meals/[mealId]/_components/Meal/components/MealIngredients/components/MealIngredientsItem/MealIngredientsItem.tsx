import { api } from "@/trpc/react";
import { type MealIngredientsItemProps } from "./MealIngredientsItem.types";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";

export const MealIngredientsItem = ({
  ingredient,
  mealId,
}: MealIngredientsItemProps) => {
  const { id, name, inStock } = ingredient;
  const utils = api.useUtils();

  const { mutate, isPending } =
    api.mealIngredients.removeIngredient.useMutation({
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
      <LoadingButton
        isLoading={isPending}
        size="icon-sm"
        onClick={handleRemoveIngredient}
      >
        <Minus />
      </LoadingButton>
      <span className={cn(!inStock ? "text-destructive line-through" : "")}>
        {name}
      </span>
    </div>
  );
};
