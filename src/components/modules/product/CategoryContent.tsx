'use client';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ProductCategoryTop from '@/components/ui/products/ProductCategoryTop';
import { sampleCategories } from '@/data/productDummy/productCategoryTopDummyDatas';
import { ProductCategoryTopType } from '@/types/products/productCategoryType';

export default function CategoryContent({ initialCategory }: { initialCategory: string }) {
  const router = useRouter();
  const currentCategoryCode = initialCategory;
  const activeTabRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: ProductCategoryTopType) => {
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
        {sampleCategories.map((category) => {
          const isActive = currentCategoryCode === category.topCategoryId.toString();
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
