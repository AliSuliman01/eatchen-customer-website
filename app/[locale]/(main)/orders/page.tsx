'use client'
import React, { useState } from 'react'
import TobBar from '@/components/orders/TobBar'
import Aprove_Price from '@/components/orders/Aprove_Price'
import Arrows_Buttons from '@/components/orders/Arrows_Buttons'
import Notes_Ingredients from '@/components/orders/Notes_Ingredients'
import Status_Info from '@/components/orders/Status_Info'
import { motion } from 'framer-motion' 
import { orders } from '@/components/orders/orders'

const Orders = () => {

    const [details, setDetails] = useState<number>()  

  return (
    <main className="my-[4%] px-[4%]">

        <section className="flex justify-between items-center my-[4%]">
            <TobBar />   
        </section>

        <section className="grid gap-y-4">
            {
                orders.map((order,index) => (
                    <motion.div
                        animate={details === order.id ? {opacity:[0,1],transition:{duration:0.7}}:{opacity:1}}
                        key={index} 
                        className={`relative origin-top w-full border rounded-md shadow-md p-6 ${details !== order.id ? "flex justify-between items-center" : "relative grid grid-cols-12 gap-y-4"} ${order.status === "queued" ? "bg-white" : order.status === "refused" ? "bg-C9" : order.status === "preparing by" ? "bg-C8" : "bg-C10"}`}
                    >
                        <Aprove_Price 
                            details={details} 
                            orderId={order.id} 
                            orderStatus={order.status} 
                        />
                        <Status_Info 
                            details={details} 
                            orderId={order.id} 
                            orderStatus={order.status} 
                            orderHistory={order.created_at} 
                            orderName={order.carts[0].product.name}
                        />
                        {
                            details !== order.id ?
                            order.status === "preparing by" || order.status === "prepared by" ?
                            <h1 className="tracking-widest font-semibold text-xl">TOTAL: 15000<span>s.p</span></h1>
                            :
                            null
                            :
                            null
                        }
                        <Arrows_Buttons 
                            details={details} 
                            orderId={order.id} 
                            orderStatus={order.status} 
                            setDetails={setDetails}
                        />
                        <Notes_Ingredients 
                            details={details} 
                            orderId={order.id} 
                            orderNotes={order.carts[0].notes} 
                            orderIngredients={order.carts[0].product.ingredients} 
                        />
                    </motion.div> 
                ))
            } 
        </section>
        
    </main>
  )
}

export default Orders


