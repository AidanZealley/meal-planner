import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type DrawerDialogProps } from "./DrawerDialog.types";

export function DrawerDialog({
  open,
  onOpenChange,
  title,
  description,
  hideDescription,
  trigger,
  children,
}: DrawerDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger ?? <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogPortal>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {hideDescription ? (
                  <VisuallyHidden>{description}</VisuallyHidden>
                ) : (
                  description
                )}
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger ?? <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DrawerPortal>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              {hideDescription ? (
                <VisuallyHidden>{description}</VisuallyHidden>
              ) : (
                description
              )}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-6">{children}</div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
