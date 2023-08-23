import React from 'react'
import { IoFilter } from 'react-icons/io5'

const TobBar = () => {
  return (
    <>
        <h1 className="md:tracking-[0.5rem] xl:tracking-[0.8rem] md:text-4xl xl:text-5xl  font-semibold  md:w-[70%]">My Orders</h1>
            <div className="flex justify-end items-center gap-x-5 w-full">
                <input 
                    type="text" 
                    placeholder="Search..."
                    className="text-xl p-3 pl-6 border rounded-md shadow-md w-[80%]"
                />
                <IoFilter className="bg-white text-C3 text-5xl p-2 border rounded-md shadow-md" />
        </div>
    </>     
  )
}

export default TobBar