import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type UpdateStockDrawerProps = {
  ingredient: ArrayElement<RouterOutputs["ingredients"]["getAll"]>;
};
