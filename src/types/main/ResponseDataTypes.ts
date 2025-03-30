export interface ProductType {
  eventUuid: string;
  productCode: string;
  productTopCategoryId?: number;
  productBottomCategoryId?: number;
  productName: string;
  isBest?: boolean;
  productThumbnail: string;
  carvingStatus?: boolean;
  price: number;
  createdAt?: string;
}

export interface CategoryType {
  categoryTopId: number;
  categoryName: string;
}

export interface EventType {
  eventUuid: string;
  eventName: string;
}

export interface MainBannerType {
  eventUuid: string;
  eventThumbnail: string;
  title: string;
  description: string;
  badge: string;
  issueNumber: string;
  issueTitle: string;
}
