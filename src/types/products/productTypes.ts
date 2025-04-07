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

export interface ProductListData {
  content: ProductItem[];
  hasNext: boolean;
  nextCursor: string | null;
}

export interface ProductsWithDetailsData extends ProductListData {
  productDetails: ProductTypes[];
}
