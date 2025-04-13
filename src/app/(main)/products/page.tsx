import React from 'react';

import {
  getBottomCategories,
  getTopCategories,
} from '@/actions/product-service';
import ProductCategoryTopTabBar from '@/components/layouts/product/ProductCategoryTopTabBar';
import ProductDetailCategorySection from '@/components/layouts/product/ProductDetailCategorySection';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
// import CategoryContent from '@/components/modules/product/CategoryContent';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const params = await searchParams;
  const filteredParams: SearchParamsType = {};

  Object.entries(params).forEach(([key, value]) => {
    filteredParams[key] = value;
  });

  const topCategoryId = params.topCategoryId || '0';

  const [topCategory, bottomCategory] = await Promise.all([
    getTopCategories(),
    getBottomCategories(Number(topCategoryId)),
  ]);

  return (
    <>
      <header>
        <nav>
          <ProductCategoryTopTabBar topCategory={topCategory} />
          <ProductDetailCategorySection
            topCategoryId={topCategoryId}
            bottomCategory={bottomCategory}
          />
        </nav>
      </header>
      <main></main>
    </>
  );
}
