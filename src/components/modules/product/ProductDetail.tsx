'use client';

import Image from 'next/image';

import ProductActions from '@/components/ui/products/ProductActions';
import ProductImage from '@/components/ui/products/ProductImage';
import ProductInfo from '@/components/ui/products/ProductInfo';
import { ProductTypes } from '@/types/products/productTypes';

const dummyProducts: ProductTypes = {
  productCode: '1000',
  productName: 'SS 플라워 마켓 스탠리 텀블러 591ml',
  description: '부드러운 푸릇빛이 새롭게 담은 플라워 마켓 스탠리 텀블러입니다.',
  productThumbnailUrl: '/images/productThumbnails/1000.png',
  productImageUrl: '/images/productDetailImages/1000_detail.png',
  markable: 'N',
  price: 43000,
};

export default function ProductDetail({ productCode }: { productCode: string }) {
  /// const { productCode } = await params;

  //const product = await getProductDetail(productCode); // API 요청 날려야하지만 현재는 더미
  const product = dummyProducts;
  console.log(productCode);

  return (
    <main className='flex flex-col min-h-screen bg-white'>
      <section>
        <div className='w-full relative' style={{ height: 'min(100vw, 100vh)' }}>
          <ProductImage
            imageUrl={product.productThumbnailUrl}
            name={`${product.productName} 썸네일 이미지`}
            containerClassName='w-full h-full'
            objectFit='cover'
            priority={true}
          />
        </div>
      </section>
      <section>
        <div className='w-full z-20 bg-white pt-4'>
          <ProductInfo {...product} />
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
      <section>
        <div className='w-full z-30'>
          <ProductActions productId={product.productCode} />
        </div>
      </section>
    </main>
  );
}
