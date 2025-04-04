'use server';

import {
  FilterDataType,
  ProductCategoryTopType,
  SubDetailCategoryType,
  SubSizeCateogryType,
} from '@/types/products/productCategoryType';
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

export async function getProductCategories(topCategoryId: string): Promise<ProductCategoryTopType[]> {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/categories/${topCategoryId}/subcategories`);
    if (!response.ok) {
      throw new Error(`하위 카테고리 정보를 가져오는데 실패했습니다: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('하위 카테고리 정보 조회 중 오류 발생:', error);
    throw error;
  }
}

// 카테고리 ID에 따른 필터 옵션 조회
export async function getProductFilters(topCategoryId: string): Promise<FilterDataType> {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/categories/${topCategoryId}/filters`);
    if (!response.ok) {
      throw new Error(`필터 옵션 정보를 가져오는데 실패했습니다: ${response.status}`);
    }

    const result = await response.json();
    return {
      price: result.data.price || [],
      seasons: result.data.seasons || [],
    };
  } catch (error) {
    console.error('필터 옵션 정보 조회 중 오류 발생:', error);
    throw error;
  }
}

// FIXME: 현재는 더미 넘겨주는 함수이다. 나중에 변경 예정
type SubCategoriesAndVolume = {
  subDetailCategories: SubDetailCategoryType[];
  subVolumeCategories: SubSizeCateogryType[];
};
export async function getSubCategoriesAndVolume(topCategoryId: string): Promise<SubCategoriesAndVolume> {
  switch (topCategoryId) {
    case '1': // 전체
      return {
        subDetailCategories: [],
        subVolumeCategories: [],
      };
    case '2': // 텀블러/보온병
      return {
        subDetailCategories: [
          { bottomCategoryId: 1, categoryName: '플라스틱 텀블러' },
          { bottomCategoryId: 2, categoryName: '스테인리스 텀블러' },
          { bottomCategoryId: 3, categoryName: '보온병' },
        ],
        subVolumeCategories: [
          { sizeId: 'short', sizeName: 'Short' },
          { sizeId: 'tall', sizeName: 'Tall' },
          { sizeId: 'grande', sizeName: 'Grande' },
          { sizeId: 'venti', sizeName: 'Venti' },
        ],
      };
    case '3': // 머그/컵
      return {
        subDetailCategories: [
          { bottomCategoryId: 1, categoryName: '스테인리스 머그' },
          { bottomCategoryId: 2, categoryName: '세라믹 머그' },
          { bottomCategoryId: 3, categoryName: '글라스 머그' },
        ],
        subVolumeCategories: [
          { sizeId: 'short', sizeName: 'Short' },
          { sizeId: 'tall', sizeName: 'Tall' },
          { sizeId: 'grande', sizeName: 'Grande' },
        ],
      };
    case '4': // 라이프스타일
      return {
        subDetailCategories: [
          { bottomCategoryId: 1, categoryName: '키친' },
          { bottomCategoryId: 2, categoryName: '홈' },
          { bottomCategoryId: 3, categoryName: '트래블' },
        ],
        subVolumeCategories: [],
      };
    case '5': // 티/커피
      return {
        subDetailCategories: [
          { bottomCategoryId: 1, categoryName: '티 용품' },
          { bottomCategoryId: 2, categoryName: '커피 용품' },
          { bottomCategoryId: 3, categoryName: '티/커피 액세서리' },
        ],
        subVolumeCategories: [
          { sizeId: 'short', sizeName: 'Short' },
          { sizeId: 'tall', sizeName: 'Tall' },
          { sizeId: 'grande', sizeName: 'Grande' },
        ],
      };
    default:
      return {
        subDetailCategories: [],
        subVolumeCategories: [],
      };
  }
}
