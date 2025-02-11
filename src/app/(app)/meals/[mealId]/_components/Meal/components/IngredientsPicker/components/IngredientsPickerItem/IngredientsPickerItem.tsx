import { type IngredientsPickerItemProps } from "./IngredientsPickerItem.types";
import { api } from "@/trpc/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";

export const IngredientsPickerItem = ({
  ingredient,
  mealId,
}: IngredientsPickerItemProps) => {
  const { id, name, inStock } = ingredient;

  const utils = api.useUtils();

  const { mutate, isPending } = api.mealIngredients.pickIngredient.useMutation({
    onSuccess: async () => {
      await utils.mealIngredients.getAll.invalidate();
      await utils.meals.getById.invalidate({
        id: mealId,
      });
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const handlePickIngredient = () => {
    mutate({
      mealId,
      ingredientId: id,
    });
  };

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3">
      <LoadingButton
        variant="secondary"
        isLoading={isPending}
        size="icon-sm"
        onClick={handlePickIngredient}
      >
        <Plus />
      </LoadingButton>
      <span className={cn(!inStock ? "text-destructive line-through" : "")}>
        {name}
      </span>
    </div>
  );
};
