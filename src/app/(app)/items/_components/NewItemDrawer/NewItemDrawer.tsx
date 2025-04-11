import { DrawerDialog } from "@/components/DrawerDialog";
import type { NewItemDrawerProps } from "./NewItemDrawer.types";
import { NewItem } from "../NewItem/NewItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const NewItemDrawer = ({
  open,
  onOpenChange,
  trigger,
}: NewItemDrawerProps) => {
  return (
    <DrawerDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Item"
      description="Add a new item"
      hideDescription={true}
      trigger={trigger}
    >
      <div className="grid gap-6">
        <NewItem />

        <Separator className="max-w-1/2 justify-self-center" />

        <Button onClick={() => onOpenChange(false)} variant="outline">
          Close
        </Button>
      </div>
    </DrawerDialog>
  );
};
