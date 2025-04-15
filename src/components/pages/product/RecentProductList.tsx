import React from 'react';

import ProductItemCard from '@/components/ui/common/product/ProductItemCard';
import { DailyRecentlyViewedProductsType } from '@/types/products/productTypes';
import { formatDate } from '@/lib/utils';

export default function RecentProductList({
  recentProducts,
}: {
  recentProducts: DailyRecentlyViewedProductsType[];
}) {
  return (
    <section className='m-4 mb-6 bg-white'>
      {recentProducts.map((products) => (
        <div
          key={products.viewedAt}
          className='border-b border-text-200 pb-5 mb-5'
        >
          <h2 className='text-sm font-medium mb-2'>
            {formatDate(products.viewedAt)}
          </h2>
          <div className='bg-white rounded-lg'>
            {products.recentlyViewProducts.map((product) => (
              <ProductItemCard
                key={product.productCode}
                productCode={product.productCode}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
