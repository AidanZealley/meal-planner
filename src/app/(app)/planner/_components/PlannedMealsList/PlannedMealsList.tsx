"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import { StockDialog } from "@/app/(app)/_components/StockDialog";
import { PlannedMealsListItem } from "../PlannedMealsListItem";
import type { PlannedMealsListProps } from "./PlannedMealsList.types";
import type { StockItem } from "@/app/(app)/_components/StockDialog/StockDialog.types";

export const PlannedMealsList = ({ status }: PlannedMealsListProps) => {
  const [plannedMeals] = api.plannedMeals.getAllByStatus.useSuspenseQuery({
    status,
  });

  const [open, setOpen] = useState(false);
  const [cookedMealItems, setCookedMealItems] = useState<StockItem[]>([]);

  const handleCookSuccess = (items: StockItem[]) => {
    if (!items.length) {
      return;
    }

    setCookedMealItems(items);
    setOpen(true);
  };

  return (
    <>
      <div className="grid gap-1 pl-3 pr-5">
        {plannedMeals.map((plannedMeal) => (
          <PlannedMealsListItem
            key={plannedMeal.id}
            plannedMeal={plannedMeal}
            onCookSuccess={handleCookSuccess}
          />
        ))}
      </div>

      <StockDialog open={open} onOpenChange={setOpen} items={cookedMealItems} />
    </>
  );
};
