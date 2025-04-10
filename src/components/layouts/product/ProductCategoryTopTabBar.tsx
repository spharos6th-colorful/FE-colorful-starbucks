'use client';
import React from 'react';

import CategoryContent from '../../modules/product/CategoryContent';
import { CategoryTopResponseType } from '@/types/products/categoryResponseTypes';

type ProductCategoryTopTabBarProps = {
  categoryTop: CategoryTopResponseType[];
};

export default function ProductCategoryTopTabBar({ categoryTop }: ProductCategoryTopTabBarProps) {
  return (
    <div className='w-full border-b boarder-stroke-100 flex justify-center'>
      <div className='max-w-3xl w-full'>
        <CategoryContent categoryTop={categoryTop} />
      </div>
    </div>
  );
}
