"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ItemDetails } from "./components/ItemDetails";
import type { ItemDrawerProps } from "./ItemDrawer.types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const ItemDrawer = ({
  item,
  open,
  onOpenChange,
  trigger,
}: ItemDrawerProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogPortal>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Manage Item</DialogTitle>
              <VisuallyHidden>
                <DialogDescription>Manage item</DialogDescription>
              </VisuallyHidden>
            </DialogHeader>
            <div className="grid gap-6">
              <ItemDetails item={item} onClose={() => onOpenChange(false)} />

              <Separator className="max-w-1/2 justify-self-center" />

              <Button onClick={() => onOpenChange(false)} variant="outline">
                Close
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerPortal>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Manage Item</DrawerTitle>
            <VisuallyHidden>
              <DrawerDescription>Manage item</DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <div className="grid gap-6 p-6">
            <ItemDetails item={item} onClose={() => onOpenChange(false)} />

            <Separator className="max-w-1/2 justify-self-center" />

            <Button onClick={() => onOpenChange(false)} variant="outline">
              Close
            </Button>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
