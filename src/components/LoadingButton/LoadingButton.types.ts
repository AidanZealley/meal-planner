import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "../ui/button";

export type LoadingButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
    isLoading: boolean;
  };
