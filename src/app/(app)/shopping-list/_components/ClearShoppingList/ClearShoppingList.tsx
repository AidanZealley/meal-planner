"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { api } from "@/trpc/react";
import { ListChecks } from "lucide-react";

export const ClearShoppingList = () => {
  const { data: shoppingListItems } = api.shoppingList.getAll.useQuery();

  const utils = api.useUtils();

  const { mutate, isPending } = api.shoppingList.clear.useMutation({
    onSuccess: async () => {
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const handleClearClick = () => {
    mutate();
  };

  const hasItems = !!(shoppingListItems?.length ?? true);

  return (
    <LoadingButton
      onClick={handleClearClick}
      isLoading={isPending}
      variant="secondary"
      size="sm"
      disabled={!hasItems}
    >
      <span className="flex items-center gap-3">
        <ListChecks className="h-4 w-4" />
        Clear
      </span>
    </LoadingButton>
  );
};
