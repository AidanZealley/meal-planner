"use client";

import { useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";

import { api } from "@/trpc/react";
import { DrawerDialog } from "@/components/DrawerDialog";
import { EditableItemName } from "./components/EditableItemName";
import { ItemStockControl } from "./components/ItemStockControl";
import { Button } from "@/components/ui/button";
import { DialogConfirmation } from "@/components/DialogConfirmation";
import { LoadingButton } from "@/components/LoadingButton";
import type { ItemDrawerProps } from "./ItemDrawer.types";

export const ItemDrawer = ({ item }: ItemDrawerProps) => {
  const [showDetails, setShowDetails] = useState(false);
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
        setShowDetails(false);
      },
    });

  return (
    <DrawerDialog
      open={showDetails}
      onOpenChange={setShowDetails}
      title="Manage Item"
      description="Manage item"
      hideDescription={true}
      trigger={
        <Button
          onClick={() => setShowDetails(true)}
          size="icon-sm"
          variant="ghost"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      }
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

        <Button onClick={() => setShowDetails(false)} variant="outline">
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
