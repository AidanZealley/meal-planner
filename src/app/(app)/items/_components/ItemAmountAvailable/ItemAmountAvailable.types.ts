import type { ArrayElement } from "@/lib/types";
import type { RouterOutputs } from "@/trpc/react";

export type ItemAmountAvailableProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
};
