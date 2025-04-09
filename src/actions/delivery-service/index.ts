'use server';

import { AddressRequestDataType } from '@/types/delivery/requestDataTypes';

export const getDeliveryDatas = async (size: number = 5, cursor?: string) => {
  const cursorValue = cursor ? `&cursor=${cursor}` : '';

  try {
    const res = await fetch(`/api/v1/users/address?size=${size}${cursorValue}`, { method: 'GET' });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log('🚀 ~ getDeliveryDatas ~ error:', error);
    throw error;
  }
};

export const deleteAddress = async (memberAddressId: string) => {
  try {
    const res = await fetch(`/api/v1/users/address/${memberAddressId}`, { method: 'POST' });
    await res.json();
  } catch (error) {
    console.log('🚀 ~ deleteAddress ~ error:', error);
    throw error;
  }
};

export const getAddressDatas = async ({ keyword, countPerPage = 10, currentPage = 1 }: AddressRequestDataType) => {
  const confmKey = process.env.ADDRESS_SEARCH_API_KEY;

  const searchQuery = Object.entries({
    keyword,
    countPerPage: countPerPage.toString(),
    currentPage: currentPage.toString(),
    ...(confmKey && { confmKey }),
  });

  const searchParams = new URLSearchParams(searchQuery);

  const url = `${process.env.ADDRESS_SEARCH_API_KEY}${searchParams.toString}&hstryYn=Y`;

  console.log('🚀 ~ getAddressDatas ~ url:', url);
};
