import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { type DrawerDialogProps } from "./DrawerDialog.types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger ?? <DialogTrigger asChild>{trigger}</DialogTrigger>}
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
    </Drawer>
  );
}
