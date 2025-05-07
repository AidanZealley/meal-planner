export type StockItem = {
  itemId: string;
  name: string;
};

export type StockCheckDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: StockItem[];
};
