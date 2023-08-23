import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Tooltip } from 'antd'
import { meals } from '@/components/builder/data'
import { AiFillStar } from 'react-icons/ai'
import 'swiper/css'
import 'swiper/css/navigation'
import food_meal from '@/public/image 4.png'

type Data = {
    search: string,
    ingredients: string[],
    setIngredients: (ingredients:string[]) => void
}

const PredifinedSlider = ({search,ingredients,setIngredients}:Data) => {

    const results = () => {
        if (search === "") {
            return meals
        }
        else {
            return meals.filter((item) => item.name.toLowerCase().startsWith(search.toLowerCase()))
        }
    }

  return (
    <div className="my-[4%] md:mx-[5%] lg:mx-[2%] xl:mx-[6%]">
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
            768: {
                slidesPerView:3,
            },
            1024: {
                slidesPerView:4,
            },
            1280: {
                slidesPerView:5,
            },
            }}
            navigation={true}
            modules={[Navigation]}
        >
            { 
                results().map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="grid justify-items-center gap-y-2">
                        {   
                            ingredients.length === 0 ? 
                            <Image 
                                src={food_meal} 
                                alt="food_image" 
                                className="border-s-8 border-e-8 border-s-white border-e-white hover:border-s-C3 hover:border-e-C3 p-1 rounded-b-full cursor-pointer" 
                                onClick={() => {setIngredients(item.ingredients)}}
                            />
                            :
                            <Tooltip
                                title="This action will replace your ingredients with the ingredients of the selected meal"
                                color={'orange'}
                            > 
                            <Image 
                                src={food_meal} 
                                alt="food_image" 
                                className="border-s-8 border-e-8 border-s-white border-e-white hover:border-s-C3 hover:border-e-C3 p-1 rounded-b-full cursor-pointer" 
                                onClick={() => {setIngredients(item.ingredients)}}
                            />
                            </Tooltip>
                        }
                        <h1>{item.name}</h1>
                        <h1 className="mt-[-0.5rem] text-sm">Anas_Kayyali</h1>
                        <div className="flex justify-center text-yellow-400">
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </div> 
                    </div>
                </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}

export default PredifinedSlider