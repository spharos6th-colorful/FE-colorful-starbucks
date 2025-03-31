import Image from 'next/image';

// import { getProductDetail } from '@/app/api/products/[productCode]/productDetail';
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

export default async function ProductDetailPage({ params }: { params: { productCode: string } }) {
  // const { productCode } = await params;

  //const product = await getProductDetail(productCode); // API 요청 날려야하지만 현재는 더미
  const product = dummyProducts;
  console.log(params); //나중에 지울 예정(사용하지 않는 변수때문에)

  console.log(product);

  return (
    <main className='flex flex-col h-screen bg-white'>
      <ProductImage
        imageUrl={product.productThumbnailUrl}
        name={`${product.productName} 썸네일 이미지`}
        containerClassName='fixed top-0 left-0 w-full aspect-square z-10'
        priority={true}
      />
      <ProductInfo {...product} />
      <div className='w-full'>
        <div className='w-full'>
          <Image
            src={product.productImageUrl}
            alt={product.productName}
            width={768}
            height={15000} // 실제 비율이 무엇이든 상관없음
            className='w-full h-auto'
          />
        </div>
      </div>
      <ProductActions productId={product.productCode} />
    </main>
  );
}
