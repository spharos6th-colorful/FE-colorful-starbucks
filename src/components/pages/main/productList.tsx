'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ProductItem from '../../modules/main/ProductItem';
import { productsData } from '@/data/main/dummyData';
import SectionHeader from '../../modules/main/SectionHeader';

interface ProductListProps {
  title: string;
  eventUuid: string;
}
export default function ProductList({ eventUuid, title }: ProductListProps) {
  const filteredProducts = productsData.filter((product) => product.eventUuid === eventUuid);

  const productsType = filteredProducts.slice(0, 10);

  return (
    <section className='mx-auto p-4 mb-[50px]'>
      <SectionHeader title={title} eventUuid={eventUuid} />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          220: {
            slidesPerView: 3,
          },

          450: {
            slidesPerView: 3,
          },

          768: {
            slidesPerView: 4,
          },
        }}
      >
        {productsType.map((product) => (
          <SwiperSlide key={product.productCode}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
