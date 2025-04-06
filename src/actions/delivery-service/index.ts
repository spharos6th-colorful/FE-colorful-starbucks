import { dummyDeliveryDatas } from '@/data/dummyDeliveryDatas';

export const getDeliveryDatas = async (size: number = 5, cursor?: string) => {
  // const cursorValue = cursor ? `&cursor=${cursor}` : '';
  // try {
  //   const res = await fetch('http:localhost:3000/api/users/address', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await res.json();
  //   console.log('🚀 ~ getDeliveryDatas ~ data:', data);
  //   return data;
  // } catch (error) {
  //   console.log('🚀 ~ getDeliveryDatas ~ error:', error);
  // }
  // try {
  //   const res = await fetch(`/api/v1/users/address?size=${size}${cursorValue}`, { method: 'GET' });
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   console.log('🚀 ~ getDeliveryDatas ~ error:', error);
  // }
};
