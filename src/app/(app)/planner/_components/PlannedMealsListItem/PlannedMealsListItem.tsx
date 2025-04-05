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
          "group relative grid h-11 grid-cols-[1fr_auto] items-center gap-2 rounded-lg p-1 pl-3 hover:bg-muted",
          statusPickerOpen ? "bg-muted" : "",
        )}
      >
        <span className="group-hover:overflow-hidden group-hover:overflow-ellipsis group-hover:whitespace-nowrap">
          {name}
        </span>
        <Link href={`/meals/${mealId}`} className="absolute inset-0" />
        <div className="absolute right-1 flex items-center gap-2 group-hover:relative group-hover:right-0">
          <div
            className={cn(
              "flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100",
              statusPickerOpen ? "opacity-100" : "",
            )}
          >
            <LoadingButton
              isLoading={isCookPending}
              size="icon-sm"
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
              size="icon-sm"
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 />
            </LoadingButton>
          </div>
        </div>
      </div>
    </>
  );
};
