'use client';

import React, { useState, useRef, useCallback } from 'react';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import FilteredProductItemCard from '@/components/modules/product/FilteredProductItemCard';
import { getInitialProductsData } from '@/data/productDummy/filteredProductDummy';
import { useRouter, useSearchParams } from 'next/navigation';
import SortProducts from '@/components/modules/product/SortProducts';

interface ProductItem {
  id: number;
  productCode: number;
}

interface ProductListData {
  content: ProductItem[];
  hasNext: boolean;
  nextCursor: number | null;
}

interface FilteredProductSectionProps {
  searchParams: SearchParamsType;
  initialProductsData: ProductListData;
}

async function fetchMoreProductsDummy(params: SearchParamsType): Promise<ProductListData> {
  try {
    // 지연 효과를 주기 위한 setTimeout 사용
    return new Promise((resolve) => {
      setTimeout(() => {
        const cursor = params.cursor ? Number(params.cursor) : undefined;
        const moreData = getInitialProductsData(cursor);
        resolve(moreData);
      }, 300); // 로딩 효과를 보여주기 위한 지연
    });
  } catch (error) {
    console.error('추가 상품 로드 오류:', error);
    throw error;
  }
}

export default function FilteredProductSection({ searchParams, initialProductsData }: FilteredProductSectionProps) {
  const router = useRouter();
  const searchParamsObj = useSearchParams();

  const cursor = searchParamsObj.get('cursor') ? Number(searchParamsObj.get('cursor')) : initialProductsData.nextCursor;

  const [productsData, setProductsData] = useState<ProductListData>(initialProductsData);
  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(initialProductsData.hasNext);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, cursor],
  );

  const loadMoreProducts = async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const nextParams: SearchParamsType = {
        ...searchParams,
        cursor: cursor?.toString(),
      };

      const moreProductsData = await fetchMoreProductsDummy(nextParams);

      setProductsData((prevData) => ({
        ...moreProductsData,
        content: [...prevData.content, ...moreProductsData.content],
      }));

      setHasMore(moreProductsData.hasNext);

      if (moreProductsData.nextCursor) {
        updateUrlWithCursor(moreProductsData.nextCursor);
      }
    } catch (error) {
      console.error('추가 상품 로드 중 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUrlWithCursor = (newCursor: number) => {
    const params = new URLSearchParams(searchParamsObj.toString());
    params.set('cursor', newCursor.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className='mt-4 px-4'>
      <div className='flex justify-end mb-4'>
        <SortProducts />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {productsData.content.map((product, index) => {
          const isLastItem = index === productsData.content.length - 1;

          return (
            <div key={product.productCode} ref={isLastItem ? lastProductRef : undefined}>
              <FilteredProductItemCard productCode={product.productCode} />
            </div>
          );
        })}
      </div>

      {!hasMore && productsData.content.length > 0 && (
        <div className='text-center my-8 text-gray-500'>모든 상품을 불러왔습니다.</div>
      )}

      {!loading && productsData.content.length === 0 && (
        <div className='text-center my-16 p-8 bg-gray-50 rounded-lg'>
          <p className='text-lg text-gray-500'>조회된 상품이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
