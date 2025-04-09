"use client";

import { type mealItemsProps } from "./MealItems.types";
import { MealItemsItem } from "../MealItemsItem";

export const MealItems = ({ mealItems }: mealItemsProps) => {
  return (
    <div className="grid gap-1">
      {mealItems?.map((mealItem) => (
        <MealItemsItem key={mealItem.itemId} mealItem={mealItem} />
      ))}
    </div>
  );
};
