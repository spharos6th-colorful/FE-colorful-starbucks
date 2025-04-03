export interface SearchParamsType {
  // topCategoryId로 변경 (API와 일치)
  topCategoryId?: string;

  // 하위 카테고리 ID 리스트 (다중 선택 가능)
  bottomCategoryIds?: string;

  // 가격 필터
  minPrice?: string;
  maxPrice?: string;

  // 정렬 방식
  sortBy?: string;

  // 페이징
  cursor?: string;
  size?: string;

  // 그 외 추가 파라미터
  [key: string]: string | string[] | undefined;
}
