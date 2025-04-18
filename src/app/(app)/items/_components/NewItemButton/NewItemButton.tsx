"use client";

import { Button } from "@/components/ui/button";
import { NewItemDrawer } from "../NewItemDrawer";
import { useState } from "react";
import { Plus } from "lucide-react";

export const NewItemButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className="sticky right-6 bottom-6 justify-self-end">
      <NewItemDrawer
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button onClick={handleClick} size="icon-xl" className="rounded-full">
            <Plus className="h-8 w-8" />
          </Button>
        }
      />
    </div>
  );
};
