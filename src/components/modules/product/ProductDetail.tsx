import { ProductTypes } from '@/types/products/productTypes';
import { ProductTagsType } from '@/types/products/productRequestTypes';
import { ProductOption } from '@/types/products/productPurchaseTypes';
import ProductImage from '@/components/ui/products/ProductImage';
import ProductInfoSection from './ProductInfoSection';
import ProductActionsWrapper from '@/components/ui/products/ProductActionsWrapper';

const dummyProducts: ProductTypes = {
  productCode: '1000',
  productName: 'SS 플라워 마켓 스탠리 텀블러 591ml',
  description: '부드러운 푸릇빛이 새롭게 담은 플라워 마켓 스탠리 텀블러입니다.',
  productThumbnailUrl: '/images/productThumbnails/1000.png',
  productImageUrl: '/images/productDetailImages/1000_detail.png',
  markable: 'N',
  price: 43000,
};

// 더미 옵션 데이터
const dummyOptions: ProductOption[] = [
  {
    id: 'color',
    name: '색상',
    values: ['블랙', '화이트', '네이비', '그레이'],
  },
  {
    id: 'size',
    name: '사이즈',
    values: ['S', 'M', 'L', 'XL'],
  },
];

export default async function ProductDetail({ productCode }: { productCode: string }) {
  // 병렬로 데이터 요청 (실제 API 사용 시)
  // const [product, tags, productOptions] = await Promise.all([
  //   getProductDetail(productCode),
  //   getProductTags(productCode),
  //   getProductOptions(productCode)
  // ]);

  // 더미 데이터 사용
  console.log(productCode);

  const product = dummyProducts;
  const tags: ProductTagsType = {
    productCode: dummyProducts.productCode,
    isBest: true,
    isNew: true,
    isMarkable: true,
  };

  const productOptions = dummyOptions;

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

      {/* 클라이언트 컴포넌트로 래핑하여 이벤트 핸들러 사용 가능 */}
      <ProductInfoSection product={product} tags={tags} />

      {/* 클라이언트 컴포넌트로 래핑하여 모달과 인터랙션 처리 */}
      <ProductActionsWrapper
        productId={product.productCode}
        productName={product.productName}
        productPrice={product.price}
        productOptions={productOptions}
      />
    </main>
  );
}
