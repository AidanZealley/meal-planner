import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { cn } from "@/lib/utils";
import type { LoadingButtonProps } from "./LoadingButton.types";

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading, className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={isLoading}
        className={cn("relative", className)}
        {...props}
      >
        <span
          className={cn(
            "transition-opacity",
            isLoading ? "opacity-0" : "opacity-100",
          )}
        >
          {children}
        </span>

        {isLoading && (
          <span className="absolute inset-0 grid place-items-center">
            <Spinner />
          </span>
        )}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";
