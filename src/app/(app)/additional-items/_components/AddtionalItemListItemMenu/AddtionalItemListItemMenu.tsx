import {
  CalendarMinus,
  CalendarPlus,
  MoreVertical,
  Salad,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddtionalItemListItemMenuProps } from "./AddtionalItemListItemMenu.types";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";

export const AddtionalItemListItemMenu = ({
  id,
}: AddtionalItemListItemMenuProps) => {
  const utils = api.useUtils();

  const { mutate: deleteAddtionalItem, isPending: isDeletePending } =
    api.additionalItems.delete.useMutation({
      onSuccess: async () => {
        await utils.additionalItems.getAll.invalidate();
      },
    });

  const handleDelete = () => {
    deleteAddtionalItem({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <Link href={`/additionalItems/${id}`}>
            <DropdownMenuItem>
              <Salad />
              <span>View</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          {isDeletePending ? <Spinner /> : <Trash2 />}
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
