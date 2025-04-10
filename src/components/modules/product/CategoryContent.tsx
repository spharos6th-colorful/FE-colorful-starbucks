'use client';
import React, { useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProductCategoryTop from '@/components/ui/products/ProductCategoryTop';
import { CategoryTopResponseType } from '@/types/products/categoryResponseTypes';

type CategoryContentProps = {
  categoryTop: CategoryTopResponseType[];
};

export default function CategoryContent({ categoryTop }: CategoryContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryCode = searchParams.get('topCategoryId');

  const activeTabRef = useRef<HTMLDivElement>(null);

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
    <div className='flex justify-center'>
      <div className='flex overflow-x-auto hide-scrollbar'>
        {categoryTop.map((category) => {
          const isActive = currentCategoryCode === String(category.topCategoryId);
          return (
            <div key={category.topCategoryId} className='flex-shrink-0' ref={isActive ? activeTabRef : null}>
              <ProductCategoryTop
                name={category.categoryName}
                isActive={isActive}
                onClick={() => handleCategoryClick(category)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
