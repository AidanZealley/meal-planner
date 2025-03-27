import { ArrayElement } from "@/lib/types";
import { RouterOutputs } from "@/trpc/react";

export type ItemDetailsProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
};
