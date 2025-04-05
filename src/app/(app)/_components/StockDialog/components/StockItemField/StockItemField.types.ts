import { type ControllerRenderProps } from "react-hook-form";
import { type StockItem } from "@/app/(app)/_components/StockDialog/StockDialog.types";

export type StockItemFieldProps = {
  item: StockItem;
  field: ControllerRenderProps<
    {
      outOfStockItems: string[];
    },
    "outOfStockItems"
  >;
};
