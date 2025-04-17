import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useDebounce<T extends (...args: any[]) => void>() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback((callback: T, delay: number = 500) => {
    return (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, []);
}
