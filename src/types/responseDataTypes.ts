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

export interface signInDataType {
  accessToken: string;
  refreshToken: string;
}
