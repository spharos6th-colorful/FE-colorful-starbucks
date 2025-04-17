import { SearchParamsType } from '@/data/productDummy/productSearchTypes';

export const getSelectedArray = (selected?: string | string[]): string[] => {
  if (!selected) return [];
  return typeof selected === 'string' ? selected.split(',') : selected;
};

export function createProductQueryParams(
  params: SearchParamsType,
  options?: { page?: number; cursor?: number },
): string {
  const queryParams = new URLSearchParams();

  if (params.size) queryParams.append('size', params.size);
  if (params.topCategoryId)
    queryParams.append('topCategoryId', params.topCategoryId);
  if (params.bottomCategoryIds && params.bottomCategoryIds.length > 0) {
    queryParams.append('bottomCategoryIds', params.bottomCategoryIds.join(','));
  }
  if (params.minPrice) queryParams.append('minPrice', params.minPrice);
  if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);

  if (options?.cursor !== undefined) {
    queryParams.append('cursor', options.cursor.toString());
  } else if (options?.page !== undefined) {
    queryParams.append('page', options.page.toString());
  }

  return queryParams.toString();
}

export const createQueryParams = (params: SearchParamsType) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'bottomCategoryIds' && Array.isArray(value)) {
        queryParams.append(key, value.join(','));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  return queryParams.toString();
};
