import { useRef } from "react";

const useDebounced = (callback: (...args: any[]) => void, delay: number) => {
  const debounceTimeout = useRef(0);

  const debouncedCallback = (...args: any) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounced;
