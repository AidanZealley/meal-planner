import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type MealListItemProps = {
  meal: ArrayElement<RouterOutputs["meals"]["getAll"]>;
  isEditingId: string | null;
  handleEdit: (id: string | null) => void;
};
