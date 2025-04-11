export type CounterProps = {
  value: number;
  onDecrement: (newValue: number) => void;
  onIncrement: (newValue: number) => void;
  minValue?: number;
  maxValue?: number;
};
