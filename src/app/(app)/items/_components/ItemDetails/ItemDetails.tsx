import { Switch } from "@/components/ui/switch";
import { ItemDetailsProps } from "./ItemDetails.types";
import { api } from "@/trpc/react";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/LoadingButton";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemAmountAvailable } from "../ItemAmountAvailable";
import Link from "next/link";

export const ItemDetails = ({ item }: ItemDetailsProps) => {
  const { id, type, amountAvailable } = item;

  const inStock = amountAvailable > 0;

  const utils = api.useUtils();

  const { mutate: updateType, isPending: isUpdatingType } =
    api.items.updateType.useMutation({
      onSuccess: () => {
        utils.items.getAll.invalidate();
      },
    });

  const { mutate: updateInStock, isPending: isUpdatingInStock } =
    api.items.updateInStock.useMutation({
      onSuccess: () => {
        utils.items.getAll.invalidate();
      },
    });

  const { mutate: increaseAmountAvailable, isPending: isIncreasing } =
    api.items.increaseAmountAvailable.useMutation({
      onSuccess: () => {
        utils.items.getAll.invalidate();
      },
    });

  const { mutate: decreaseAmountAvailable, isPending: isDecreasing } =
    api.items.decreaseAmountAvailable.useMutation({
      onSuccess: () => {
        utils.items.getAll.invalidate();
      },
    });

  const handleToggleStockMode = (checked: boolean) => {
    updateType({
      id,
      type: checked ? "amount" : "boolean",
    });
  };

  return (
    <div className="@md/item:grid-cols-[1fr_1fr] grid grid-cols-[1fr_auto] items-center gap-2">
      <div className="relative col-start-1 row-start-1 flex items-center gap-2 pl-2">
        <Switch
          id="useAmount"
          checked={type === "amount"}
          onCheckedChange={handleToggleStockMode}
          className="data-[state=unchecked]:bg-muted-foreground/30"
        />
        <Label htmlFor="useAmount" className="text-sm">
          Use Amount
        </Label>
      </div>

      <div className="@md/item:col-span-full @md/item:justify-center col-start-2 row-start-1 flex justify-end">
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
                <X className="h-4 w-4 group-hover:text-red-500" />
              ) : (
                <Check className="h-4 w-4 group-hover:text-green-500" />
              )}
              {inStock ? "Out of Stock" : "In Stock"}
            </span>
          </LoadingButton>
        )}
      </div>

      <div className="@md/item:row-start-1 @md/item:justify-end @md/item:col-start-2 col-span-full col-start-1 row-start-2 grid justify-items-stretch">
        <Button variant="ghost" asChild>
          <Link href={`/items/${id}`}>
            <span className="flex items-center gap-2">
              View item
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
