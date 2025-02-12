import { type PropsWithChildren } from "react";

export type DrawerDialogProps = PropsWithChildren & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  customTrigger?: React.ReactNode;
};
