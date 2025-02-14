"use client";

import { api } from "@/trpc/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const AdditionalItemsPicker = () => {
  const [additionalItems] = api.additionalItems.getAll.useSuspenseQuery();

  const utils = api.useUtils();

  const { mutate } = api.shoppingList.addAdditionalItem.useMutation({
    onSuccess: async () => {
      await utils.shoppingList.getAllAdditionalItems.invalidate();
    },
  });

  const handleSelect = (additionalItemId: string) => {
    mutate({
      additionalItemId,
    });
  };

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Search additional items..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {additionalItems.map((additionalItem) => (
            <CommandItem
              key={additionalItem.id}
              onSelect={() => handleSelect(additionalItem.id)}
            >
              {additionalItem.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
