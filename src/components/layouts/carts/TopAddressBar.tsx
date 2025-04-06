'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

import AddressState from '@/components/modules/carts/SelectedAddressState';
import { DeliveryDataType } from '@/types/responseDataTypes';

type AddressPickerButtonProps = {
  addressListData: DeliveryDataType[];
};

function TopAddressBar({ addressListData }: AddressPickerButtonProps) {
  return (
    <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
      {addressListData.map((addressData) => (
        <SwiperSlide>
          <div>
            <AddressState data={addressData} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default TopAddressBar;
