"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { api } from "@/trpc/react";
import { RefreshCw } from "lucide-react";

export const GenerateShoppingList = () => {
  const utils = api.useUtils();

  const { mutate, isPending } = api.shoppingList.generate.useMutation({
    onSuccess: async () => {
      await utils.shoppingList.getAll.invalidate();
      await utils.items.getAll.invalidate();
    },
  });

  const handleRegenerateClick = () => {
    mutate();
  };

  return (
    <LoadingButton
      onClick={handleRegenerateClick}
      isLoading={isPending}
      size="sm"
    >
      <span className="flex items-center gap-3">
        <RefreshCw className="h-4 w-4" />
        Regenerate
      </span>
    </LoadingButton>
  );
};
