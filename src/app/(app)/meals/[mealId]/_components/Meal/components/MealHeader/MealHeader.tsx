import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "date-fns";
import { type MealHeaderProps } from "./MealHeader.types";
import { CalendarMinus, CalendarPlus, Trash2 } from "lucide-react";
import { api } from "@/trpc/react";
import { LoadingButton } from "@/components/LoadingButton";

export const MealHeader = ({ meal }: MealHeaderProps) => {
  const { id } = meal;

  const utils = api.useUtils();

  const { mutate: planMeal, isPending: isPlanPending } =
    api.plannedMeals.create.useMutation({
      onSuccess: async () => {
        await Promise.all([
          utils.meals.getAll.invalidate(),
          utils.meals.getById.invalidate({ id }),
          utils.plannedMeals.getAllByStatus.invalidate({ status: "planned" }),
          utils.plannedMeals.getAllByStatus.invalidate({ status: "cooked" }),
          utils.shoppingList.getAll.invalidate(),
        ]);
      },
    });

  const { mutate: unplanMeal, isPending: isUnplanPending } =
    api.plannedMeals.delete.useMutation({
      onSuccess: async () => {
        await Promise.all([
          utils.meals.getAll.invalidate(),
          utils.meals.getById.invalidate({ id }),
          utils.plannedMeals.getAllByStatus.invalidate({ status: "planned" }),
          utils.plannedMeals.getAllByStatus.invalidate({ status: "cooked" }),
          utils.shoppingList.getAll.invalidate(),
        ]);
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

  const currentlyPlanned = meal?.plannedMeals.find(
    (plannedMeal) => plannedMeal.status === "planned",
  );
  const cookedCount = meal?.plannedMeals.filter(
    (plannedMeal) => plannedMeal.status === "cooked",
  ).length;

  if (!meal) {
    return null;
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/meals">Meals</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid gap-3">
          <div className="grid gap-3 md:flex md:items-center md:justify-between">
            <h1 className="text-3xl font-bold">{meal?.name}</h1>

            <div className="flex gap-2">
              <LoadingButton
                onClick={currentlyPlanned ? handleUnplanMeal : handlePlanMeal}
                variant="secondary"
                isLoading={isPlanPending || isUnplanPending}
              >
                <span className="flex items-center gap-2">
                  {currentlyPlanned ? <CalendarMinus /> : <CalendarPlus />}
                  {currentlyPlanned ? "Unplan Meal" : "Plan Meal"}
                </span>
              </LoadingButton>
              <LoadingButton
                onClick={handleDelete}
                size="icon"
                variant="destructive"
                isLoading={isDeletePending}
              >
                <Trash2 className="h-4 w-4" />
              </LoadingButton>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            Created {formatDate(meal?.createdAt, "do, MMM")}
          </span>

          {currentlyPlanned && (
            <div>
              <Badge className="whitespace-nowrap" variant="secondary">
                {currentlyPlanned.status}
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 pt-6">
            <span className="text-4xl font-extralight">
              {meal?.mealItems.length}
            </span>
            <span className="text-muted-foreground">Items</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center gap-3 pt-6">
            <span className="text-4xl font-extralight">{cookedCount}</span>
            <span className="text-muted-foreground">Times cooked</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
