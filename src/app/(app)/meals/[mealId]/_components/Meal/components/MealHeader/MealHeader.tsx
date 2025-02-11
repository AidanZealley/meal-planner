import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { type MealHeaderProps } from "./MealHeader.types";

export const MealHeader = ({ meal }: MealHeaderProps) => {
  const currentlyPlanned = meal?.plannedMeals.find(
    (plannedMeal) => plannedMeal.status === "planned",
  );
  const cookedCount = meal?.plannedMeals.filter(
    (plannedMeal) => plannedMeal.status === "cooked",
  ).length;

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/ingredients">Meals</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          {meal?.name}
          {currentlyPlanned && (
            <Badge variant="secondary">{currentlyPlanned.status}</Badge>
          )}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 pt-6">
            <span className="text-4xl font-extralight">
              {meal?.mealIngredients.length}
            </span>
            <span className="text-muted-foreground">Ingredients</span>
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
