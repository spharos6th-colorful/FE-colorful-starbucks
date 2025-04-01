'use server';

import { DeliveryDataType } from '@/types/responseDataTypes';

// fixme: 추후 수정 필요
export const getSelectedAddress = async (memberAddressUuid: string) => {
  try {
    const res = await fetch(`localhost:8080/carts/ ${memberAddressUuid}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();

    return data as DeliveryDataType;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
