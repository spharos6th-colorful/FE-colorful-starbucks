import React, { Suspense } from 'react';

import ProductCategoryTopLayout from '@/components/layouts/ProductCategoryTopLayout';

const ProductsPage: React.FC = () => {
  return (
    <div className='container mx-auto py-4'>
      <Suspense fallback={''}>
        {/* TODO : fallback에 스켈레톤 적용예정*/}
        <ProductCategoryTopLayout />
      </Suspense>
      {/* 상품 소분류 카테고리 및 옵션들이 들어갈 예정 */}
      {/* 상품 리스트 나타낼 페에지가 들어갈 예정 */}
      <div className='mt-6'>{/* <ProductList categoryId={activeCategoryId} /> */}</div>
    </div>
  );
};

export default ProductsPage;
