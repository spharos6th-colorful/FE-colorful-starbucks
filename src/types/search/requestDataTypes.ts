export interface SearchQueryRequestDataType {
  cursor?: number;
  minPrice?: number;
  maxPrice?: number;
  size?: number;
  sortBy?: string;
  query: string;
}
