import React from 'react'
import Image from 'next/image'
import {AnimatePresence, motion} from 'framer-motion'
import shef_photo from "@/public/images (1).png"

type Data = {
    details: number | undefined,
    orderId: number,
    orderStatus: string,
    orderName: string,
    orderHistory:string
}

const Status_Info = ({details,orderId,orderStatus,orderHistory,orderName}:Data) => {
  return (
    <div className={`flex justify-between ${orderStatus === "queued" ? "gap-x-4":null} ${details === orderId ? orderStatus === "prepared by" || orderStatus === "refused" ? "col-span-6" : "md:col-span-8 xl:col-span-6" : "md:w-[60%] xl:w-[50%]"}`}>
        <div className="grid gap-y-1">
            <AnimatePresence>
            {
            details === orderId && 
            <motion.h1
                initial={{opacity:0,y:-10}}
                animate={{opacity:1,y:0,transition:{duration:0.3}}}
                exit={{opacity:0,y:-20,transition:{duration:0}}}
            >
                Order #{orderId}
            </motion.h1>
            }
            </AnimatePresence>
            <motion.p 
                animate={details === orderId ? {y:5}:{y:0}}
                transition={{duration:0.3}}
                className="md:text-[0.9rem] xl:text-sm"
            >
                {orderHistory}
            </motion.p>
            <motion.h1 
                animate={details === orderId ? {y:10}:{y:0}}
                transition={{duration:0.3}}
                className="text-2xl"
            >
                {orderName}
            </motion.h1>
        </div>
        <div className="flex gap-x-2">
            <div className={`flex items-center gap-x-2 ${orderStatus === "queued" ? details === orderId  ? "h-fit md:py-2 lg:py-4 md:px-3 lg:px-4" : "h-fit px-12 py-4 mr-[0.3rem]" : orderStatus === "refused" ? details === orderId ? "h-fit px-12 py-4" : "h-fit px-12 py-4 mr-[0.3rem]" : orderStatus === "prepared by" ? details === orderId ? "h-fit px-3 py-2" : "h-fit px-3 py-2" : orderStatus === "preparing by" ? details === orderId ? "h-fit px-3 py-2":"h-fit px-3 py-2":null} border rounded-t-3xl rounded-b-xl shadow-md`}>
                <h1 className={`text-[0.8rem] tracking-widest font-semibold`}>{orderStatus.toUpperCase()}{details === orderId ? orderStatus === "queued" ? <span className="md:text-[0.7rem] xl:text-[0.8rem] md:ml-[0.8rem] xl:ml-4">waiting for some chef to accept it</span> : null : null}</h1>
                {
                    orderStatus === "preparing by" || orderStatus === "prepared by" ?
                    <Image src={shef_photo} alt="shef_photo" width={40} height={10} className="border border-gray-300 rounded-full px-1"/>
                    :
                    null
                } 
            </div>
        </div>
    </div>
  )
}

export default Status_Info