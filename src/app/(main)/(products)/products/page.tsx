import React from 'react';

import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import ProductCategoryTopTabBar from '@/components/layouts/product/ProductCategoryTopTabBar';
import ProductDetailCategorySection from '@/components/layouts/product/ProductDetailCategorySection';
// import { getProductCategories, getProductFilters } from '@/actions/product-service';
import { sampleFilterData } from '@/data/productDummy/productCategoryTopDummyDatas';
import {
  // getFilteredProductsWithDetails,
  getSubCategoriesAndVolume,
} from '@/actions/product-service';
// import FilteredProductSection from '@/
// components/layouts/product/FilteredProductSection';
// import { getInitialProductsDummyData } from '@/data/productDummy/filteredProductDummy';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
  const { topCategoryId } = await searchParams;
  const { subDetailCategories, subVolumeCategories } = await getSubCategoriesAndVolume(Number(topCategoryId));

  // 필터링된 파라미터 객

  // FIXME: 서버에서 데이터 가져오기 현재는 더미로 할 예정
  // const [subCategories, filterOptions] = await Promise.all([
  //   getProductCategories(topCategoryId),
  //   getProductFilters(topCategoryId),
  // ]);

  // FIXME: 더미로 우선은 할 예정

  // FIXME: API호출 우선 구현은 되었고, 더미로 진행 예정
  // const initialProductsData = getInitialProductsData();

  // const initialProductsData = getInitialProductsDummyData();

  // 초기 상품들 랜더링
  return (
    <main>
      <ProductCategoryTopTabBar initialCategory={topCategoryId || '1'} />
      <ProductDetailCategorySection
        subCategories={subDetailCategories}
        subVolumeCategories={subVolumeCategories}
        filterOptions={sampleFilterData}
      />
      {/* TODO: 상품 리스트 영역 */}
      {/* <FilteredProductSection initialProductsData={initialProductsData} /> */}
    </main>
  );
}
