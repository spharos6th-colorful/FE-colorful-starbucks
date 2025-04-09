'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Tag from '../../ui/main/Tag';
import { getProductDetailDummy, ProductDetail } from '@/actions/product-service';
import FilteredProductItemCardSkelton from './FilteredProductItemCardSkelton';

interface FilteredProductCardProps {
  productCode: number;
}

export default function FilteredProductItemCard({ productCode }: FilteredProductCardProps) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDetail = await getProductDetailDummy(productCode); //Dummy만 빼면 됨 나중에
        setProduct(productDetail);
      } catch (error) {
        console.error('상품 정보 로딩 실패', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productCode]);

  if (loading) {
    return <FilteredProductItemCardSkelton />;
  }
  if (!product) return;

  return (
    <Link href={`/products/${product.productCode}`} scroll={false} className='block w-full'>
      <div className='w-full'>
        <div className='relative aspect-square w-full mb-2'>
          <Image
            src={product.productThumbnailUrl}
            alt={product.productName}
            className='rounded-[4px]'
            fill
            sizes='100%'
          />
        </div>
        <Tag isMarkable={product.isMarkable} isNew={product.isNew} isBest={product.isBest} />
        <h3 className='text-button2 my-3'>{product.productName}</h3>
        <p className='text-subtitle2'>{product.price.toLocaleString()}원</p>
      </div>
    </Link>
  );
}
