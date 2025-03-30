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
  const [change, setChange] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(change + 1, maxValue - value);
    setChange(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const handleTimeout = async () => {
      await onIncrement(value + newValue);
      setChange(0);
    };
    timeoutRef.current = setTimeout(() => void handleTimeout(), timeout);
  }, [change, value, maxValue, onIncrement, timeout]);

  const handleDecrement = useCallback(() => {
    const newValue = change - 1;
    const newTotal = Math.max(minValue, value + newValue);

    if (newTotal === value) {
      return;
    }

    setChange(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const handleTimeout = async () => {
      await onDecrement(value + newValue);
      setChange(0);
    };
    timeoutRef.current = setTimeout(() => void handleTimeout(), timeout);
  }, [change, value, minValue, onDecrement, timeout]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    debouncedValue: value + change,
    handleIncrement,
    handleDecrement,
  };
};
