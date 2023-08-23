"use client"
import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "@/schema/LoginSchema"
import { AiOutlineEye } from "react-icons/ai" 
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { notification } from "antd"
import { redirect } from 'next/navigation'
import axios from 'axios'
import { baseUrl } from '@/api/Api_Info'
import { loginUrl } from '@/api/Api_Info'
import image_1 from '@/public/1.jpg'
import image_2 from '@/public/2.jpg'
import image_3 from '@/public/3.jpg'
import image_4 from '@/public/4.jpg'
import {useTranslations} from 'next-intl'
import Link2 from 'next-intl/link'


type FormData = {
  email: string,
  password: string,
  remember_me: boolean
}

type Params = {
  locale: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function Login({params}:{params:Params}) { 

  const t = useTranslations('sign_in')

  const { locale } = params

  const [secure, setSecure] = useState(true)
  const [done, setDone] = useState<boolean|undefined>(undefined)

  console.log(done)

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      remember_me: false
    }
  })
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState

  const [api, contextHolder] = notification.useNotification();
  
  const openNotificationWithIcon = (type: NotificationType, message:string) => {
    api[type]({
      message,
    })
  }

  const onSubmit = async ({email,password}:FormData) => {  
    await axios.post(`${baseUrl}${loginUrl}`,{
      email,
      password
    })
    .then(function(res) {
      if (res.data.success) {
        setDone(true)
      }
      else{
        setDone(false)
      }
      localStorage.setItem('token', res.data.data.access_token)
      console.log(res)
    })
    .catch(function(err) {
      setDone(false)
      console.log(err)
    })
  }

  const handleSecure = () => {
    setSecure(!secure)
  }

  if (isSubmitSuccessful == true && done == true){
    redirect("/builder")
  }
  else if(isSubmitSuccessful == true && done == false){
    openNotificationWithIcon("error","Error, something went wrong")
  }

  const images = [image_1,image_2,image_3,image_4]
  const random = Math.floor(Math.random() * images.length)
  const randomImage = images[random]

  return (
  <main> 
    {contextHolder}
    <div className="grid grid-cols-12 h-screen">
      <div className={`xs:col-span-12 md:col-span-6 lg:col-span-5 xs:pt-[8%] ${locale=== "en" ? "xs:pl-7 lg:pl-12 xl:pl-24":"xs:pr-7 lg:pr-12 xl:pr-24"}`}>
          <div className={`flex justify-end gap-x-2 ${locale === "en" ? "pr-[5%]":"pl-[5%]"} xs:mb-[10%] xl:mb-[5%] text-white`}>
            <Link2 href="/login" locale="en" className="bg-C1 px-2">en</Link2>
            <Link2 href="/login" locale="ar" className="bg-C1 px-2">ar</Link2>
          </div>
          <h1 className="xs:text-4xl lg:text-4xl xl:text-6xl xs:mb-[7%]">{t('brand_name')}</h1>
          <h1 className="xs:text-2xl lg:text-2xl xl:text-3xl font-semibold">{t('welcome_statement')}</h1>
          <p className="xs:w-10/12 xl:w-9/12 mb-10 mt-3 text-gray-400">{t('sign_in_statement')}</p>
          <form className="grid xs:gap-3 md:gap-5 lg:gap-7 xs:w-10/12 md:w-9/12 lg:w-10/12 xl:w-9/12"
            onSubmit={handleSubmit(onSubmit)} 
            noValidate
          >
            <label htmlFor="email" className="text-gray-400">
              {t('email_label')}
              <div>
                <input type="email" id="email" className="p-2 border border-gray-300 w-full text-black"
                {...register("email")}
                />
                <h1 className="text-red-600">{errors.email?.message}</h1>
              </div>
            </label>

            <label htmlFor="password" className="relative text-gray-400">
              {t('password_label')}
              <div className="realtive">
                <input type={secure == false ? "text" : "password"} id="password" className="p-2 pr-14 text-black mb-3 border border-gray-300 w-full"
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
            <div className="flex justify-between text-sm">
              <label htmlFor="remeber_me" className="flex items-center gap-2 text-gray-400 select-none cursor-pointer"> 
                <input type="checkbox" id="remeber_me" {...register("remember_me")} className="accent-C1 w-4 h-4 select-none cursor-pointer" />  
                {t('remember_me_label')}
              </label>
              <Link href="/login/email_reset" className="text-gray-400 select-none cursor-pointer">{t('forgot_password_link')}</Link>
            </div>
            <button disabled={!isDirty||isSubmitting} className="mt-2 mb-10 bg-C1 text-white py-[0.5rem] w-[40%]">{t('login_button')}</button>
            </form> 
          <p className="text-gray-400">{t('have_account_statement')} <Link href="/signup" className="text-C1">{t('register_link')}</Link></p>
      </div>
      <div className="xs:hidden md:grid md:col-span-6 lg:col-span-7 bg-gray-400 relative">
        <Image src={randomImage} alt="food_image" fill={true} object-fit="cover"/>
      </div>
    </div>
  </main>
  )
}
