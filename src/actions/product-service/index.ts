'use server';

import { ProductOptionType } from '@/types/products/productPurchaseTypes';
import { ProductTagsType } from '@/types/products/productRequestTypes';
import { ProductTypes } from '@/types/products/productTypes';

export const getProductDetail = async (productCode: string): Promise<ProductTypes> => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/products/${productCode}`);
    if (!response.ok) {
      throw new Error(`상품 정보를 가져오는데 실패했습니다: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('상품 상세 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

export const getProductTags = async (productCode: string): Promise<ProductTagsType> => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/products/${productCode}/tags`);
    if (!response.ok) {
      throw new Error(`상품 태그 정보를 가져오는데 실패했습니다: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('상품 태그 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

export const getProductOptions = async (productCode: string): Promise<ProductOptionType[]> => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/products/${productCode}/options`);
    if (!response.ok) {
      throw new Error(`상품 옵션 정보를 가져오는데 실패했습니다: ${response.status}`);
    }

    const result = await response.json();
    const optionsData = result.data.options;

    const formattedOptions: ProductOptionType[] = [];

    if (optionsData.size) {
      formattedOptions.push({
        id: 'size',
        name: '사이즈',
        values: optionsData.size.map((item: { sizeName: string }) => item.sizeName),
      });
    }

    if (optionsData.color) {
      formattedOptions.push({
        id: 'color',
        name: '색상',
        values: optionsData.color.map((item: { colorName: string }) => item.colorName),
      });
    }

    return formattedOptions;
  } catch (error) {
    console.error('상품 옵션 정보 조회 중 오류 발생:', error);
    throw error;
  }
};
