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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { NewItemDrawerProps } from "./NewItemDrawer.types";
import { NewItem } from "../NewItem/NewItem";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Separator } from "@/components/ui/separator";

export const NewItemDrawer = ({
  open,
  onOpenChange,
  trigger,
}: NewItemDrawerProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Item</DialogTitle>
            <VisuallyHidden>
              <DialogDescription>Add a new item</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <div className="grid gap-6">
            <NewItem />

            <Separator className="max-w-1/2 justify-self-center" />

            <Button onClick={() => onOpenChange(false)} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New Item</DrawerTitle>
          <VisuallyHidden>
            <DrawerDescription>Add a new item</DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        <div className="grid gap-6">
          <NewItem />

          <Separator className="max-w-1/2 justify-self-center" />

          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
  // return (
  //   <DrawerDialog
  //     open={open}
  //     onOpenChange={onOpenChange}
  //     title="New Item"
  //     description="Add a new item"
  //     hideDescription={true}
  //     trigger={trigger}
  //     // container={container}
  //   >
  //     <div className="grid gap-6">
  //       <NewItem />

  //       <Separator className="max-w-1/2 justify-self-center" />

  //       <Button onClick={() => onOpenChange(false)} variant="outline">
  //         Close
  //       </Button>
  //     </div>
  //   </DrawerDialog>
  // );
};
