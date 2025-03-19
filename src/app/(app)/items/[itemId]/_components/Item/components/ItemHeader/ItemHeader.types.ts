import { type RouterOutputs } from "@/trpc/react";

export type ItemHeaderProps = {
  item: RouterOutputs["items"]["getById"];
};
