import { ProductTypes } from '@/types/products/productTypes';
import ProductAccordion from './ProductAccordion';

export default function ProductInfo(product: ProductTypes) {
  return (
    <section className='px-4 py-5'>
      <div className='flex justify-between items-center mb-2'>
        {/* 여기에 best, new 같은거 와야함 */}
        <h2 className='text-2xl font-bold'>{product.productName}</h2>
        {/* 여기에 공유하기 컴포넌트 와야함 */}
      </div>

      <div className='flex items-center mb-3'>{/* <span className='text-sm text-gray-500'>{product.}</span> */}</div>

      {/* 이런 것들도 컴포넌트화 해야함 */}
      <p className='text-sm text-gray-500 mb-5'>{product.description}</p>

      {/* <p className='text-2xl font-bold mb-8'>{product.price.toLocaleString()}원</p> */}

      {/* 현재 가격 정보 없어서 이렇게 변경 */}
      <p className='text-2xl font-bold mb-8'>{product.price ? product.price.toLocaleString() : '가격 정보 없음'}원</p>

      <ProductAccordion title='상품정보' content={product.description} />
    </section>
  );
}
