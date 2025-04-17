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
      headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
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
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
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
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
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
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
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
    const res = await fetch(`${process.env.BASE_URL}/carts`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteCartData),
    });

    if (!res.ok) {
      throw new Error('장바구니 데이터를 삭제할 수 없습니다.');
    }

    revalidateTag(CART_TAG);
  } catch (error) {
    throw error;
  }
};

export const deleteAllCart = async () => {
  try {
    await instance.delete('/carts/all', {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    revalidateTag(CART_TAG);
  } catch (error) {
    throw error;
  }
};
