'use client'

import Image from 'next/image'
import { images } from '../../../../lib/images'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'



const Slider = ()=> {
  return (
    <>
      
        <Swiper
          navigation
          pagination={{ type: 'fraction' }}
          modules={[Navigation, Pagination]}
          onSwiper={swiper => console.log(swiper)}
          className='h-96 w-full rounded-lg'
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='flex h-full w-full items-center justify-center'>
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout='responsive'
                  width={1920} 
                  height={1080} 
                  className='w-full h-full object-cover'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      
    </>
  )
}

export default Slider;
