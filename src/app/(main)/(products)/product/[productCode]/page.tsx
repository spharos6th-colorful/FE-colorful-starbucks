import ProductImage from '@/components/ui/products/ProductImage';
import ProductInfoSection from '@/components/modules/product/ProductInfoSection';
import ProductActionsWrapper from '@/components/ui/products/ProductActionsWrapper';
import { ProductTagsType } from '@/types/products/productRequestTypes';
import { ProductTypes } from '@/types/products/productTypes';
import { ProductOptionType } from '@/types/products/productPurchaseTypes';

const dummyProducts: ProductTypes = {
  productCode: '1000',
  productName: 'SS 플라워 마켓 스탠리 텀블러 591ml',
  description: '부드러운 푸릇빛이 새롭게 담은 플라워 마켓 스탠리 텀블러입니다.',
  productThumbnailUrl: '/images/productThumbnails/1000.png',
  productImageUrl: '/images/productDetailImages/1000_detail.png',
  markable: 'N',
  price: 43000,
};

const dummyTags: ProductTagsType = {
  productCode: dummyProducts.productCode,
  isBest: true,
  isNew: true,
  isMarkable: true,
};

const dummyOptions: ProductOptionType[] = [
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

export default async function Page({ params }: { params: Promise<{ productCode: string }> }) {
  const { productCode } = await params;
  console.log(productCode);

  //  더미 데이터 사용
  const product = dummyProducts;
  const tags = dummyTags;
  const productOptions = dummyOptions;

  // 실제 API 사용 시
  // const [product, tags, productOptions] = await Promise.all([
  //   getProductDetail(productCode),
  //   getProductTags(productCode),
  //   getProductOptions(productCode),
  // ]);

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

      <ProductInfoSection product={product} tags={tags} />

      <ProductActionsWrapper
        productId={product.productCode}
        productPrice={product.price}
        productOptions={productOptions}
      />
    </main>
  );
}
