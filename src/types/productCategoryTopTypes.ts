export interface productCategoryTopType {
  name: string;
  isActive?: boolean;
  onClick: () => void; // 파라미터 없는 함수
  id?: number; // 선택적 ID 필드 추가
}
