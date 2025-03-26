'use client';
import ProductCategoryTopLayout from '@/components/layouts/ProductCategoryTopLayout';
import React from 'react';

const ProductsPage: React.FC = () => {
  return (
    <div className='container mx-auto py-4'>
      {/* 카테고리 네비게이션 */}
      <ProductCategoryTopLayout />

      {/* 상품 목록 영역 */}
      <div className='mt-6'>{/* <ProductList categoryId={activeCategoryId} /> */}</div>
    </div>
  );
};

export default ProductsPage;
