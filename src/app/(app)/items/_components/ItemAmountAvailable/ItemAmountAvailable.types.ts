import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type ItemAmountAvailableProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
};
