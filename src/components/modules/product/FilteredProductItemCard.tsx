'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Tag from '../../ui/main/Tag';
import Link from 'next/link';
import { dummyProductDetail } from '@/data/productDummy/filteredProductDummy';

interface ProductDetail {
  productCode: number;
  productName: string;
  price: number;
  productThumbnailUrl: string;
  isNew?: boolean;
  isBest?: boolean;
  isMarkable?: boolean;
}

interface FilteredProductCardProps {
  productCode: number;
}

export default function FilteredProductItemCard({ productCode }: FilteredProductCardProps) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProduct(dummyProductDetail);
      setLoading(false);
    }, 300); // 로딩 상태를 보여주기 위한 짧은 지연
  }, [productCode]);

  if (loading) {
    return (
      <div className='w-full animate-pulse'>
        <div className='aspect-square w-full bg-gray-200 rounded-[4px]'></div>
        <div className='h-4 bg-gray-200 rounded my-3 w-3/4'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      </div>
    );
  }
  if (!product) return;

  return (
    <Link href={`/products/${product.productCode}`} scroll={false} className='block w-full'>
      <div className='w-full'>
        <div className='relative aspect-square w-full'>
          <Image
            src='/images/productThumbnails/1000.png'
            alt='아주멋진 이미지입니다.'
            className='rounded-[4px]'
            fill
            sizes='100%'
          />
        </div>
        <Tag isMarkable={true} isNew={false} isBest={true} />
        <h3 className='text-button2 my-3'>SS 플라워 마켓 스탠리 텀블러 591ml</h3>
        <p className='text-subtitle2'>7000원</p>
      </div>
    </Link>
  );
}
