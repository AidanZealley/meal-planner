import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type UpdateStockDrawerProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
};
