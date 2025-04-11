'use client';
import React from 'react';

import CategoryContent from '../../modules/product/CategoryContent';
import { CategoryTopResponseType } from '@/types/products/categoryResponseTypes';

type ProductCategoryTopTabBarProps = {
  topCategory: CategoryTopResponseType[];
};

export default function ProductCategoryTopTabBar({ topCategory }: ProductCategoryTopTabBarProps) {
  return (
    <div className='w-full border-b boarder-stroke-100 flex justify-center'>
      <div className='max-w-3xl w-full'>
        <CategoryContent topCategory={topCategory} />
      </div>
    </div>
  );
}
