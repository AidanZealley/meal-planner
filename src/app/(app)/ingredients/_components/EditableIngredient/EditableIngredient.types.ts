import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type EditableIngredientProps = {
  ingredient: ArrayElement<RouterOutputs["ingredients"]["getAll"]>;
  onUpdate: () => void;
};
