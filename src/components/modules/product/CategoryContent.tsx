'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import ProductCategoryTop from '@/components/ui/products/ProductCategoryTop';
import { sampleCategories } from '@/data/productDummy/productCategoryTopDummyDatas';
import { ProductCategoryTopType } from '@/types/products/productCategoryType';

export default function CategoryContent({ initialCategory }: { initialCategory: string }) {
  const router = useRouter();
  const currentCategoryCode = initialCategory;

  const handleCategoryClick = (category: ProductCategoryTopType) => {
    router.push(`?topCategoryId=${category.topCategoryId}`, { scroll: false });
  };

  return (
    <div className='flex justify-center'>
      <div className='flex overflow-x-auto hide-scrollbar'>
        {sampleCategories.map((category) => (
          <div key={category.topCategoryId} className='flex-shrink-0'>
            <ProductCategoryTop
              name={category.categoryName}
              isActive={currentCategoryCode === category.topCategoryId.toString()}
              onClick={() => handleCategoryClick(category)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
