'use server';

import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import {
  FilterDataType,
  ProductCategoryTopType,
  SubDetailCategoryType,
  SubSizeCateogryType,
} from '@/types/products/productCategoryType';
import { ProductOptionType } from '@/types/products/productPurchaseTypes';
import { ProductTagsType } from '@/types/products/productRequestTypes';
import {
  DailyRecentlyViewedProductsType,
  ProductListDataType,
  ProductTypes,
} from '@/types/products/productTypes';
import { instance } from '../instance';
import {
  CategoryBottomResponseType,
  CategoryTopResponseType,
} from '@/types/products/categoryResponseTypes';

const BASE_URL = 'http://13.209.230.182:8080/api/v1';

export const getTopCategories = async (): Promise<
  CategoryTopResponseType[]
> => {
  try {
    const response = await fetch(BASE_URL + `/top-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 * 60 * 24 },
    });
    const result = await response.json();
    return result.data.categories;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBottomCategories = async (
  topCategoryId: number,
): Promise<CategoryBottomResponseType[]> => {
  try {
    const response = await fetch(
      BASE_URL + `/bottom-categories?topCategoryId=${topCategoryId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 * 60 * 24 }, // 1일
      },
    );
    const result = await response.json();
    return result.data.categories;
  } catch (error) {
    throw error;
  }
};

