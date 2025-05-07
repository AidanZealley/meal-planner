import type { RefObject } from "react";

export type NewItemDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  container?: RefObject<HTMLDivElement | null>;
};
