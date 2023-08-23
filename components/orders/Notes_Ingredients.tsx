import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Data = {
    details: number | undefined,
    orderId: number,
    orderNotes: string,
    orderIngredients: {
        translation: {
            name: string;
        };
        media: {
            original_url: string;
        };
    }[]
}

const Notes_Ingredients = ({details,orderId,orderNotes,orderIngredients}:Data) => {
  return (
    <>
    {
        details === orderId &&
        <>
            <motion.p
                initial={{opacity:0,x:-10}}
                animate={{opacity:1,x:0}}
                transition={{duration:0.3}}
                className="col-span-12"
            >
                {orderNotes}
            </motion.p>
            <motion.div
                initial={{opacity:0,x:-10}}
                animate={{opacity:1,x:0}}
                transition={{duration:0.3}}
                className="grid grid-cols-6 md:w-[50%] xl:w-[30%] col-span-12"
            >
                {orderIngredients.map((ingredient) =>
                    (
                        <>
                            <div className="col-span-1">
                                <Image src={ingredient.media.original_url} alt="shef_photo" width={40} height={40} /> 
                                <h1>{ingredient.translation.name}</h1>
                            </div>
                        </>
                    )
                )}
            </motion.div>
        </>
    }
    </>
  )
}

export default Notes_Ingredients