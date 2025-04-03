import React from 'react';

import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import ProductCategoryTopTabBar from '@/components/layouts/product/ProductCategoryTopTabBar';
import ProductDetailCategorySection from '@/components/layouts/product/ProductDetailCategorySection';
// import { getProductCategories, getProductFilters } from '@/actions/product-service';
import { sampleFilterData } from '@/data/productDummy/productCategoryTopDummyDatas';
import { getSubCategoriesAndVolume } from '@/actions/product-service';

type SearchParams = Promise<SearchParamsType>;

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const topCategoryId = searchParams.topCategoryId || '1';

  // 필터링된 파라미터 객체 생성
  const filteredParams: Record<string, string | string[] | undefined> = {};
  Object.entries(searchParams).forEach(([key, value]) => {
    filteredParams[key] = value;
  });

  // 서버에서 데이터 가져오기 현재는 더미로 할 예정
  // const [subCategories, filterOptions] = await Promise.all([
  //   getProductCategories(topCategoryId),
  //   getProductFilters(topCategoryId),
  // ]);

  //더미로 우선은 할 예정
  const { subDetailCategories, subVolumeCategories } = await getSubCategoriesAndVolume(topCategoryId);

  return (
    <main>
      <ProductCategoryTopTabBar initialCategory={topCategoryId} />
      <ProductDetailCategorySection
        searchParams={filteredParams}
        subCategories={subDetailCategories}
        subVolumeCategories={subVolumeCategories}
        filterOptions={sampleFilterData}
      />
      {/* 상품 리스트 영역 */}
      {/* <ProductList data={productListData} /> */}
    </main>
  );
}