export const getProductDetail = async (
  productCode: number,
): Promise<ProductTypes> => {
  try {
    const response = await fetch(
      BASE_URL + `http://localhost:8080/api/v1/products/${productCode}`,
    );

    if (!response.ok) {
      throw new Error(
        `상품 정보를 가져오는데 실패했습니다: ${response.status}`,
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('상품 상세 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

export const getProductTags = async (
  productCode: number,
): Promise<ProductTagsType> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/products/${productCode}/tags`,
    );
    if (!response.ok) {
      throw new Error(
        `상품 태그 정보를 가져오는데 실패했습니다: ${response.status}`,
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('상품 태그 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

export const getProductOptions = async (
  productCode: number,
): Promise<ProductOptionType[]> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/products/${productCode}/options`,
    );
    if (!response.ok) {
      throw new Error(
        `상품 옵션 정보를 가져오는데 실패했습니다: ${response.status}`,
      );
    }

    const result = await response.json();
    const optionsData = result.data.options;

    const formattedOptions: ProductOptionType[] = [];

    if (optionsData.size) {
      formattedOptions.push({
        id: 'size',
        name: '사이즈',
        values: optionsData.size.map(
          (item: { sizeName: string }) => item.sizeName,
        ),
      });
    }

    if (optionsData.color) {
      formattedOptions.push({
        id: 'color',
        name: '색상',
        values: optionsData.color.map(
          (item: { colorName: string }) => item.colorName,
        ),
      });
    }

    return formattedOptions;
  } catch (error) {
    console.error('상품 옵션 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

export async function getProductCategories(
  topCategoryId: number,
): Promise<ProductCategoryTopType[]> {
  const res = await instance.get<ProductCategoryTopType[]>(
    `/api/v1/categories/${topCategoryId}/subcategories`,
  );
  console.log('res', res);
  const data = res.data;
  return data;
}

// 카테고리 ID에 따른 필터 옵션 조회
export async function getProductFilters(
  topCategoryId: number,
): Promise<FilterDataType> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/categories/${topCategoryId}/filters`,
    );
    if (!response.ok) {
      throw new Error(
        `필터 옵션 정보를 가져오는데 실패했습니다: ${response.status}`,
      );
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
export async function getSubCategoriesAndVolume(
  topCategoryId: number,
): Promise<SubCategoriesAndVolume> {
  switch (topCategoryId) {
    case 1: // 전체
      return {
        subDetailCategories: [],
        subVolumeCategories: [],
      };
    case 2: // 텀블러/보온병
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
    case 3: // 머그/컵
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
    case 4: // 라이프스타일
      return {
        subDetailCategories: [
          { bottomCategoryId: 1, categoryName: '키친' },
          { bottomCategoryId: 2, categoryName: '홈' },
          { bottomCategoryId: 3, categoryName: '트래블' },
        ],
        subVolumeCategories: [],
      };
    case 5: // 티/커피
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

export async function getFilteredProducts(
  params: SearchParamsType,
): Promise<ProductListDataType> {
  const queryParams = new URLSearchParams();

  if (params.cursor) queryParams.append('cursor', params.cursor);
  if (params.minPrice) queryParams.append('minPrice', params.minPrice);
  if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
  if (params.topCategoryId)
    queryParams.append('topCategoryId', params.topCategoryId);

  if (params.bottomCategoryIds) {
    const bottomCategoryIdsStr = Array.isArray(params.bottomCategoryIds)
      ? params.bottomCategoryIds.join(',')
      : params.bottomCategoryIds;
    queryParams.append('bottomCategoryIds', bottomCategoryIdsStr);
  }

  if (params.size) queryParams.append('size', params.size);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);

  try {
    const response = await fetch(
      `http://localhost:8080/api/product-category-list?${queryParams.toString()}`,
    );
    if (!response.ok) {
      throw new Error('상품 목록을 가져오는데 실패했습니다.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('상품 데이터 패칭 오류:', error);
    throw error;
  }
}

export interface ProductDetail {
  productCode: number;
  productName: string;
  price: number;
  productThumbnailUrl: string;
  isNew?: boolean;
  isBest?: boolean;
  isMarkable?: boolean;
}

export const getProductDetailDummy = async (productCode: number) => {
  try {
    // 고정된 더미 데이터 반환
    return {
      productCode: productCode,
      productName: 'SS 플라워 마켓 스탠리 텀블러 591ml',
      price: 43000,
      productThumbnailUrl: '/images/productThumbnails/1000.png',
      isBest: true,
    };
  } catch (error) {
    console.error('더미 상품 정보 생성 중 오류 발생:', error);
    throw error;
  }
};

export async function fetchMoreProducts(
  params: SearchParamsType,
): Promise<ProductListDataType> {
  try {
    const queryParams = new URLSearchParams();

    if (params.cursor) queryParams.append('cursor', params.cursor);
    if (params.minPrice) queryParams.append('minPrice', params.minPrice);
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
    if (params.topCategoryId)
      queryParams.append('topCategoryId', params.topCategoryId);

    if (params.bottomCategoryIds) {
      const bottomCategoryIdsStr = Array.isArray(params.bottomCategoryIds)
        ? params.bottomCategoryIds.join(',')
        : params.bottomCategoryIds;
      queryParams.append('bottomCategoryIds', bottomCategoryIdsStr);
    }

    if (params.size) queryParams.append('size', params.size);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);

    const response = await fetch(
      `/product-category-list?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error('추가 상품을 불러오는데 실패했습니다.');
    }

    const result = await response.json();
    return result.data; // 백엔드 응답에서 data 부분만 사용
  } catch (error) {
    console.error('추가 상품 로드 오류:', error);
    throw error;
  }
}
export async function getInitialProductsData(
  searchParams?: SearchParamsType,
): Promise<ProductListDataType> {
  try {
    // 초기 로딩 시 기본 파라미터 설정
    const defaultParams: SearchParamsType = {
      size: '10',
      topCategoryId: '1', // 필요에 따라 기본 카테고리 설정
      ...searchParams, // 전달받은 추가 파라미터로 덮어쓰기
    };

    // fetchMoreProducts 함수 재사용
    const initialProductsData = await fetchMoreProducts(defaultParams);

    return initialProductsData;
  } catch (error) {
    console.error('초기 상품 데이터 로딩 오류:', error);

    // 에러 발생 시 빈 데이터 반환
    return {
      content: [],
      hasNext: false,
      nextCursor: null,
    };
  }
}

export async function getRecentlyProducts(): Promise<
  DailyRecentlyViewedProductsType[]
> {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/users/recently-view-products`,
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getRecentlyProductsDummy(): Promise<
  DailyRecentlyViewedProductsType[]
> {
  return [
    {
      viewedAt: '2025-04-14',
      recentlyViewProducts: [
        { productCode: 1000643461774 },
        { productCode: 1000038695356 },
        { productCode: 1000548972182 },
      ],
    },
    {
      viewedAt: '2025-04-13',
      recentlyViewProducts: [
        { productCode: 1000380318119 },
        { productCode: 1000642803667 },
      ],
    },
    {
      viewedAt: '2025-04-10',
      recentlyViewProducts: [
        { productCode: 1000605449653 },
        { productCode: 1000680163829 },
        { productCode: 2097002153962 },
        { productCode: 1000522642212 },
      ],
    },
  ];
}

export async function getProduct(productCode: number): Promise<ProductTypes> {
  try {
    const response = await instance.get<ProductTypes>(
      `/products/${productCode}`,
      {
        cache: 'force-cache',
        tags: ['product', `product-${productCode}`],
        revalidate: 60 * 60 * 24,
      },
    );

    return response.data;
  } catch (error) {
    console.error(`제품 정보(코드: ${productCode}) 조회 중 오류:`, error);
    throw error;
  }
}

export async function deleteRecentProduct(productCode: number) {
  try {
    return await instance.delete(
      `/users/recently-view-products/${productCode}`,
      {
        requireAuth: true,
      },
    );
  } catch (error) {
    console.error('최근 제품 삭제 중 오류 발생:', error);
    throw error;
  }
}

export async function deleteAllRecentProducts() {
  try {
    return await instance.delete(`/users/recently-view-products`, {
      requireAuth: true,
    });
  } catch (error) {
    console.error('최근 제품 삭제 중 오류 발생:', error);
    throw error;
  }
}
