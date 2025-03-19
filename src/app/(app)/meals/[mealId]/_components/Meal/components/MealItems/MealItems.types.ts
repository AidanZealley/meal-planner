import { type RouterOutputs } from "@/trpc/react";

export type mealItemsProps = {
  mealItems?: RouterOutputs["mealItems"]["getAll"];
};
