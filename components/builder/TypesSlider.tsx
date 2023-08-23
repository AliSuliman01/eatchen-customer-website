import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { kitchen } from '@/components/builder/data'
import 'swiper/css'
import 'swiper/css/navigation'

type Data = {
    color: string,
    setColor: (color: string) => void
    setTypes: (type:string[]) => void
}

const TypesSlider = ({color,setColor,setTypes}:Data) => {
  return (
    <div className="w-full border py-3 shadow-md bg-white sticky bottom-0 z-50">
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
            768:{
                slidesPerView:4
            },
            1024: {
                slidesPerView:3
            },
            1280: {
                slidesPerView:4
            },
            }}
            modules={[Navigation]}
            navigation={true}
            className=""
        >
            { 
                kitchen.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="flex justify-center">
                        <h1 className={`w-full flex justify-center hover:text-C3 md:text-[1rem] lg:text-[0.9rem] xl:text-[1rem] cursor-pointer ${color === item.name ? "text-C3":"text-gray-400"}`} onClick={() => {setTypes(item.types); setColor(item.name);}}>{item.name}</h1>  
                    </div>
                </SwiperSlide>
                ))
            }
            </Swiper>
    </div>
  )
}

export default TypesSlider