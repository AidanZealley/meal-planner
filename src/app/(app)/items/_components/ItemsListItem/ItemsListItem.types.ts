import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type ItemsListItemProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
  selectItem: (itemId: string) => void;
};
