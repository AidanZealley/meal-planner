import { api } from "@/trpc/react";
import { type MealIngredientsItemProps } from "./MealIngredientsItem.types";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";

export const MealIngredientsItem = ({
  mealIngredient,
}: MealIngredientsItemProps) => {
  const { id, ingredient, mealId, amountRequired } = mealIngredient;
  const { id: ingredientId, name, inStock, useAmount } = ingredient;

  const utils = api.useUtils();

  const {
    mutate: deleteMealIngredient,
    isPending: isPendingDeleteMealIngredient,
  } = api.mealIngredients.removeIngredient.useMutation({
    onSuccess: async () => {
      await utils.meals.getById.invalidate({
        id: mealId,
      });
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const {
    mutate: updateAmountRequired,
    isPending: isPendingUpdateAmountRequired,
  } = api.mealIngredients.updateAmountRequired.useMutation({
    onSuccess: async () => {
      await utils.meals.getById.invalidate({
        id: mealId,
      });
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const handleRemoveIngredient = () => {
    deleteMealIngredient({
      mealId,
      ingredientId,
    });
  };

  const handleUpdateRequiredAmount = (amount: number) => {
    if (amountRequired === null) {
      return;
    }

    updateAmountRequired({
      id,
      amount: amountRequired + amount,
    });
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <LoadingButton
        isLoading={isPendingDeleteMealIngredient}
        size="icon-sm"
        onClick={handleRemoveIngredient}
      >
        <Minus />
      </LoadingButton>
      <span className={cn(!inStock ? "text-destructive line-through" : "")}>
        {name}
      </span>
      {useAmount && (
        <div className="flex items-center gap-1">
          <LoadingButton
            isLoading={isPendingUpdateAmountRequired}
            size="icon-sm"
            onClick={() => handleUpdateRequiredAmount(-1)}
          >
            <Minus />
          </LoadingButton>
          <span className="px-2">{amountRequired}</span>
          <LoadingButton
            isLoading={isPendingUpdateAmountRequired}
            size="icon-sm"
            onClick={() => handleUpdateRequiredAmount(1)}
          >
            <Plus />
          </LoadingButton>
        </div>
      )}
    </div>
  );
};
