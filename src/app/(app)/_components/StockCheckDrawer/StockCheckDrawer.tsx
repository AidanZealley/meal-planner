import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { StockCheckForm } from "./components/StockCheckForm";
import type { StockCheckDrawerProps } from "./StockCheckDrawer.types";

export const StockCheckDrawer = ({
  open,
  onOpenChange,
  items,
}: StockCheckDrawerProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Did you run out of anything?</DialogTitle>
            <DialogDescription>
              Cross off items that you used up while cooking this meal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <StockCheckForm items={items} onClose={() => onOpenChange(false)} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Did you run out of anything?</DrawerTitle>
          <DrawerDescription>
            Cross off items that you used up while cooking this meal.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-6 p-6">
          <StockCheckForm items={items} onClose={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
