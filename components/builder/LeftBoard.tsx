import React from 'react'
import Image from 'next/image'
import { Tooltip } from 'antd'
import { CgNotes } from 'react-icons/cg'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import food_ingredient from '@/public/pngwing 5.png'

type Data = {
  ingredients: string[],
  noteFlag: boolean,
  nameMeal: string,
  setNameMeal: (nameMeal: string) => void,
  noteContent: string,
  setNoteContent: (noteContent: string) => void
  setNoteFalg: (noteFlag: boolean) => void
  setIngredients: (ingredients:string[]) => void
}

const LeftBoard = ({ingredients,noteFlag,nameMeal,setNameMeal,noteContent,setNoteContent,setNoteFalg,setIngredients}:Data) => {

  const handleNote = () => {
    setNoteFalg(!noteFlag)
    setNoteContent("")
  }

  const handleClose = (item: string) => {
    setIngredients(ingredients?.filter((value) => value !== item))
  }

  return (
    <>
      <div className={`flex justify-between items-center w-[80%] ${ingredients?.length === 0 && noteFlag === false ? "mb-[16rem]" : null}`}>
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
        value={noteContent} 
        placeholder="Add A Note For This Order" 
        className={`${noteFlag === true ? "flex" : "hidden"} w-[80%] h-[5rem] border border-transparent shadow-md rounded-tl-md rounded-br-md pl-3 ${ingredients?.length === 0 && noteFlag === true ? "mb-[16rem]" : null}`}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <div className={`grid justify-items-center w-full gap-y-2 ${ingredients?.length === 1 ? "mb-[12rem]" : ingredients?.length === 2 ? "mb-[8rem]" : ingredients?.length === 3 ? "mb-[4rem]" : null }`}>
        {
          ingredients?.map((item:any, index:any) => (
            <div className="flex justify-between items-center bg-white border border-transparent shadow-md rounded-md w-[80%] px-2 h-[4rem]" key={index}>
              <div className="flex items-center gap-x-2">
                <Image src={food_ingredient} alt="ingredients_image" width={50}/>
                <h1 className="text-md tracking-widest">{item}</h1>
              </div>
              <AiOutlineCloseCircle className="text-2xl text-gray-400 cursor-pointer" onClick={() => handleClose(item)}/>
            </div>
          ))  
        }
      </div>
      <div className="flex justify-center items-center gap-x-4 sticky bottom-0 w-[80%] z-50 bg-C6 py-3">
        <button className="border border-C3 rounded-t-[1.8rem] rounded-b-2xl px-3 py-3 tracking-[0.1rem] font-semibold text-[0.8rem] text-C3">PLACE AN ORDER</button>
        <button className="border border-transparent rounded-t-[1.7rem] rounded-b-2xl bg-C3 px-8 py-[0.84rem] tracking-[0.1rem] font-semibold text-white text-[0.7rem]">SAVE</button>
      </div>
    </>
  )
}

export default LeftBoard