import { ProductTypes } from '@/types/products/productTypes';
import { ProductTagsType } from '@/types/products/productRequestTypes';
import { ProductOptionType } from '@/types/products/productPurchaseTypes';
import ProductImage from '@/components/ui/products/ProductImage';
import ProductInfoSection from './ProductInfoSection';
import ProductActionsWrapper from '@/components/ui/products/ProductActionsWrapper';

interface ProductDetailProps {
  product: ProductTypes;
  tags: ProductTagsType;
  productOptions: ProductOptionType[];
}

export default function ProductDetail({ product, tags, productOptions }: ProductDetailProps) {
  return (
    <main className='flex flex-col min-h-screen bg-white'>
      <section className='w-full relative' style={{ height: 'min(100vw, 100vh)' }}>
        <ProductImage
          imageUrl={product.productThumbnailUrl}
          name={`${product.productName} 썸네일 이미지`}
          containerClassName='w-full h-full'
          objectFit='cover'
          priority={true}
        />
      </section>

      {/* 클라이언트 컴포넌트로 래핑하여 이벤트 핸들러 사용 가능 */}
      <ProductInfoSection product={product} tags={tags} />

      {/* 클라이언트 컴포넌트로 래핑하여 모달과 인터랙션 처리 */}
      <ProductActionsWrapper
        productId={product.productCode}
        productPrice={product.price}
        productOptions={productOptions}
      />
    </main>
  );
}
