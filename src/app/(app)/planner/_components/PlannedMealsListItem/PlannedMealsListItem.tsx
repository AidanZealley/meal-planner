import { Trash2 } from "lucide-react";
import { api } from "@/trpc/react";
import { type PlannedMealsListItemProps } from "./PlannedMealsListItem.types";
import Link from "next/link";
import { PlannedMealStatusPicker } from "../PlannedMealStatusPicker";
import { LoadingButton } from "@/components/LoadingButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const PlannedMealsListItem = ({
  plannedMeal,
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
      await utils.plannedMeals.getAllByStatus.invalidate({
        status: "planned",
      });
      await utils.plannedMeals.getAllByStatus.invalidate({
        status: "cooked",
      });
      await utils.meals.getAll.invalidate();
    },
  });

  const handleDelete = () => {
    mutate({ mealId });
  };

  return (
    <div
      className={cn(
        "group relative grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg p-1 pl-3 hover:bg-muted",
        statusPickerOpen ? "bg-muted" : "",
      )}
    >
      {name}
      <Link href={`/meals/${mealId}`} className="absolute inset-0" />
      <div
        className={cn(
          "flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100",
          statusPickerOpen ? "opacity-100" : "",
        )}
      >
        <PlannedMealStatusPicker
          id={id}
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
  );
};
