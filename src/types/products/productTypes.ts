export interface ProductTypes {
  productCode: string;
  productName: string;
  description: string;
  productThumbnailUrl: string;
  productImageUrl: string;
  markable: string;
  price: number;
}

export interface ProductItem {
  id: number;
  productCode: number;
}

export interface ProductListDataType {
  content: ProductItem[];
  hasNext: boolean;
  nextCursor: string | null;
}

export interface ProductsWithDetailsDataType extends ProductListDataType {
  productDetails: ProductTypes[];
}
