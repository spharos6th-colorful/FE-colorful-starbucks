export interface ProductItem {
  id: number;
  productCode: number;
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

export const productItemList: ProductItem[] = [
  { id: 1, productCode: 1000 },
  { id: 2, productCode: 1001 },
  { id: 3, productCode: 1002 },
  { id: 4, productCode: 1003 },
  { id: 5, productCode: 1004 },
  { id: 6, productCode: 1005 },
  { id: 7, productCode: 1006 },
  { id: 8, productCode: 1007 },
  { id: 9, productCode: 1008 },
  { id: 10, productCode: 1009 },
  { id: 11, productCode: 1010 },
  { id: 12, productCode: 1011 },
  { id: 13, productCode: 1012 },
  { id: 14, productCode: 1013 },
  { id: 15, productCode: 1014 },
  { id: 16, productCode: 1015 },
  { id: 17, productCode: 1016 },
  { id: 18, productCode: 1017 },
  { id: 19, productCode: 1018 },
  { id: 20, productCode: 1019 },
  { id: 21, productCode: 1020 },
  { id: 22, productCode: 1021 },
  { id: 23, productCode: 1022 },
  { id: 24, productCode: 1023 },
  { id: 25, productCode: 1024 },
  { id: 26, productCode: 1025 },
  { id: 27, productCode: 1026 },
  { id: 28, productCode: 1027 },
  { id: 29, productCode: 1028 },
  { id: 30, productCode: 1029 },
  { id: 31, productCode: 1030 },
  { id: 32, productCode: 1031 },
  { id: 33, productCode: 1032 },
  { id: 34, productCode: 1033 },
  { id: 35, productCode: 1034 },
  { id: 36, productCode: 1035 },
  { id: 37, productCode: 1036 },
  { id: 38, productCode: 1037 },
  { id: 39, productCode: 1038 },
  { id: 40, productCode: 1039 },
  { id: 41, productCode: 1040 },
  { id: 42, productCode: 1041 },
  { id: 43, productCode: 1042 },
  { id: 44, productCode: 1043 },
  { id: 45, productCode: 1044 },
  { id: 46, productCode: 1045 },
  { id: 47, productCode: 1046 },
  { id: 48, productCode: 1047 },
  { id: 49, productCode: 1048 },
  { id: 50, productCode: 1049 },
];

// 고정된 더미 상품 상세 정보
export const dummyProductDetail: ProductDetail = {
  productCode: 1000,
  productName: 'SS 플라워 마켓 스탠리 텀블러 591ml',
  price: 7000,
  productThumbnailUrl: '/images/productThumbnails/1000.png',
  isNew: true,
  isBest: true,
  isMarkable: true,
};

// 상품 상세 정보를 가져오는 더미 함수
export async function getProductDetail(productCode: number): Promise<ProductDetail> {
  // 항상 같은 더미 데이터 반환
  console.log(productCode);

  return dummyProductDetail;
}

// 초기 상품 데이터 로딩 함수
export function getInitialProductsData(cursor?: number): {
  content: ProductItem[];
  hasNext: boolean;
  nextCursor: number | null;
} {
  const pageSize = 10;
  const startIndex = cursor ? productItemList.findIndex((p) => p.productCode === cursor) + 1 : 0;

  const content = productItemList.slice(startIndex, startIndex + pageSize);

  return {
    content,
    hasNext: startIndex + pageSize < productItemList.length,
    nextCursor: content.length > 0 ? content[content.length - 1].productCode : null,
  };
}
