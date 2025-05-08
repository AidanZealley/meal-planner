import { type ArrayElement } from "@/lib/types";
import { type RouterOutputs } from "@/trpc/react";

export type ItemDrawerProps = {
  item?: ArrayElement<RouterOutputs["items"]["getAll"]> | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
};
