"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { api } from "@/trpc/react";
import { DrawerDialog } from "@/components/DrawerDialog";
import { EditableItemName } from "./components/EditableItemName";
import { ItemStockControl } from "./components/ItemStockControl";
import { Button } from "@/components/ui/button";
import { DialogConfirmation } from "@/components/DialogConfirmation";
import { LoadingButton } from "@/components/LoadingButton";
import { Separator } from "@/components/ui/separator";
import type { ItemDrawerProps } from "./ItemDrawer.types";

export const ItemDrawer = ({
  item,
  open,
  onOpenChange,
  trigger,
}: ItemDrawerProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const utils = api.useUtils();

  const { mutateAsync: deleteItem, isPending: isDeleting } =
    api.items.delete.useMutation({
      onSuccess: async () => {
        await Promise.all([
          await utils.items.getAll.invalidate(),
          await utils.shoppingList.getAll.invalidate(),
          await utils.meals.getAll.invalidate(),
        ]);
        onOpenChange(false);
      },
    });

  return (
    <DrawerDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Manage Item"
      description="Manage item"
      hideDescription={true}
      trigger={trigger}
    >
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="-ml-2 grid gap-1">
            <EditableItemName item={item} />
          </div>

          <ItemStockControl item={item} />
        </div>

        <Button onClick={() => setShowConfirm(true)} variant="destructive">
          <span className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </span>
        </Button>

        <Separator className="max-w-1/2 justify-self-center" />

        <Button onClick={() => onOpenChange(false)} variant="outline">
          Close
        </Button>
      </div>

      <DialogConfirmation
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Are you sure?"
        description="Deleting this item will remove it from all meals."
        action={[
          <LoadingButton
            key="delete"
            onClick={() => deleteItem({ id: item.id })}
            variant="destructive"
            isLoading={isDeleting}
          >
            <span className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </span>
          </LoadingButton>,
        ]}
      />
    </DrawerDialog>
  );
};
