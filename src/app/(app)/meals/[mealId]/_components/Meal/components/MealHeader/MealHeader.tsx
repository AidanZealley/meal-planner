import { Badge } from "@/components/ui/badge";
import { MealHeaderProps } from "./MealHeader.types";

export const MealHeader = ({ meal }: MealHeaderProps) => {
  const currentlyPlanned = meal?.plannedMeals.find(
    (plannedMeal) => plannedMeal.status === "planned",
  );
  const cookedCount = meal?.plannedMeals.filter(
    (plannedMeal) => plannedMeal.status === "cooked",
  ).length;
  const outOfStockCount = meal?.mealIngredients.filter(
    (mealIngredient) => !mealIngredient.ingredient.inStock,
  ).length;

  return (
    <div className="grid gap-6">
      <div className="flex flex-col items-start gap-3 py-6">
        <h1 className="text-3xl font-bold">{meal?.name}</h1>

        {currentlyPlanned && <Badge>{currentlyPlanned.status}</Badge>}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card flex flex-col items-center gap-3 rounded-lg p-6">
          <span className="text-4xl font-extralight">
            {meal?.mealIngredients.length}
          </span>
          <span className="text-muted-foreground">Ingredients</span>
        </div>

        <div className="bg-card flex flex-col items-center gap-3 rounded-lg p-6">
          <span className="text-4xl font-extralight">{cookedCount}</span>
          <span className="text-muted-foreground">Times cooked</span>
        </div>
      </div>

      <div className="text-destructive flex flex-col items-center gap-3 rounded-lg bg-red-600/10 p-6 text-red-400">
        <span className="text-4xl font-extralight">{outOfStockCount}</span>
        <span>Out of stock ingredient{outOfStockCount !== 1 && "s"}</span>
      </div>
    </div>
  );
};
