import { z } from "zod";

export const stockCheckFormSchema = z.object({
  outOfStockItems: z.array(z.string()),
});
