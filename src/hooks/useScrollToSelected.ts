import { useEffect, RefObject } from 'react';

export function useScrollToSelected<T, E extends HTMLElement>(
  selectedItem: T | undefined | null,
  ref: RefObject<E> | null,
) {
  useEffect(() => {
    if (selectedItem && ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedItem, ref]);
}
