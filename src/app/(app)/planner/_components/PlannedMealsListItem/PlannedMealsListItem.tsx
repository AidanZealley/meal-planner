"use client";

import { CookingPot, Trash2 } from "lucide-react";
import { api } from "@/trpc/react";
import { type PlannedMealsListItemProps } from "./PlannedMealsListItem.types";
import Link from "next/link";
import { PlannedMealStatusPicker } from "../PlannedMealStatusPicker";
import { LoadingButton } from "@/components/LoadingButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const PlannedMealsListItem = ({
  plannedMeal,
  onCookSuccess,
}: PlannedMealsListItemProps) => {
  const {
    id,
    mealId,
    status,
    meal: { name },
  } = plannedMeal;

  const [statusPickerOpen, setStatusPickerOpen] = useState(false);
  const utils = api.useUtils();

  const { mutate, isPending } = api.plannedMeals.delete.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.plannedMeals.getAllByStatus.invalidate({
          status: "planned",
        }),
        utils.plannedMeals.getAllByStatus.invalidate({
          status: "cooked",
        }),
        utils.meals.getAll.invalidate(),
      ]);
    },
  });

  const { mutate: cook, isPending: isCookPending } =
    api.plannedMeals.cook.useMutation<{
      booleanItems: { itemId: string; name: string }[];
    }>({
      onSuccess: async (data) => {
        onCookSuccess(data.booleanItems);

        await Promise.all([
          utils.plannedMeals.getAllByStatus.invalidate({
            status: "planned",
          }),
          utils.plannedMeals.getAllByStatus.invalidate({
            status: "cooked",
          }),
          utils.meals.getAll.invalidate(),
          utils.shoppingList.getAll.invalidate(),
          utils.items.getAll.invalidate(),
        ]);
      },
    });

  const handleDelete = () => {
    mutate({ mealId });
  };

  const handleCook = () => {
    cook({
      id,
    });
  };

  return (
    <>
      <div
        className={cn(
          "hover:bg-muted/50 relative -mr-1 -ml-3 grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg p-1 pl-3",
          statusPickerOpen ? "bg-muted" : "",
        )}
      >
        <span className="group-hover:overflow-hidden group-hover:text-ellipsis group-hover:whitespace-nowrap">
          {name}
        </span>
        <Link href={`/meals/${mealId}`} className="absolute inset-0" />
        <div className="flex items-center gap-2">
          <LoadingButton
            isLoading={isCookPending}
            size="icon-xs"
            onClick={handleCook}
          >
            <CookingPot className="h-4 w-4" />
          </LoadingButton>
          <PlannedMealStatusPicker
            id={id}
            mealId={mealId}
            status={status}
            open={statusPickerOpen}
            onOpenChange={setStatusPickerOpen}
          />
          <LoadingButton
            isLoading={isPending}
            size="icon-xs"
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 />
          </LoadingButton>
        </div>
      </div>
    </>
  );
};
