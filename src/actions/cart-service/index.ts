// 'use server';

// import { cartListDataType } from '@/types/responseDataTypes';
// import { revalidateTag } from 'next/cache';

export const deletedSelectedProducts = async (id: number[]) => {};
export const deleteAllProducts = async (accessToken: string) => {};

// export const checkCartProduct = async (id: number, checked: boolean) => {
//   console.log('id', id);
//   console.log('checked', checked);
//   const res = await fetch(`http://localhost:3000/cart/${id}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       checked: checked,
//     }),
//   });
//   revalidateTag('getCartData');
//   return res.json();
// };

// export const getCartData = async () => {
//   const res = await fetch('http://localhost:3000/cart', {
//     next: { tags: ['getCartData'] },
//   });
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return res.json() as Promise<cartListDataType[]>;
// };
