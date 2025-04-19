import { AnimatePresence, motion } from "motion/react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DialogConfirmationProps } from "./DialogConfirmation.types";

export const DialogConfirmation = ({
  open,
  onOpenChange,
  title,
  description,
  action,
}: DialogConfirmationProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "bg-background/85 absolute inset-0 grid place-items-center rounded-xl px-6 py-12 backdrop-blur-xs",
            isDesktop ? "" : "place-items-end justify-center",
          )}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="grid gap-6"
          >
            <div className="grid gap-1">
              <h3 className="font-semibold">{title}</h3>
              {description && <p className="text-sm">{description}</p>}
            </div>

            <div
              className={cn(
                "flex justify-end gap-3",
                isDesktop ? "" : "grid justify-normal",
              )}
            >
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className={cn(isDesktop ? "" : "order-1")}
              >
                Cancel
              </Button>
              {action}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
