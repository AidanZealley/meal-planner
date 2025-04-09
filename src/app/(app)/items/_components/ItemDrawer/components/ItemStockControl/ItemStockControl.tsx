import { Check, X } from "lucide-react";

import { api } from "@/trpc/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/LoadingButton";
import { Spinner } from "@/components/Spinner";
import { ItemAmountAvailable } from "../ItemAmountAvailable";
import type { ItemStockControlProps } from "./ItemStockControl.types";

export const ItemStockControl = ({ item }: ItemStockControlProps) => {
  const { id, type, amountAvailable } = item;

  const inStock = amountAvailable > 0;

  const utils = api.useUtils();

  const { mutate: updateType, isPending: isUpdatingType } =
    api.items.updateType.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
        await utils.items.getById.invalidate({ id });
        await utils.shoppingList.getAll.invalidate();
        await utils.meals.getById.invalidate();
      },
    });

  const { mutate: updateInStock, isPending: isUpdatingInStock } =
    api.items.updateInStock.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
        await utils.items.getById.invalidate({ id });
        await utils.shoppingList.getAll.invalidate();
        await utils.meals.getById.invalidate();
      },
    });

  const handleToggleStockMode = (checked: boolean) => {
    updateType({
      id,
      type: checked ? "amount" : "boolean",
    });
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Switch
          id="useAmount"
          checked={type === "amount"}
          onCheckedChange={handleToggleStockMode}
          className="data-[state=unchecked]:bg-muted-foreground/30"
        />
        <Label htmlFor="useAmount" className="text-sm">
          Use Amount
        </Label>

        {isUpdatingType && <Spinner className="h-4 w-4" />}
      </div>

      <div className="flex justify-end">
        {type === "amount" ? (
          <ItemAmountAvailable item={item} />
        ) : (
          <LoadingButton
            variant="secondary"
            isLoading={isUpdatingInStock}
            onClick={() => updateInStock({ id, inStock: !inStock })}
            className="group"
          >
            <span className="flex items-center gap-2">
              {inStock ? (
                <X className="h-4 w-4 transition-colors group-hover:text-red-500" />
              ) : (
                <Check className="h-4 w-4 transition-colors group-hover:text-green-500" />
              )}
              {inStock ? "Out of Stock" : "In Stock"}
            </span>
          </LoadingButton>
        )}
      </div>
    </div>
  );
};
