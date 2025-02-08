import { Button } from "@/components/ui/button";
import { CalendarPlus, Pencil, Trash2, X } from "lucide-react";
import { EditableMeal } from "../EditableMeal";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { MealListItemProps } from "./MealListItem.types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const MealListItem = ({
  meal,
  isEditingId,
  handleEdit,
}: MealListItemProps) => {
  const { id, name, plannedMeals } = meal;

  const isEditing = isEditingId === id;

  const utils = api.useUtils();

  const { mutate: deleteMeal } = api.meals.delete.useMutation({
    onSuccess: async () => {
      await utils.meals.getAll.invalidate();
    },
  });

  const { mutate: planMeal } = api.plannedMeals.create.useMutation({
    onSuccess: async () => {
      await utils.meals.getAll.invalidate();
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

  const handleDelete = () => {
    deleteMeal({ id });
  };

  return (
    <div className="group grid grid-cols-[1fr_auto] items-center gap-2">
      {isEditing ? (
        <EditableMeal id={id} name={name} onUpdate={endEdit} />
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href={`/meals/${id}`}
            className={cn(
              "transition-opacity",
              !isEditingId || isEditing ? "opacity-100" : "opacity-30",
            )}
          >
            {name}
          </Link>
          {activePlan && <Badge>{activePlan.status}</Badge>}
        </div>
      )}
      <div
        className={cn(
          "flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100",
          isEditing ? "opacity-100" : "",
        )}
      >
        <Button size="icon-sm" variant="ghost" onClick={toggleEdit}>
          {isEditing ? <X /> : <Pencil />}
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handlePlanMeal}
          disabled={!!activePlan}
        >
          <CalendarPlus />
        </Button>
        <Button size="icon-sm" variant="destructive" onClick={handleDelete}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};
