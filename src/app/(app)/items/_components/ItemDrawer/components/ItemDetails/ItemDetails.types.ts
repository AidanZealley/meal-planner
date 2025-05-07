import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type ItemDetailsProps = {
  item: ArrayElement<RouterOutputs["items"]["getAll"]>;
  onClose?: () => void;
};
