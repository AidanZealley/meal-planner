import { Carrot, MoreVertical, SquareStack, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { type ItemsListItemMenuProps } from "./ItemsListItemMenu.types";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";

export const ItemsListItemMenu = ({ id }: ItemsListItemMenuProps) => {
  const utils = api.useUtils();

  const { mutate: deleteItem, isPending: isDeletePending } =
    api.items.delete.useMutation({
      onSuccess: async () => {
        await utils.items.getAll.invalidate();
        await utils.shoppingList.getAll.invalidate();
      },
    });

  const handleDelete = () => {
    deleteItem({ id });
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
          <Link href={`/items/${id}`}>
            <DropdownMenuItem>
              <Carrot />
              <span>View</span>
            </DropdownMenuItem>
          </Link>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <SquareStack />
              <span>Update Stock</span>
            </DropdownMenuItem>
          </DialogTrigger>
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
