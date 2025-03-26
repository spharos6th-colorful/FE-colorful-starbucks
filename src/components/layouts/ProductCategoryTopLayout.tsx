'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { sampleCategories } from '@/data/productCategoryTopDummyDatas';
import { ProductCategoryTopType } from '@/types/productCategoryType';
import ProductCategoryTop from '../ui/ProductCategoryTop';

export default function ProductCategoryTopLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryCode = searchParams.get('category') || 'all';

  const handleCategoryClick = (category: ProductCategoryTopType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category.code);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='w-full border-b boarder-stroke-100'>
      <div className='flex overflow-x-auto'>
        {sampleCategories.map((category) => (
          <div key={category.id} className='flex-shrink-0'>
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
