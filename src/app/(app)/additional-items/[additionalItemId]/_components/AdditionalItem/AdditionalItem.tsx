"use client";

import { api } from "@/trpc/react";
import { AdditionalItemHeader } from "./components/AdditionalItemHeader";
import { type AdditionalItemProps } from "./AdditionalItem.types";

export const AdditionalItem = ({ id }: AdditionalItemProps) => {
  const [additionalItem] = api.additionalItems.getById.useSuspenseQuery({
    id,
  });

  return (
    <div className="grid gap-12">
      <AdditionalItemHeader additionalItem={additionalItem} />
    </div>
  );
};
