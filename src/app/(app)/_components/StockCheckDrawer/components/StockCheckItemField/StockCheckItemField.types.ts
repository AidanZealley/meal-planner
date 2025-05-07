import { type ControllerRenderProps } from "react-hook-form";
import { type StockItem } from "@/app/(app)/_components/StockCheckDrawer/StockCheckDrawer.types";

export type StockCheckItemFieldProps = {
  item: StockItem;
  field: ControllerRenderProps<
    {
      outOfStockItems: string[];
    },
    "outOfStockItems"
  >;
};
