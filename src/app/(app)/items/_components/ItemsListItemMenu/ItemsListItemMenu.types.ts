import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type ItemsListItemMenuProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
};
