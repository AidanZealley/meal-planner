import { Button } from "@/components/ui/button";
import { CalendarMinus, CalendarPlus, Pencil, Trash2, X } from "lucide-react";
import { EditableMeal } from "../EditableMeal";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type MealListItemProps } from "./MealListItem.types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { LoadingButton } from "@/components/LoadingButton";

export const MealListItem = ({
  meal,
  isEditingId,
  handleEdit,
}: MealListItemProps) => {
  const { id, name, plannedMeals } = meal;

  const isEditing = isEditingId === id;

  const utils = api.useUtils();

  const { mutate: deleteMeal, isPending: isDeletePending } =
    api.meals.delete.useMutation({
      onSuccess: async () => {
        await utils.meals.getAll.invalidate();
      },
    });

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

  const activePlan = plannedMeals.find(
    (plannedMeal) => plannedMeal.status === "planned",
  );

  const toggleEdit = () => {
    handleEdit(isEditing ? null : id);
  };

  const endEdit = () => {
    handleEdit(null);
  };

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
    <div
      className={cn(
        "group relative grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg p-1 pl-3 hover:bg-muted/50",
        isEditing ? "bg-muted/50" : "",
      )}
    >
      <Link href={`/meals/${id}`} className="absolute inset-0" />
      {isEditing ? (
        <EditableMeal id={id} name={name} onUpdate={endEdit} />
      ) : (
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "transition-opacity",
              !isEditingId || isEditing ? "opacity-100" : "opacity-0",
            )}
          >
            {name}
          </span>
          {activePlan && <Badge>{activePlan.status}</Badge>}
        </div>
      )}
      <div
        className={cn(
          "relative flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100",
          isEditing ? "opacity-100" : "",
        )}
      >
        <Button size="icon-sm" variant="ghost" onClick={toggleEdit}>
          {isEditing ? <X /> : <Pencil />}
        </Button>
        <LoadingButton
          isLoading={isPlanPending || isUnplanPending}
          size="icon-sm"
          variant="ghost"
          onClick={activePlan ? handleUnplanMeal : handlePlanMeal}
        >
          {activePlan ? <CalendarMinus /> : <CalendarPlus />}
        </LoadingButton>
        <LoadingButton
          isLoading={isDeletePending}
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
