import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type EditItemFormProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
  onUpdate: () => void;
};
