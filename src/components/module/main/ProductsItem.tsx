import Image from 'next/image';

import Tag from '../../ui/main/Tag';

type Product = {
  productCode: string;
  productName: string;
  price: number;
  productThumbnail: string;
};

export default function ProductsItem({ product }: { product: Product }) {
  const { productName, price, productThumbnail } = product;
  return (
    <div className='w-full'>
      <div className='relative aspect-square w-full'>
        <Image fill src={productThumbnail} alt={productName} className='rounded-[4px]' />
      </div>
      <Tag isLimited={true} isNew={false} isBest={true} />
      <h3 className='text-button2 mb-[12px] mt-[12px] '>{productName}</h3>
      <p className='text-subtitle2'>{price.toLocaleString()}원</p>
    </div>
  );
}
