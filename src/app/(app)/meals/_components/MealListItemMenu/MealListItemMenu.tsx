import {
  CalendarMinus,
  CalendarPlus,
  MoreVertical,
  Salad,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type MealListItemMenuProps } from "./MealListItemMenu.types";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";

export const MealListItemMenu = ({ id, activePlan }: MealListItemMenuProps) => {
  const utils = api.useUtils();

  const { mutate: planMeal, isPending: isPlanPending } =
    api.plannedMeals.create.useMutation({
      onSuccess: async () => {
        await utils.meals.getAll.invalidate();
        await utils.plannedMeals.getAllByStatus.invalidate({
          status: "planned",
        });
        await utils.plannedMeals.getAllByStatus.invalidate({
          status: "cooked",
        });
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const { mutate: unplanMeal, isPending: isUnplanPending } =
    api.plannedMeals.delete.useMutation({
      onSuccess: async () => {
        await utils.meals.getAll.invalidate();
        await utils.plannedMeals.getAllByStatus.invalidate({
          status: "planned",
        });
        await utils.plannedMeals.getAllByStatus.invalidate({
          status: "cooked",
        });
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const { mutate: deleteMeal, isPending: isDeletePending } =
    api.meals.delete.useMutation({
      onSuccess: async () => {
        await utils.meals.getAll.invalidate();
      },
    });

  const handlePlanMeal = () => {
    planMeal({
      mealId: id,
    });
  };

  const handleUnplanMeal = () => {
    unplanMeal({
      mealId: id,
    });
  };

  const handleDelete = () => {
    deleteMeal({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <Link href={`/meals/${id}`}>
            <DropdownMenuItem>
              <Salad />
              <span>View</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={activePlan ? handleUnplanMeal : handlePlanMeal}
          >
            {isPlanPending || isUnplanPending ? (
              <Spinner />
            ) : activePlan ? (
              <CalendarMinus />
            ) : (
              <CalendarPlus />
            )}
            <span>{activePlan ? "Remove from planner" : "Add to planner"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          {isDeletePending ? <Spinner /> : <Trash2 />}
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
