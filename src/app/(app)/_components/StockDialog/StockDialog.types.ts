import type { z } from "zod";
import type { stockCheckFormSchema } from "./StockDialog.schemas";

export type StockItem = {
  itemId: string;
  name: string;
};

export type StockCheckFormData = z.infer<typeof stockCheckFormSchema>;

export type StockDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: StockItem[];
};
