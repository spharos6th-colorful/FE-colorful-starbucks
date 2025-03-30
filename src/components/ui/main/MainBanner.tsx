'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { bannerData } from '@/data/main/dummyData';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

/* type mainBannerProps = {}; */
/* {}: mainBannerProps */
function MainBanner() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
    >
      {bannerData.map((banner) => (
        <SwiperSlide key={banner.eventUuid}>
          <div className='relative h-[400px] md:h-[500px] lg:h-[550px]'>
            <Image
              src={banner.eventThumbnail || '/placeholder.svg'}
              alt={`Banner ${banner.eventUuid}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes='100vw'
            />

            <div className='absolute inset-0 flex flex-col justify-center p-8 md:p-12 lg:p-16 z-10'>
              {banner.badge && (
                <div className='inline-block bg-black text-white text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit'>
                  {banner.badge}
                </div>
              )}

              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4'>{banner.title}</h2>

              <p className='text-lg md:text-xl text-white mb-4 md:mb-6 max-w-md'>{banner.description}</p>

              {banner.issueNumber && (
                <div className='text-white text-sm md:text-base'>
                  ISSUE {banner.issueNumber}. {banner.issueTitle}
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainBanner;
