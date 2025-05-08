"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { api } from "@/trpc/react";
import { ItemStockControl } from "../ItemStockControl";
import { Button } from "@/components/ui/button";
import { DialogConfirmation } from "@/components/DialogConfirmation";
import { LoadingButton } from "@/components/LoadingButton";
import { EditItemForm } from "../EditItemForm";
import type { ItemDetailsProps } from "./ItemDetails.types";

export const ItemDetails = ({ item, onSuccess }: ItemDetailsProps) => {
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
        onSuccess?.();
      },
    });

  return (
    <>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <EditItemForm item={item} />
          <ItemStockControl item={item} />
        </div>

        <Button onClick={() => setShowConfirm(true)} variant="destructive">
          <span className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </span>
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
    </>
  );
};
