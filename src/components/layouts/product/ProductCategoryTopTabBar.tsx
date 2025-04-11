'use client';
import React, { useEffect, useRef } from 'react';

import { CategoryTopResponseType } from '@/types/products/categoryResponseTypes';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCategoryTop from '@/components/ui/products/ProductCategoryTop';

type ProductCategoryTopTabBarProps = {
  topCategory: CategoryTopResponseType[];
};

export default function ProductCategoryTopTabBar({ topCategory }: ProductCategoryTopTabBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryCode = searchParams.get('topCategoryId') || '1';

  const activeTabRef = useRef<HTMLLIElement>(null);

  const handleCategoryClick = (category: CategoryTopResponseType) => {
    router.push(`?topCategoryId=${category.topCategoryId}`, { scroll: false });
  };

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentCategoryCode]);

  return (
    <ul className='flex justify-center border-b boarder-stroke-100 overflow-x-auto hide-scrollbar'>
      {topCategory.map((category) => {
        const isActive = currentCategoryCode === String(category.topCategoryId);
        return (
          <li key={category.topCategoryId} className='flex-shrink-0' ref={isActive ? activeTabRef : null}>
            <ProductCategoryTop
              name={category.categoryName}
              isActive={isActive}
              onClick={() => handleCategoryClick(category)}
            />
          </li>
        );
      })}
    </ul>
  );
}
