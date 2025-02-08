import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type IngredientListItemProps = {
  ingredient: ArrayElement<RouterOutputs["ingredients"]["getAll"]>;
  isEditingId: string | null;
  handleEdit: (id: string | null) => void;
};
