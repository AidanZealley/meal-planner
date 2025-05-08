import { api } from "@/trpc/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/Spinner";
import { ItemAmountAvailable } from "../ItemAmountAvailable";
import { InStockToggle } from "../../../InStockToggle";
import type { ItemStockControlProps } from "./ItemStockControl.types";

export const ItemStockControl = ({ item }: ItemStockControlProps) => {
  const { id, type, amountAvailable } = item;

  const inStock = amountAvailable > 0;

  const utils = api.useUtils();

  const { mutate: updateType, isPending: isUpdatingType } =
    api.items.updateType.useMutation({
      onSuccess: async () => {
        await Promise.all([
          utils.items.getAll.invalidate(),
          utils.items.getById.invalidate({ id }),
          utils.shoppingList.getAll.invalidate(),
          utils.meals.getById.invalidate(),
        ]);
      },
    });

  const { mutate: updateInStock, isPending: isUpdatingInStock } =
    api.items.updateInStock.useMutation({
      onSuccess: async () => {
        await Promise.all([
          utils.items.getAll.invalidate(),
          utils.items.getById.invalidate({ id }),
          utils.shoppingList.getAll.invalidate(),
          utils.meals.getById.invalidate(),
        ]);
      },
    });

  const handleToggleStockMode = (checked: boolean) => {
    updateType({
      id,
      type: checked ? "amount" : "boolean",
    });
  };

  const handleUpdateInStock = (inStock: boolean) => {
    updateInStock({ id, inStock });
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

      {type === "amount" ? (
        <ItemAmountAvailable item={item} />
      ) : (
        <InStockToggle
          inStock={inStock}
          loading={isUpdatingInStock}
          onInStockChange={handleUpdateInStock}
        />
      )}
    </div>
  );
};
