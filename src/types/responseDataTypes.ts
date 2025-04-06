export interface DeliveryDataType {
  memberAddressId: string;
  addressNickname: string;
  receiverName: string;
  mainAddress: string;
  subAddress: string;
  zoneCode: string;
  phoneNumber: string;
  isDefaultAddress: boolean;
}
export interface cartListDataType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
  productThumbnailUrl: string;
}
