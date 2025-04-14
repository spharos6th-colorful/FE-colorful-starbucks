import React from 'react';

import ProductItemCard from '@/components/ui/common/product/ProductItemCard';
import { DailyRecentlyViewedProducts } from '@/types/products/productTypes';

export default function RecentProductGroup({
  recentProducts,
}: {
  recentProducts: DailyRecentlyViewedProducts;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <section className='mb-6'>
      <h2 className='text-sm font-medium text-gray-500 mb-2'>
        {formatDate(recentProducts.viewedAt)}
      </h2>
      <div className='bg-white rounded-lg '>
        {recentProducts.recentlyViewProducts.map((products) => (
          <ProductItemCard
            key={products.productCode}
            productCode={products.productCode}
          />
        ))}
      </div>
    </section>
  );
}
