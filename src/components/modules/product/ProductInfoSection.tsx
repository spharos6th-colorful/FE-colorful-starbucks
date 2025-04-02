'use client';
import Image from 'next/image';

import { ProductTypes } from '@/types/products/productTypes';
import { ProductTagsType } from '@/types/products/productRequestTypes';
import ProductInfo from '@/components/ui/products/ProductInfo';

interface ProductInfoSectionProps {
  product: ProductTypes;
  tags: ProductTagsType;
}

export default function ProductInfoSection({ product, tags }: ProductInfoSectionProps) {
  return (
    <section>
      <div className='w-full z-20 bg-white pt-4'>
        <ProductInfo
          {...product}
          tags={{
            isBest: tags.isBest,
            isNew: tags.isNew,
            isMarkable: tags.isMarkable,
          }}
        />
      </div>

      <div className='w-full mt-4'>
        <Image
          src={product.productImageUrl}
          alt={product.productName}
          width={370}
          height={1500}
          className='w-full h-auto'
        />
      </div>
    </section>
  );
}
