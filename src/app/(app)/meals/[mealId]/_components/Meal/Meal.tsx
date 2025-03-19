"use client";

import { api } from "@/trpc/react";
import { ItemsPicker } from "./components/ItemsPicker";
import { MealItems } from "./components/MealItems";
import { NewItem } from "@/app/(app)/items/_components/NewItem";
import { Separator } from "@/components/ui/separator";
import { MealHeader } from "./components/MealHeader";
import { type MealProps } from "./Meal.types";
import { Badge } from "@/components/ui/badge";

export const Meal = ({ id }: MealProps) => {
  const [meal] = api.meals.getById.useSuspenseQuery({
    id,
  });

  const mealItemIds = meal?.mealItems.map((mealItem) => mealItem.itemId);
  const outOfStockCount = meal?.mealItems.filter(
    (mealItem) =>
      mealItem.item.type === "boolean" && !mealItem.item.amountAvailable,
  ).length;

  return (
    <div className="grid gap-12">
      <MealHeader meal={meal} />

      <div className="grid gap-3">
        <h3 className="flex items-center gap-3 text-lg font-medium">
          Meal Items
          {outOfStockCount !== 0 && (
            <Badge variant="destructive">{outOfStockCount} out of stock</Badge>
          )}
        </h3>
        <MealItems mealItems={meal?.mealItems} />
      </div>
      <div className="grid gap-6">
        <Separator />

        <div className="grid gap-3">
          <h3 className="text-lg font-medium">Unused Items</h3>
          <div className="grid gap-6">
            <NewItem />
            <ItemsPicker mealId={id} mealItemIds={mealItemIds} />
          </div>
        </div>
      </div>
    </div>
  );
};
