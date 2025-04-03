export interface SearchParamsType {
  // 현재 선택된 카테고리 (예: 'all', 'tumbler', 'mug', 'lifestyle')
  category?: string;

  // 상위 카테고리 ID (예: '1', '2', '3')
  topCategoryId?: string;

  // 하위 카테고리 ID (예: 'plastic', 'stainless', 'glass')
  bottomCategoryId?: string;

  // 시즌 필터 (예: 'peanuts', 'march', 'flower')
  season?: string;

  // 용량 필터 (예: 'short', 'tall', 'grande')
  size?: string;

  // 가격 필터 범위 (예: 'under10000', '10000to20000')
  price?: string;

  // 정렬 방식 (예: 'createdAt,desc', 'price,asc')
  sortBy?: string;

  // 무한 스크롤을 위한 다음 페이지 식별자
  cursorProductCode?: string;

  // 그 외 추가될 수 있는 모든 쿼리 파라미터 타입 정의
  [key: string]: string | string[] | undefined;
}
