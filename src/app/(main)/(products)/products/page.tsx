import React from 'react';

import ProductCategoryTopLayout from '@/components/layouts/ProductCategoryTopLayout';

export default function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const currentCategory = searchParams.category || 'all';

  return (
    <main>
      <ProductCategoryTopLayout initialCategory={currentCategory} />
      {/* 상품 소분류 카테고리 및 옵션들이 들어갈 예정 */}
      {/* 상품 리스트 나타낼 페에지가 들어갈 예정 */}
      {/* <ProductList categoryId={currentCategory} /> */}
    </main>
  );
}
