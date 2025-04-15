export interface ProductCategoryTopType {
  topCategoryId: number;
  categoryName: string;
}

export type SubDetailCategoryType = {
  bottomCategoryId: number;
  categoryName: string;
};

export type SubSizeCateogryType = {
  sizeId: string;
  sizeName: string;
};

export type FilterOptionType = {
  filterId: string;
  filterName: string;
};

export type FilterDataType = {
  seasons: FilterOptionType[];
  price: FilterOptionType[];
};
