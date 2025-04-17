export type InStockToggleProps = {
  inStock: boolean;
  loading?: boolean;
  onInStockChange: (inStock: boolean) => void;
};
