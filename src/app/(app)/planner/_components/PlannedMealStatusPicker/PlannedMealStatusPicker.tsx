"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlannedMealStatusPickerProps } from "./PlannedMealStatusPicker.types";
import { PlannedMealStatus, PlannedMealStatusValues } from "@/lib/enums";
import { api } from "@/trpc/react";
import { ChevronDown } from "lucide-react";

export function PlannedMealStatusPicker({
  id,
  status,
}: PlannedMealStatusPickerProps) {
  const utils = api.useUtils();

  const { mutate } = api.plannedMeals.update.useMutation({
    onSuccess: async () => {
      await utils.meals.getById.invalidate();
      await utils.plannedMeals.getAllByStatus.invalidate();
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const handleCheckedChange = (newStatus: PlannedMealStatus) => {
    mutate({
      id,
      status: newStatus,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="pr-2">
          <span className="flex items-center gap-1">
            <span className="capitalize">{status}</span>
            <ChevronDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
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
