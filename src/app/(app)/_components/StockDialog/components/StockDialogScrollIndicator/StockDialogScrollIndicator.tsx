import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { StockDialogScrollIndicatorProps } from "./StockDialogScrollIndicator.types";

export const StockDialogScrollIndicator = ({
  scrollingContainer,
  itemsContainer,
}: StockDialogScrollIndicatorProps) => {
  const [canScroll, setCanScroll] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const container = scrollingContainer.current;
      const content = itemsContainer.current;

      if (!container || !content) {
        return;
      }

      const checkScroll = () => {
        const canScroll = content.scrollHeight > container.clientHeight;
        const atTop = container.scrollTop <= 1;
        const atBottom =
          container.scrollTop + container.clientHeight >=
          content.scrollHeight - 1;

        setCanScroll(canScroll);
        setIsAtTop(atTop);
        setIsAtBottom(atBottom);
      };

      const handleScroll = () => {
        checkScroll();
      };

      container.addEventListener("scroll", handleScroll);

      const resizeObserver = new ResizeObserver(checkScroll);

      resizeObserver.observe(container);

      if (itemsContainer.current)
        resizeObserver.observe(itemsContainer.current);

      checkScroll();

      return () => {
        container.removeEventListener("scroll", handleScroll);
        resizeObserver.disconnect();
      };
    });

    return () => cancelAnimationFrame(raf);
  }, [scrollingContainer, itemsContainer]);

  return (
    <div
      className={cn(
        "sticky bottom-3 left-0 flex items-center gap-1 justify-self-center rounded-full bg-foreground px-4 py-2 text-center text-xs text-background opacity-50 backdrop-blur-xs transition-opacity",
        canScroll ? "opacity-50" : "opacity-0",
        canScroll && isAtTop ? "opacity-100" : "",
        isAtBottom ? "opacity-0" : "",
      )}
    >
      <ArrowDown className="h-3 w-3" />
      More items below
    </div>
  );
};
