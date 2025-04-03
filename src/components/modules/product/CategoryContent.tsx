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
    router.push(`?category=${category.code}`, { scroll: false });
  };

  return (
    <div className='flex justify-center'>
      <div className='flex overflow-x-auto hide-scrollbar'>
        {sampleCategories.map((category) => (
          <div key={category.code} className='flex-shrink-0'>
            <ProductCategoryTop
              name={category.name}
              isActive={currentCategoryCode === category.code}
              onClick={() => handleCategoryClick(category)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
