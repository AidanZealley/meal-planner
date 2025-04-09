"use client";

import { api } from "@/trpc/react";
import { ShoppingListItem } from "./components/ShoppingListItem";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const ShoppingList = () => {
  const [shoppingList] = api.shoppingList.getAll.useSuspenseQuery();

  if (!shoppingList.length) {
    return (
      <div className="grid h-32 place-items-center">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-muted p-6">
          <p className="text-center text-sm">No items in your shopping list</p>

          <Button size="sm" asChild>
            <Link href="/meals">
              <span className="flex items-center gap-2">
                Plan meals
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-1">
      {shoppingList.map((item, index) => (
        <ShoppingListItem key={`${item.itemId}_${index}`} item={item} />
      ))}
    </div>
  );
};
