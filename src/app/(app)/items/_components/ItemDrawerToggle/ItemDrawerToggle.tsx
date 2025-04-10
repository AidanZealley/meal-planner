"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ItemDrawer } from "../ItemDrawer";
import type { ItemDrawerToggleProps } from "./ItemDrawerToggle.types";

export const ItemDrawerToggle = ({ item }: ItemDrawerToggleProps) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <ItemDrawer
      item={item}
      open={showDetails}
      onOpenChange={setShowDetails}
      trigger={
        <Button
          onClick={() => setShowDetails(true)}
          size="icon-sm"
          variant="ghost"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  );
};
