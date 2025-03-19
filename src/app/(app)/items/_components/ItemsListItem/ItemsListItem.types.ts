import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type ItemsListItemProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
  isEditingId: string | null;
  handleEdit: (id: string | null) => void;
};
