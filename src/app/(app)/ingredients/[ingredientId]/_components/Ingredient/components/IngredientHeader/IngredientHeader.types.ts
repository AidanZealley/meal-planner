import { RouterOutputs } from "@/trpc/react";

export type IngredientHeaderProps = {
  ingredient: RouterOutputs["ingredients"]["getById"];
};
