import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type UpdateStockDrawerProps = {
  ingredient: ArrayElement<RouterOutputs["ingredients"]["getAll"]>;
};
