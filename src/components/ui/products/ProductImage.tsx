import Image from 'next/image';

import { ProductImageProps } from '@/types/products/productImageProps';

export default function ProductImage({ imageUrl, name }: ProductImageProps) {
  return (
    <div className='w-full h-96 bg-gray-100 relative'>
      {imageUrl && <Image src={imageUrl} alt={name || '상품 이미지'} fill className='object-contain' priority />}
    </div>
  );
}
