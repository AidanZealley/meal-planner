import type { RouterOutputs } from "@/trpc/react";
import type { ArrayElement } from "@/lib/types";

export type EditableItemNameProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
};
