'use client'
import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import {useTranslations} from 'next-intl'
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "@/schema/ChangePasswordSchema"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { notification } from "antd"
import Link2 from 'next-intl/link'

type FormData = {
    password: string,
    confirmPassword: string
}

type Params = {
    locale: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const ChangePassword = ({params}:{params:Params}) => {

    const t = useTranslations('change_password')

    const { locale } = params

    const [done, setDone] = useState<boolean|undefined>(undefined)
    const [secure, setSecure] = useState<boolean>(true)

    const { register, handleSubmit, formState } = useForm<FormData>({
        resolver: zodResolver(schema),    
    })
    const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState  

    const onSubmit = ({password, confirmPassword}:FormData) => {  
        console.log(password, confirmPassword)
    }

    const handleSecure = () => {
        setSecure(!secure)
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
                <div className="xs:col-span-12 md:col-start-4 md:col-end-10 xl:col-start-5 xl:col-end-9 grid gap-4 justify-items-center md:shadow-xl md:border md:border-transparent md:border-t-gray-200 py-8">
                    <div className="flex justify-self-end gap-x-2 pr-[5%] text-white">
                        <Link2 href="/login/change_password" locale="en" className="bg-C1 px-2">en</Link2>
                        <Link2 href="/login/change_password" locale="ar" className="bg-C1 px-2">ar</Link2>
                    </div>
                    <h1 className="text-4xl">{t('brand_name')}</h1>
                    <p className="text-[1.1rem] font-medium xs:mb-2">{t('reset_statement')}</p>
                    <form className="grid gap-4 xs:w-10/12 md:w-9/12 lg:w-10/12 xl:w-9/12"
                    onSubmit={handleSubmit(onSubmit)} 
                    noValidate
                    >

                        <label htmlFor="password" className="relative text-gray-400" >
                            {t('password_label')}
                            <div className="realtive">
                                <input type={secure == false ? "text" : "password"} id="password" className="p-2 pr-14 border border-gray-300 text-black w-full"
                                {...register("password")}
                                />
                                {
                                secure == false ?
                                <AiOutlineEye className="absolute top-[33px] right-3 text-2xl" onClick={handleSecure}/>
                                :
                                <AiOutlineEyeInvisible className="absolute top-[33px] right-3 text-2xl" onClick={handleSecure}/>
                                }
                                <h1 className="text-red-600">{errors.password?.message}</h1>
                            </div>
                        </label>

                        <label htmlFor="confirm_password" className="relative text-gray-400" >
                            {t('confirm_password_label')}
                            <div className="realtive">
                                <input type={secure == false ? "text" : "password"} id="confirm_password" className="p-2 pr-14 border border-gray-300 text-black w-full"
                                {...register("confirmPassword")}
                                />
                                {
                                secure == false ?
                                <AiOutlineEye className="absolute top-[33px] right-3 text-2xl" onClick={handleSecure}/>
                                :
                                <AiOutlineEyeInvisible className="absolute top-[33px] right-3 text-2xl" onClick={handleSecure}/>
                                }
                                <h1 className="text-red-600">{errors.password?.message}</h1>
                            </div>
                        </label>

                        <button disabled={!isDirty||isSubmitting} className="bg-C1 text-white py-[0.5rem] mb-[5%]">{t('reset_button')}</button>
                    </form>  
                </div>
            </div>
        </main>
    )

}

export default ChangePassword