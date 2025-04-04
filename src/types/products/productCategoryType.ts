export interface ProductCategoryTopType {
  topCategoryId: number;
  categoryName: string;
}

// 하위 카테고리 타입
export type SubDetailCategoryType = {
  bottomCategoryId: number;
  categoryName: string;
};

// 용량 카테고리 타입
export type SubSizeCateogryType = {
  sizeId: string;
  sizeName: string;
};

// 필터 옵션 타입
export type FilterOptionType = {
  filterId: string;
  filterName: string;
};

// 필터 데이터 타입
export type FilterDataType = {
  seasons: FilterOptionType[];
  price: FilterOptionType[];
};
