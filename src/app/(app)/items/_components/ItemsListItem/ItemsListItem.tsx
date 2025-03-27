"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minimize2, MoreVertical, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ItemsListItemProps } from "./ItemsListItem.types";
import { EditableItem } from "../EditableItem";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ItemDetails } from "../ItemDetails";

export const ItemsListItem = ({
  item,
  isExpandedId,
  handleExpanded,
}: ItemsListItemProps) => {
  const { id, name, type, amountAvailable } = item;

  const [isEditing, setIsEditing] = useState(false);

  const isExpanded = isExpandedId === id;
  const inStock = amountAvailable > 0;
  const showQuantity = type === "amount";

  const toggleExpanded = () => {
    handleExpanded(isExpanded ? null : id);
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "@container/item @container-normal grid gap-2 rounded-2xl p-2 transition-opacity hover:bg-muted/50",
        isExpanded ? "bg-muted hover:bg-muted" : "",
        !isExpandedId || isExpanded ? "opacity-100" : "opacity-30",
      )}
    >
      <div className="group relative grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg pl-2">
        {isEditing ? (
          <EditableItem item={item} onUpdate={toggleEdit} />
        ) : (
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
        )}
        <div className="relative flex items-center gap-2">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, type: "tween" }}
                >
                  <Button size="icon-sm" variant="ghost" onClick={toggleEdit}>
                    {isEditing ? <X /> : <Pencil />}
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, type: "tween" }}
                >
                  <Button size="icon-sm" variant="destructive-ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button onClick={toggleExpanded} size="icon-sm" variant="ghost">
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <MoreVertical className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
          >
            <ItemDetails item={item} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
