export interface SearchParamsType {
  topCategoryId?: string;

  bottomCategoryIds?: string[];

  minPrice?: string;
  maxPrice?: string;

  sortBy?: string;

  cursor?: string;
  size?: string;

  [key: string]: string | string[] | undefined;
}
