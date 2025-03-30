'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import CategoryIcon from '@/components/ui/main/CategoryIcon';
import MoreButton from '@/components/ui/main/MoreButton';
import { mainCategoryDatas } from '@/data/main/initData';

export default function CategorySlide() {
  return (
    <section className=' mb-[40px] p-4'>
      <div className='flex items-center justify-between mb-[30px]'>
        <h2 className='text-title2'>Category</h2>
        {/* FIXME: API uri 정해지고 난 뒤에 정확한 uri 수정 필요 */}
        <MoreButton href='/products'>전체 상품 더보기</MoreButton>
      </div>

      <Swiper
        spaceBetween={10}
        breakpoints={{
          220: {
            slidesPerView: 2,
          },

          450: {
            slidesPerView: 3,
          },

          768: {
            slidesPerView: 5,
          },
        }}
      >
        {mainCategoryDatas.map((category) => (
          <SwiperSlide key={category.title}>
            <CategoryIcon title={category.title} icon={category.icon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
