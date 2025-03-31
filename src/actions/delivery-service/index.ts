export const getDeliveryDatas = async (size: number = 5, cursor?: string) => {
  const cursorValue = cursor ? `&cursor=${cursor}` : '';

  try {
    const res = await fetch(`/api/v1/users/address?size=${size}${cursorValue}`, { method: 'GET' });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log('🚀 ~ getDeliveryDatas ~ error:', error);
  }
};
