'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import '@/app/[locale]/(main)/builder/page.css'

import 'swiper/css'
import 'swiper/css/navigation'

import { Navigation } from 'swiper/modules';
import Image from 'next/image'

import food_meal from '@/public/image 4.png'
import food_ingredients from '@/public/pngwing 5.png'


import { Tooltip, notification } from 'antd'
import { AiFillStar, AiOutlineCloseCircle } from 'react-icons/ai'
import { CgNotes } from 'react-icons/cg'

const Builder = () => {

  const [api, contextHolder] = notification.useNotification()

  const meals = [ 
    {name:"Shawarma",ingredient:["Bread1","type1","Meat1","Bread1","type1","Meat1","Bread1","type1","Meat1"]},
    {name:"Kabsa",ingredient:["Bread2","type2","Meat2"]},
    {name:"Shawarma2",ingredient:["Bread3","type3","Meat3"]},
    {name:"Kabsa2",ingredient:["Bread2_1","type2_1","Meat2_1"]},
    {name:"Shawarma3",ingredient:["Bread2_2","type2_2","type2_3"]},
    {name:"Kabsa3",ingredient:["Bread2_3","type2_3","Meat2_3"]}
  ]

  const kitchen = [ 
    {name:"Bread",types:["Bread1","Bread1","Bread2","Bread3"],flag:false},
    {name:"Vegetables",types:["type1","type2","type3","type1","type2","type3","type1","type2"],flag:true},
    {name:"Meat",types:["Meat1","Meat2","Meat3","Meat1","Meat2","Meat3","Meat1","Meat2","Meat3","Meat1","Meat2","Meat3"],flag:true},
    {name:"Bread2",types:["Bread2_1","Bread2_2","Bread2_3","Bread2_1","Bread2_2","Bread2_3","Bread2_1","Bread2_2","Bread2_3","Bread2_1","Bread2_2","Bread2_3","Bread2_1","Bread2_2","Bread2_3","Bread2_1"],flag:true},
    {name:"Vegetables2",types:["type2_1","type2_2","type2_3","type2_1","type2_2","type2_3","type2_1","type2_2","type2_3","type2_1","type2_2","type2_3","type2_1","type2_2","type2_3","type2_1","type2_2","type2_3"],flag:true},
    {name:"Meat2",types:["Meat2_1","Meat2_2","Meat2_3"],flag:true},
  ]

  const[search, setSearch] = useState("")
  const[active, setActive] = useState<string[]>()
  const[note, setNote] = useState(false)
  const[note2, setNote2] = useState("")
  const[ingredient, setIngredient] = useState<string[]>([]) 
  const[color, setColor] = useState<string>(kitchen[0].name)
  const[types, setTypes] = useState<string[]|undefined>(kitchen[0].types)
  const[nameMeal, setNameMeal] = useState("")

  console.log(active,color)

  const results = () => {
    if (search === "") {
      return meals
    }
    else {
      return meals.filter((item) => item.name.toLowerCase().startsWith(search.toLowerCase()))
    }
  } 

  const handleNote = () => {
    setNote(!note)
    setNote2("")
  }

  const handleClose = (item: string) => {
    setIngredient(ingredient?.filter((value) => value !== item))
  }

  const openNotificationWithIcon = (name:string) => {
    api.info({
      message: 'Note',
      description: `You can not add more than one items of ${name}`
    })
  }

  const handleAdd = (item: string) => {  
    const one = kitchen.filter((item) => item.name === color) 
    const two = one[0].flag 
    if(two === true && !ingredient.includes(item)){
      setIngredient([...ingredient,item])
    }
    else if(two === false) {
      const contains = ingredient.some(element => {
        return one[0].types.includes(element)
      })
      contains === true ? openNotificationWithIcon(one[0].name) : setIngredient([...ingredient,item])
    }
  }

  useEffect(() => {
    if(ingredient !== undefined) {
      const one = kitchen.filter((item) => item.name === color)
      const two = one[0].types  
      const three = ingredient.filter((element:string) => two.includes(element))
      setActive(three)
    } 
  }, [ingredient,color])

  const ingredients2 = () => {
    return (
      <>
        <div className={`flex justify-between items-center w-[80%] ${ingredient?.length === 0 && note === false ? "mb-[16rem]" : null}`}>
          <input
            type="text" 
            value={nameMeal} 
            placeholder="Assign A Name For This Meal" 
            className="w-[90%] h-[4rem] border border-transparent shadow-md rounded-md pl-3"
            onChange={(e) => setNameMeal(e.target.value)}  
          />
          <Tooltip title="There is any note ?">
            <CgNotes className="text-[2.4rem] text-C3 cursor-pointer" onClick={() => handleNote()}/>                   
          </Tooltip>
        </div>
        <input 
          type="text" 
          value={note2} 
          placeholder="Add A Note For This Order" 
          className={`${note === true ? "flex" : "hidden"} w-[80%] h-[5rem] border border-transparent shadow-md rounded-tl-md rounded-br-md pl-3 ${ingredient?.length === 0 && note === true ? "mb-[16rem]" : null}`}
          onChange={(e) => setNote2(e.target.value)}
        />
        <div className={`grid justify-items-center w-full gap-y-2 ${ingredient?.length === 1 ? "mb-[12rem]" : ingredient?.length === 2 ? "mb-[8rem]" : ingredient?.length === 3 ? "mb-[4rem]" : null }`}>
        {
        ingredient?.map((item:any, index:any) => (
          <div className="flex justify-between items-center bg-white border border-transparent shadow-md rounded-md w-[80%] px-2 h-[4rem]" key={index}>
            <div className="flex items-center gap-x-2">
              <Image src={food_ingredients} alt="ingredient_image" width={50}/>
              <h1 className="text-md tracking-widest">{item}</h1>
            </div>
            <AiOutlineCloseCircle className="text-2xl text-gray-400 cursor-pointer" onClick={() => handleClose(item)}/>
          </div>
        ))  
        }
        </div>
        <div className="flex justify-between items-center sticky bottom-0 w-[80%] z-50 bg-C6 py-3">
          <button className="border border-C3 rounded-t-[1.8rem] rounded-b-2xl px-3 py-3 tracking-[0.1rem] font-semibold text-[0.8rem] text-C3">PLACE AN ORDER</button>
          <button className="border border-transparent rounded-t-[1.7rem] rounded-b-2xl bg-C3 px-8 py-[0.84rem] tracking-[0.1rem] font-semibold text-white text-[0.7rem]">SAVE</button>
        </div>
      </>
    )
  }

  const types2 = () => {
    return(
    <> 
      {
        types?.map((item:any, index:any) => (
          <div className={`flex flex-col ${active?.includes(item) ? "border rounded-full shadow-md":null} p-3 items-center md:basis-[20%] lg:basis-[10%] xl:basis-[20%] cursor-pointer`} onClick={() => handleAdd(item)} key={index}>
            <Image src={food_ingredients} alt="ingredient_image" width={50} className=""/>
            <h1 className="text-[0.8rem] tracking-widest">{item}</h1>
          </div>
        ))  
      }
    </>
    )
  }

  const empty = "Select From The Right Board To Start Building Your Custom Meal, Or You Can Start With The Predefined Meals Above."
  const empty2 = "Select From The Bottom Board To Start Building Your Custom Meal, Or You Can Start With The Predefined Meals Above."

  return (
    <main className="mt-[2rem] xs:hidden md:block">
      {contextHolder}
      <section className="my-[3%]">
        <div className="flex justify-between px-[4%]">
          <h1 className="text-3xl tracking-[0.4rem] font-semibold">Prediefined Foods</h1>
          <input 
            type="text"
            value={search}
            placeholder="Search..."
            className="pl-[1%] py-2 px-[10%] text-[1.1rem] border border-gray-300"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
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
              className=""
            >
              { 
              results().map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="grid justify-items-center gap-y-2">
                    <Tooltip
                      title="This action will replace your ingredients with the ingredients of the selected meal"
                      color={'orange'}
                    >
                      <Image 
                        src={food_meal} 
                        alt="food_image" 
                        className="border-s-8 border-e-8 border-s-white border-e-white hover:border-s-C3 hover:border-e-C3 p-1 rounded-b-full cursor-pointer" 
                        onClick={() => {setIngredient(item.ingredient)}}
                      />
                    </Tooltip>
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
        </div>
      </section>
      <section className="grid grid-cols-12 justify-items-center mx-[15%] my-[5rem] border border-transparent shadow-md">
        <div className="md:col-span-12 lg:col-span-7 grid justify-items-center w-full h-[60vh] no-scrollbar overflow-y-auto">
          <div className="w-full flex flex-col items-center gap-y-4 pt-8">
            {
              ingredient.length === 0 ?
              <> 
              <div className="md:hidden lg:block mt-[15%] md:mx-[8%] lg:mx-[10%] xl:mx-[20%] text-C7 tracking-widest">{empty}</div>
              <div className="md:block lg:hidden mt-[15%] md:mx-[8%] lg:mx-[10%] xl:mx-[20%] text-C7 tracking-widest">{empty2}</div>  
              </>
              : 
              ingredients2()
            } 
          </div>  
        </div>
        <div className="md:col-span-12 lg:col-span-5 w-full bg-white h-[60vh] no-scrollbar overflow-y-auto">
          <h1 className="flex justify-center my-[3%] text-gray-500 tracking-widest">CHOOSE YOUR {color.toUpperCase()}</h1>
          <div className={`${types !== undefined ? types.length >= 16 ? "mb-[2rem]" : types.length >= 12 ? "mb-[6rem]" : types.length >= 8 ? "mb-[11.5rem]" : types.length >= 4 ? "mb-[17rem]" : "mb-[17rem]" : null} w-full flex flex-wrap gap-3 pl-[9%]`}>
            {
              types2()
            }
          </div>
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
              navigation = {true}
              className=""
            >
              { 
                kitchen.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <h1 className={`w-full flex justify-center hover:text-C3 cursor-pointer ${color === item.name ? "text-C3":"text-gray-400"}`} onClick={() => {setTypes(item.types); setColor(item.name);}}>{item.name}</h1>  
                  </div>
                </SwiperSlide>
              ))
              }
            </Swiper>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Builder