"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type PlannedMealStatusPickerProps } from "./PlannedMealStatusPicker.types";
import { type PlannedMealStatus, PlannedMealStatusValues } from "@/lib/enums";
import { api } from "@/trpc/react";
import { ChevronDown } from "lucide-react";
import { LoadingButton } from "@/components/LoadingButton";

export function PlannedMealStatusPicker({
  id,
  mealId,
  status,
  open,
  onOpenChange,
}: PlannedMealStatusPickerProps) {
  const utils = api.useUtils();

  const { mutate, isPending } = api.plannedMeals.update.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.meals.getById.invalidate({
          id: mealId,
        }),
        utils.plannedMeals.getAllByStatus.invalidate({
          status: "planned",
        }),
        utils.plannedMeals.getAllByStatus.invalidate({
          status: "cooked",
        }),
        utils.shoppingList.getAll.invalidate(),
      ]);
    },
  });

  const handleCheckedChange = (newStatus: PlannedMealStatus) => {
    mutate({
      id,
      status: newStatus,
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <LoadingButton
          isLoading={isPending}
          variant="outline"
          size="sm"
          className="pr-2"
        >
          <span className="flex items-center gap-1">
            <span className="capitalize">{status}</span>
            <ChevronDown />
          </span>
        </LoadingButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {PlannedMealStatusValues.map((statusValue, index) => (
          <DropdownMenuCheckboxItem
            key={`${statusValue}_${index}`}
            checked={statusValue === status}
            onCheckedChange={() => handleCheckedChange(statusValue)}
          >
            <span className="capitalize">{statusValue}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
