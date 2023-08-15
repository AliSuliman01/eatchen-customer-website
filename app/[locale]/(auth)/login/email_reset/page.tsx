'use client'
import React, {useState} from 'react'
import {useTranslations} from 'next-intl'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "@/schema/EmailResetSchema"
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import Link2 from 'next-intl/link'
import { notification } from "antd"

type FormData = {
    email: string,
}

type Params = {
    locale: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'


const EmailReset  = ({params}:{params:Params}) => {

    const t = useTranslations('email_reset')

    const { locale } = params

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
                    <div className={`flex ${locale === "ar" ? "justify-self-end pl-[5%]" : "justify-self-end pr-[5%]"} gap-x-2 text-white`}>
                        <Link2 href="/login/email_reset" locale="en" className="bg-C1 px-2">en</Link2>
                        <Link2 href="/login/email_reset" locale="ar" className="bg-C1 px-2">ar</Link2>
                    </div>
                    <h1 className="text-4xl">{t('brand_name')}</h1>
                    <h1>{t('forgot_statement')}</h1>
                    <p className="mt-[-1.5rem] xs:text-sm">{t('enter_email_statement')}</p>
                    <form className="grid gap-4 xs:w-10/12 md:w-9/12 lg:w-10/12 xl:w-9/12"
                    onSubmit={handleSubmit(onSubmit)} 
                    noValidate
                    >
                        <div>
                            <input 
                            type="email" 
                            id="email" 
                            className={`p-2 ${locale === "ar" ? "pr-4" : "pl-4"} border border-gray-300 w-full text-black`}
                            placeholder={t('placeholder')}
                            {...register("email")}
                            />
                            <h1 className="text-red-600">{errors.email?.message}</h1>
                        </div>
                        <button disabled={!isDirty||isSubmitting} className=" bg-C1 text-white py-[0.5rem]">{t('send_link')}</button>
                    </form> 
                    <Link href="/login" className="flex items-center gap-2 text-C1">
                        <AiOutlineArrowLeft />
                        {t('back_to_sign_in')}
                    </Link>  
                </div>
            </div>
        </main>
    )

}

export default EmailReset



