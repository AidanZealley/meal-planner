import { RouterOutputs } from "@/trpc/react";

export type MealHeaderProps = {
  meal: RouterOutputs["meals"]["getById"];
};
