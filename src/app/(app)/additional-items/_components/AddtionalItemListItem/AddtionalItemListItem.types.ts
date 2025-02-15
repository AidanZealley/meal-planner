import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type AddtionalItemListItemProps = {
  additionalItem: ArrayElement<RouterOutputs["additionalItems"]["getAll"]>;
  isEditingId: string | null;
  handleEdit: (id: string | null) => void;
};
