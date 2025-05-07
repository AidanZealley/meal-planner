"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewItemDrawer } from "../NewItemDrawer";

export const NewItemButton = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeOpen = (open: boolean) => {
    setOpen(open);
  };

  return (
    <div ref={container} className="sticky right-6 bottom-6 justify-self-end">
      <NewItemDrawer
        open={open}
        onOpenChange={handleChangeOpen}
        trigger={
          <Button onClick={handleOpen} size="icon-xl" className="rounded-full">
            <Plus className="h-8 w-8" />
          </Button>
        }
        container={container}
      />
    </div>
  );
};
