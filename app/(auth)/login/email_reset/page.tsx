'use client'
import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "@/schema/EmailResetSchema"
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import { notification } from "antd"


type FormData = {
    email: string,
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'


const EmailReset = () => {

    const [done, setDone] = useState<boolean|undefined>(undefined)

    const { register, handleSubmit, formState } = useForm<FormData>({
        resolver: zodResolver(schema),    
    })
    const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState  

    const onSubmit = ({email}:FormData) => {  
        console.log(email)
    }

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message:string) => {
        api[type]({
            message,
        })
    } 

    if (isSubmitSuccessful == true && done == true){
        openNotificationWithIcon("success","Success, you have successfully changed your password")
    }
    else if(isSubmitSuccessful == true && done == false){
        openNotificationWithIcon("error","Error, something went wrong")
    }

    return (
        <main>
            {contextHolder}
            <div className="grid grid-cols-12 content-center h-screen">
                <div className="xs:col-span-12 md:col-start-4 md:col-end-10 xl:col-start-5 xl:col-end-9 grid gap-8 justify-items-center md:shadow-xl md:border md:border-transparent md:border-t-gray-200 py-8">
                    <h1 className="text-4xl">Eatchen</h1>
                    <h1>Forgot Password?</h1>
                    <p className="mt-[-1.5rem] xs:text-sm">Enter your Email Address to receive a reset link</p>
                    <form className="grid gap-4 xs:w-10/12 md:w-9/12 lg:w-10/12 xl:w-9/12"
                    onSubmit={handleSubmit(onSubmit)} 
                    noValidate
                    >
                        <div>
                            <input 
                            type="email" 
                            id="email" 
                            className="p-2 pl-4 border border-gray-300 w-full text-black"
                            placeholder="Please enter valid Email..."
                            {...register("email")}
                            />
                            <h1 className="text-red-600">{errors.email?.message}</h1>
                        </div>
                        <button disabled={!isDirty||isSubmitting} className=" bg-C1 text-white py-[0.5rem]">Send</button>
                    </form> 
                    <Link href="/login" className="flex items-center gap-2 text-C1">
                        <AiOutlineArrowLeft />
                        Back to Sign in
                    </Link>  
                </div>
            </div>
        </main>
    )

}

export default EmailReset

