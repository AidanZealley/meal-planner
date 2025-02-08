import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type EditableIngredientProps = {
  ingredient: ArrayElement<RouterOutputs["ingredients"]["getAll"]>;
  onUpdate: () => void;
};
