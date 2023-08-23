import React from 'react'

type Data = {
    details: number | undefined,
    orderId: number,
    orderStatus: string
}

const Aprove_Price = ({details,orderId,orderStatus}:Data) => {
  return (
    <>
    {
        details === orderId ?
        orderStatus === "prepared by" || orderStatus === "preparing by" ?
        <div className="grid gap-y-3 absolute bottom-4 right-8">
            {
                orderStatus === "preparing by" ?
                <button
                className="border shadow-md rounded-b-xl rounded-t-3xl py-2 bg-C10 tracking-[0.2rem] text-[0.8rem] font-semibold">
                    APPROVE
                </button>
                :
                null
            }
            <h1 className="text-xl tracking-widest font-semibold">TOTAL: 15000<span className="text-sm ml-1">S.P</span></h1> 
        </div>
        :
        null
        :
        null
    }
    </>
  )
}

export default Aprove_Price