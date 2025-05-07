import type { DialogProps } from "@radix-ui/react-dialog";
import { type PropsWithChildren } from "react";

export type DrawerDialogProps = PropsWithChildren &
  DialogProps & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    description: string;
    hideDescription?: boolean;
    trigger?: React.ReactNode;
    // container?: RefObject<HTMLDivElement | null>;
  };
