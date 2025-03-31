import React from 'react';

import ProductCategoryTopLayout from '@/components/layouts/ProductCategoryTopLayout';

export default function ProductsPage() {
  return (
    // 가장 큰 속성에는 대부분 스타일은 뺀다.(안에 있는걸 줄이면 됨)
    <main>
      <ProductCategoryTopLayout />
      {/* 상품 소분류 카테고리 및 옵션들이 들어갈 예정 */}
      {/* 상품 리스트 나타낼 페에지가 들어갈 예정 */}
      {/* <ProductList categoryId={activeCategoryId} /> */}
    </main> // 최상단에서 메인으로 div 대신
  );
}
