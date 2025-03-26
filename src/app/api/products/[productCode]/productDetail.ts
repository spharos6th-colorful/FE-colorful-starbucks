import { ProductTypes } from '@/types/products/productTypes';

export const getProductDetail = async (productCode: string): Promise<ProductTypes> => {
  try {
    const response = await fetch(`http://localhost:8080/api/products/${productCode}`);

    if (!response.ok) {
      throw new Error(`상품 정보를 가져오는데 실패했습니다: ${response.status}`);
    }

    const productData: ProductTypes = await response.json();
    return productData;
  } catch (error) {
    console.error('상품 상세 정보 조회 중 오류 발생:', error);
    throw error;
  }
};
