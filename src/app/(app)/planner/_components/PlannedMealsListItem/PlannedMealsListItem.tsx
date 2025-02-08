import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { api } from "@/trpc/react";
import { type PlannedMealsListItemProps } from "./PlannedMealsListItem.types";
import Link from "next/link";
import { PlannedMealStatusPicker } from "../PlannedMealStatusPicker";

export const PlannedMealsListItem = ({
  plannedMeal,
}: PlannedMealsListItemProps) => {
  const {
    id,
    mealId,
    status,
    meal: { name },
  } = plannedMeal;

  const utils = api.useUtils();

  const { mutate } = api.plannedMeals.delete.useMutation({
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
    mutate({ id });
  };

  return (
    <div className="group grid grid-cols-[1fr_auto] items-center gap-2">
      <Link href={`/meals/${mealId}`}>{name}</Link>
      <div className="opacity-s0 flex items-center gap-2 transition-opacity group-hover:opacity-100">
        <PlannedMealStatusPicker id={id} status={status} />
        <Button size="icon-sm" variant="destructive" onClick={handleDelete}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};
