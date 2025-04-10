import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { EditableMeal } from "../EditableMeal";
import { cn } from "@/lib/utils";
import { type MealListItemProps } from "./MealListItem.types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MealListItemMenu } from "../MealListItemMenu";

export const MealListItem = ({
  meal,
  isEditingId,
  handleEdit,
}: MealListItemProps) => {
  const { id, name, plannedMeals } = meal;

  const isEditing = isEditingId === id;

  const activePlan = plannedMeals.find(
    (plannedMeal) => plannedMeal.status === "planned",
  );

  const toggleEdit = () => {
    handleEdit(isEditing ? null : id);
  };

  const endEdit = () => {
    handleEdit(null);
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
        <div
          className={cn(
            "flex items-center gap-3 transition-opacity",
            !isEditingId || isEditing ? "opacity-100" : "opacity-30",
          )}
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </span>
          {activePlan && (
            <Badge className="whitespace-nowrap" variant="secondary">
              {activePlan.status}
            </Badge>
          )}
        </div>
      )}
      <div
        className={cn(
          "relative flex items-center gap-2 opacity-30 transition-opacity group-hover:opacity-100",
          isEditing ? "opacity-100" : "",
        )}
      >
        <Button size="icon-sm" variant="ghost" onClick={toggleEdit}>
          {isEditing ? <X /> : <Pencil />}
        </Button>
        <MealListItemMenu id={id} activePlan={!!activePlan} />
      </div>
    </div>
  );
};
