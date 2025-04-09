"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ItemDrawer } from "../ItemDrawer";
import { type ItemsListItemProps } from "./ItemsListItem.types";

export const ItemsListItem = ({ item }: ItemsListItemProps) => {
  const { name, type, amountAvailable } = item;

  const inStock = amountAvailable > 0;
  const showQuantity = type === "amount";

  return (
    <>
      <div className="grid gap-2 rounded-2xl p-2 hover:bg-muted/50">
        <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg pl-2">
          <div
            className={cn(
              "grid max-w-full grid-cols-[auto_1fr] items-center gap-3 transition-opacity",
            )}
          >
            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {name}
            </span>
            <div className="flex items-center gap-2">
              {showQuantity && (
                <Badge className="whitespace-nowrap" variant="secondary">
                  {amountAvailable}
                </Badge>
              )}
              {!inStock && (
                <Badge className="whitespace-nowrap" variant="destructive">
                  Out of stock
                </Badge>
              )}
            </div>
          </div>

          <ItemDrawer item={item} />
        </div>
      </div>
    </>
  );
};
