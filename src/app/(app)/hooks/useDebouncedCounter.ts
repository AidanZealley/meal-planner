import { useCallback, useEffect, useRef, useState } from "react";

type UseDebouncedCounterProps = {
  value: number;
  onIncrement: (currentDebouncedValue: number) => Promise<void>;
  onDecrement: (currentDebouncedValue: number) => Promise<void>;
  timeout?: number;
  minValue?: number;
  maxValue?: number;
};

type UseDebouncedCounterReturn = {
  debouncedValue: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};

export const useDebouncedCounter = ({
  value,
  onIncrement,
  onDecrement,
  timeout = 500,
  minValue = -Infinity,
  maxValue = Infinity,
}: UseDebouncedCounterProps): UseDebouncedCounterReturn => {
  const [debouncedValue, setDebouncedValue] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(debouncedValue + 1, maxValue - value);
    setDebouncedValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      await onIncrement(value + newValue);
      setDebouncedValue(0);
    }, timeout);
  }, [debouncedValue, value, maxValue, onIncrement, timeout]);

  const handleDecrement = useCallback(() => {
    const newValue = debouncedValue - 1;
    const newTotal = Math.max(minValue, value + newValue);

    if (newTotal === value) {
      return;
    }

    setDebouncedValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      await onDecrement(value + newValue);
      setDebouncedValue(0);
    }, timeout);
  }, [debouncedValue, value, minValue, onDecrement, timeout]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { 
    debouncedValue: value + debouncedValue,
    handleIncrement,
    handleDecrement
  };
};
