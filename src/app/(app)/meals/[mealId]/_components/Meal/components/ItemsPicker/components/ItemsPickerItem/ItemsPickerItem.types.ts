import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type ItemsPickerItemProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
  mealId: string;
};
