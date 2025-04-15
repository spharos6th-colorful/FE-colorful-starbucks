import type { CheckedState } from '@radix-ui/react-checkbox';

export interface CartRuquestType {
  productCode: number;
  productDetailCode: string;
  carvingContent?: string;
  quantity: number;
}

export interface UpdateCartCheckedType {
  id: number;
  checked: CheckedState;
}

export type DeleteCartItemType = {
  cartIds: { cartId: number }[];
};
