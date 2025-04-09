import type { ReactNode } from "react";

export type DialogConfirmationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  action: ReactNode;
};
