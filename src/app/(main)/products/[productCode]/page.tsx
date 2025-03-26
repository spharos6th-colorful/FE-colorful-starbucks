// app/products/[productCode]/page.tsx
// import { getProductDetail } from '@/app/api/products/[productCode]/productDetail';
import ProductActions from '@/components/ui/products/ProductActions';
import ProductImage from '@/components/ui/products/ProductImage';
import ProductInfo from '@/components/ui/products/ProductInfo';
import { ProductTypes } from '@/types/products/productTypes';

const dummyProducts: ProductTypes = {
  productCode: '1000',
  productName: 'SS 플라워 마켓 스탠리 텀블러 591ml',
  description: '부드러운 푸릇빛이 새롭게 담은 플라워 마켓 스탠리 텀블러입니다.',
  productThumbnail: '/images/productThumbnails/1000.png',
  productCommonImage: '/images/productThumbnails/1000.png',
  CarvingStatus: 'N',
  price: 43000,
};

export default async function ProductDetailPage({ params }: { params: { productCode: string } }) {
  //   let product: ProductTypes | null = null; // api 요청 해야하지만 지금은 더미로 이용
  const product = dummyProducts;
  console.log(params); //나중에 지울 예정(사용하지 않는 변수때문에)

  try {
    //product = await getProductDetail(params.productCode); // API 요청 날려야하지만 현재는 더미
  } catch (err) {
    console.error('상품 정보를 불러오는데 실패했습니다:', err);
  }

  if (!product) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>상품 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen bg-white'>
      <ProductImage imageUrl={product.productCommonImage} name={product.productName} />
      <ProductInfo product={product} />
      <div className='flex-1'></div>
      <ProductActions productId={product.productCode} />
    </div>
  );
}
