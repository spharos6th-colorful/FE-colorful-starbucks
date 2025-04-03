export interface ProductCategoryTopType {
  topCategoryId: number;
  categoryName: string;
}

// 하위 카테고리 타입
export type SubDetailCategory = {
  bottomCategoryId: number;
  categoryName: string;
};

// 용량 카테고리 타입
export type SubSizeCateogry = {
  sizeId: string;
  sizeName: string;
};

// 필터 옵션 타입
export type FilterOption = {
  filterId: string;
  filterName: string;
};

// 필터 데이터 타입
export type FilterData = {
  seasons: FilterOption[];
  price: FilterOption[];
};
