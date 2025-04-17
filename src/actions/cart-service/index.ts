'use server';
import { revalidateTag } from 'next/cache';
import type { CheckedState } from '@radix-ui/react-checkbox';

import type {
  UpdateCartCheckedType,
  UpdateCartDataType,
} from '@/types/requestDataTypes';
import type { CartDatasType } from '@/types/responseDataTypes';
import { instance } from '../instance';
import { CART_TAG } from '@/data/tagDatas';

export const getCartDatas = async (size: number = 10) => {
  try {
    const res = await instance.get<CartDatasType>(`/carts?size=${size}`, {
      requireAuth: true,
      next: { tags: [CART_TAG] },
      cache: 'default',
    });

    return res.data;
  } catch (error) {
    console.log('🚀 ~ getCartDatas ~ error:', error);
    throw error;
  }
};

export const updateCartChecked = async (data: UpdateCartCheckedType) => {
  try {
    await instance.put(`/carts/${data.id}/checked`, {
      requireAuth: true,
      body: JSON.stringify(data),
    });

    revalidateTag(CART_TAG);
  } catch (error) {
    throw error;
  }
};

export const updateCartData = async (
  cartId: number,
  cartData: UpdateCartDataType,
) => {
  try {
    await instance.put(`/carts/${cartId}`, {
      requireAuth: true,
      body: JSON.stringify(cartData),
    });

    revalidateTag(CART_TAG);
  } catch (error) {
    throw error;
  }
};

export const updateAllChecked = async (checked: CheckedState) => {
  try {
    await instance.put(`/carts/checked`, {
      requireAuth: true,
      body: JSON.stringify({ checked }),
    });

    revalidateTag(CART_TAG);
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async (cartItems: { cartId: number }[]) => {
  const deleteCartData = { cartIds: cartItems };

  try {
    await instance.delete('/carts', {
      requireAuth: true,
      body: JSON.stringify(deleteCartData),
    });

    revalidateTag(CART_TAG);
  } catch (error) {
    throw error;
  }
};

export const deleteAllCart = async () => {
  try {
    await instance.delete('/carts/all', {
      requireAuth: true,
    });

    revalidateTag(CART_TAG);
  } catch (error) {
    throw error;
  }
};
