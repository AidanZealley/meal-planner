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
  const [items] = api.items.getAll.useSuspenseQuery();

  const utils = api.useUtils();

  const { mutate } = api.shoppingList.create.useMutation({
    onSuccess: async () => {
      await utils.shoppingList.getAll.invalidate();
    },
  });

  const handleSelect = (itemId: string) => {
    mutate({
      itemId,
    });
  };

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Search items..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem key={item.id} onSelect={() => handleSelect(item.id)}>
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
