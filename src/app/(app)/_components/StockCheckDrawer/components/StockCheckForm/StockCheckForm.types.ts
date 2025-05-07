import type { z } from "zod";

import type { stockCheckFormSchema } from "./StockCheckForm.schemas";
import type { StockItem } from "../../StockCheckDrawer.types";

export type StockCheckFormData = z.infer<typeof stockCheckFormSchema>;

export type StockCheckFormProps = {
  items: StockItem[];
  onClose?: () => void;
};
