export type CounterProps = {
  value: number;
  onIncrement: (newValue: number) => Promise<void>;
  onDecrement: (newValue: number) => Promise<void>;
  isPendingDecrement: boolean;
  isPendingIncrement: boolean;
  minValue: number;
};
