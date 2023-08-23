'use client'
import React, { useEffect, useState } from 'react'
import '@/app/[locale]/(main)/builder/page.css'
import { kitchen } from '@/components/builder/data'
import TobBar from '@/components/builder/TobBar'
import PredifinedSlider from '@/components/builder/PredifinedSlider'
import LeftBoard from '@/components/builder/LeftBoard'
import RightBoard from '@/components/builder/RightBoard'
import TypesSlider from '@/components/builder/TypesSlider'

const Builder = () => {

  const[search, setSearch] = useState("")
  const[active, setActive] = useState<string[]>()
  const[note, setNote] = useState(false)
  const[note2, setNote2] = useState("")
  const[ingredients, setIngredients] = useState<string[]>([]) 
  const[color, setColor] = useState<string>(kitchen[0].name)
  const[types, setTypes] = useState<string[]|undefined>(kitchen[0].types)
  const[nameMeal, setNameMeal] = useState("")

  useEffect(() => {
    if(ingredients !== undefined) {
      const one = kitchen.filter((item) => item.name === color)
      const two = one[0].types  
      const three = ingredients.filter((element:string) => two.includes(element))
      setActive(three)
    } 
  }, [ingredients,color])

  const empty = "Select From The Right Board To Start Building Your Custom Meal, Or You Can Start With The Predefined Meals Above."
  const empty2 = "Select From The Bottom Board To Start Building Your Custom Meal, Or You Can Start With The Predefined Meals Above."

  return (
    <main className="mt-[2rem] xs:hidden md:block">
      <section className="my-[3%]">
        <TobBar 
          search={search} 
          setSearch={setSearch}
        />
        <PredifinedSlider 
          search={search} 
          ingredients={ingredients} 
          setIngredients={setIngredients}
        />
      </section>
      <section className="grid grid-cols-12 justify-items-center mx-[15%] my-[5rem] border border-transparent shadow-md">
        <div className="md:col-span-12 lg:col-span-7 grid justify-items-center w-full h-[60vh] no-scrollbar overflow-y-auto">
          <div className="w-full flex flex-col items-center gap-y-4 pt-8">
            {
              ingredients.length === 0 ?
              <> 
              <div className="md:hidden lg:block mt-[15%] md:mx-[8%] lg:mx-[10%] xl:mx-[20%] text-C7 tracking-widest">{empty}</div>
              <div className="md:block lg:hidden mt-[15%] md:mx-[8%] lg:mx-[10%] xl:mx-[20%] text-C7 tracking-widest">{empty2}</div>  
              </>
              : 
              <LeftBoard 
                ingredients={ingredients} 
                noteFlag={note} 
                nameMeal={nameMeal} 
                setNameMeal={setNameMeal} 
                noteContent={note2} 
                setNoteContent={setNote2} 
                setNoteFalg={setNote} 
                setIngredients={setIngredients} 
              />
            } 
          </div>  
        </div>
        <div className="md:col-span-12 lg:col-span-5 w-full bg-white h-[60vh] no-scrollbar overflow-y-auto">
          <RightBoard 
            types={types} 
            color={color} 
            active={active} 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
          />
          <TypesSlider 
            color={color}  
            setColor={setColor} 
            setTypes={setTypes} 
          />
        </div>
      </section>
    </main>
  )
}

export default Builder