import ProductDetail from '@/components/modules/product/ProductDetail';
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

interface PageProps {
  params: Promise<{ productCode: string }>;
}

export default async function Page({ params }: PageProps) {
  //const { productCode } = await params;
  await params; //나중에 지울 예정

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

  return <ProductDetail product={product} tags={tags} productOptions={productOptions} />;
}
