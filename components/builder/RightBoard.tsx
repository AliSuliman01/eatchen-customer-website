import React from 'react'
import Image from 'next/image'
import food_ingredient from '@/public/pngwing 5.png'
import { kitchen } from '@/components/builder/data'

type Data = {
    types: string[]|undefined
    color: string,
    active: string[]|undefined,
    ingredients: string[],
    setIngredients: (ingredients:string[]) => void
}

const RightBoard = ({types,color,active,ingredients,setIngredients}:Data) => {

    const handleClickOnType = (type: string) => {  
        const one = kitchen.filter((item) => item.name === color) 
        const flag = one[0].flag
        if(flag === true){
            if(ingredients.includes(type)){
                setIngredients(ingredients.filter((value) => value !== type))
            }
            else{
                setIngredients([...ingredients,type])
            }
        }
        else {
            const contains = ingredients.some(element => {
            return one[0].types.includes(element)
            })
            if(contains){
                if(ingredients.includes(type)){
                    ingredients.map((item) => item === type ? setIngredients(ingredients.filter((value) => value !== item)) : null)
                }
                else if(!ingredients.includes(type)){ 
                    one[0].types.map((item) => ingredients.includes(item) ? setIngredients(ingredients.filter((value) => value !== item)) : null)
                    setIngredients(state => [...state,type])
                } 
            }
            else{
                setIngredients([...ingredients,type])
            }
        }
    }

    return(
        <> 
            <h1 className="flex justify-center mt-[5%] mb-[3%] text-gray-500 tracking-widest">CHOOSE YOUR {color.toUpperCase()}</h1>
            <div className={`${types !== undefined ? types.length >= 16 ? "mb-[2rem]" : types.length >= 12 ? "mb-[6rem]" : types.length >= 8 ? "mb-[11.5rem]" : types.length >= 4 ? "mb-[17rem]" : "mb-[17rem]" : null} grid grid-cols-12 gap-y-3 gap-x-1 justify-items-center`}>
                {
                    types?.map((item:any, index:any) => (
                        <div className={`md:col-span-3 lg:col-span-4 xl:col-span-3 ${active?.includes(item) ? "border rounded-full shadow-md":null} p-3 cursor-pointer`} onClick={() => handleClickOnType(item)} key={index}>
                            <Image src={food_ingredient} alt="ingredients_image" width={50} className=""/>
                            <h1 className="text-[0.8rem] tracking-widest">{item}</h1>
                        </div>
                    ))  
                }
            </div>
        </>
    )
}

export default RightBoard