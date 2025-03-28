import { useState, useEffect } from 'react';

export function useScrollVisibility(delay = 500) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      setIsVisible(false);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [delay]);

  return isVisible;
}
