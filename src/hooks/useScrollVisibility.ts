'use client';

import { useState, useEffect } from 'react';

export function useScrollVisibility(delay = 1000) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const scrollListener = () => {
      // 이전 타임아웃 정리
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // 현재 상태가 visible이면 invisible로 변경
      if (isVisible) {
        setIsVisible(false);
      }

      // 새 타이머 설정
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, isVisible]);

  return isVisible;
}
