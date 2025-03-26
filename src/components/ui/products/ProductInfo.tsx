import { ProductTypes } from '@/types/products/productTypes';
import ProductAccordion from './ProductAccordion';

interface ProductInfoProps {
  product: ProductTypes;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className='px-4 py-5'>
      <div className='flex justify-between items-center mb-2'>
        <div>
          <h2 className='text-2xl font-bold'>{product.productName}</h2>
          {/* 여기에 best, new 같은거 와야함 */}
        </div>
        {/* 여기에 공유하기 컴포넌트 와야함 */}
      </div>

      <div className='flex items-center mb-3'>{/* <span className='text-sm text-gray-500'>{product.}</span> */}</div>

      <p className='text-sm text-gray-500 mb-5'>{product.description}</p>

      <p className='text-2xl font-bold mb-8'>{product.price?.toLocaleString()}원</p>

      <ProductAccordion title='상품정보' content={product.description || ''} />
    </div>
  );
}
