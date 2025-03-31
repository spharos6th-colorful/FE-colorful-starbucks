// types/products/productPurchaseTypes.ts
export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

// 선택된 옵션 값 (예: { "색상": "블랙", "사이즈": "M" })
export interface SelectedOptionValue {
  [key: string]: string;
}

// 선택된 옵션 항목
export interface SelectedOption {
  id: string;
  options: SelectedOptionValue;
  quantity: number;
}

export interface ProductDetail {
  id: string;
  price: number;
  options: ProductOption[];
  // 기타 상품 정보...
}

export interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'default' | 'small';
}

export interface OptionSelectorProps {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onValueChange: (value: string) => void;
}
