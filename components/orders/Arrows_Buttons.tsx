import React from 'react'
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'

type Data = {
    details: number | undefined,
    orderId: number,
    orderStatus: string,
    setDetails: (details:number) => void
}

const Arrows_Buttons = ({details,orderId,orderStatus,setDetails}:Data) => {
    
    const handleClickOnOrder = (id:number) => {
        details === id ? setDetails(0) : setDetails(id)
    }

    return (
    <div className={`${orderStatus === "prepared by" || orderStatus === "refused" ? "col-span-6" : "md:col-span-4 xl:col-span-6"} flex justify-end gap-x-4 h-fit`}>
        {
            details === orderId ?
            orderStatus === "queued" ?
            <button className={`border border-C3 text-[0.8rem] text-C3 font-semibold tracking-widest shadow-md rounded-b-xl rounded-t-3xl md:px-[3rem] xl:px-[4rem] py-2`}>
                DELETE
            </button>
            :
            orderStatus === "refused" ?
            <button className={`border border-C3 text-[0.8rem] text-C3 font-semibold tracking-widest shadow-md rounded-b-xl rounded-t-3xl md:px-[1rem] xl:px-[2rem] py-2`}>
                OPEN IN BUILDER
            </button>
            :
            orderStatus === "prepared by" ?
            <>
                <button className="border border-C3 text-[0.8rem] text-C3 font-semibold tracking-widest shadow-md rounded-b-xl rounded-t-3xl md:px-[0.8rem] xl:px-[2rem] py-2">
                    OPEN IN BUILDER
                </button>
                <button className="border border-transparent text-[0.8rem] text-white bg-C3 font-semibold tracking-widest shadow-md rounded-b-xl rounded-t-3xl md:px-[0.8rem] xl:px-[1rem] py-2">
                    REORDER
                </button>
            </>
            :
            null
            :
            null
        }
        {
            details !== orderId ?
            <BiSolidDownArrow 
                className={`text-white md:text-[2rem] xl:text-[2.5rem] drop-shadow-md cursor-pointer ${details === orderId && "col-span-2"} ${orderStatus === "queued" ? "text-white" : orderStatus === "refused" ? "text-C9" : orderStatus === "preparing by" ? "text-C8" : "text-C10"}`}
                onClick={() => handleClickOnOrder(orderId)}
            />
            :
            <BiSolidUpArrow 
                className={`text-white md:text-[2rem] xl:text-[2.5rem] drop-shadow-md cursor-pointer ${details === orderId && "col-span-2"} ${orderStatus === "queued" ? "text-white" : orderStatus === "refused" ? "text-C9" : orderStatus === "preparing by" ? "text-C8" : "text-C10"}`}
                onClick={() => handleClickOnOrder(orderId)}
            />
        }
    </div>
  )
}

export default Arrows_Buttons