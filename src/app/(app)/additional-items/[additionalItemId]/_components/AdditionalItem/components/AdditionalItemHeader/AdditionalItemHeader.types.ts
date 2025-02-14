import { type RouterOutputs } from "@/trpc/react";

export type AdditionalItemHeaderProps = {
  additionalItem: RouterOutputs["additionalItems"]["getById"];
};
