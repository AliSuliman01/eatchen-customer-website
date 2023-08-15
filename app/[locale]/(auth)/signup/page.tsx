'use client'
import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "@/schema/SignupSchema"
import { AiOutlineEye } from "react-icons/ai" 
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { notification } from "antd"
import { redirect } from "next/navigation"
import axios from 'axios'
import { baseUrl } from '@/api/Api_Info'
import { signupUrl } from '@/api/Api_Info'
import image_1 from '@/public/1.jpg'
import image_2 from '@/public/2.jpg'
import image_3 from '@/public/3.jpg'
import image_4 from '@/public/4.jpg'
import {useTranslations} from 'next-intl'
import Link2 from 'next-intl/link'

type FormData = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

type Params = {
  locale: string
}


type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function Signup({params}:{params:Params}) { 

  const t = useTranslations('sign_up')

  const { locale } = params

  const [secure, setSecure] = useState(true)
  const [done, setDone] = useState<boolean|undefined>(undefined)
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState

  const onSubmit = async ({email,password,username}:FormData) => {  
    await axios.post(`${baseUrl}${signupUrl}`,{
      email,
      password,
      name: username,
    })
    .then(function(res) {
      if (res.data.success) {
        setDone(true)
      }
      else{
        setDone(false)
      }
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

  const [api, contextHolder] = notification.useNotification();
  
  const openNotificationWithIcon = (type: NotificationType, message:string) => {
    api[type]({
      message,
    })
  }

  if (isSubmitSuccessful == true && done == true){
    redirect("/login")
  }
  else if(isSubmitSuccessful == true && done == false){
    openNotificationWithIcon("error","Error, something went wrong")
  }

  const images = [image_1,image_2,image_3,image_4]
  const random = Math.floor(Math.random() * images.length)
  const randomImage = images[random]
  
  return(
    <main> 
      {contextHolder}
      <div className="grid grid-cols-12 h-screen">
        <div className={`xs:col-span-12 md:col-span-6 lg:col-span-5 ${locale === "en" ? "xs:pl-7 lg:pl-12 xl:pl-24" : "xs:pr-7 lg:pr-12 xl:pr-24"} xs:pt-[8%]`}>
            <div className={`flex justify-end gap-x-2 ${locale === "en" ? "pr-[5%]" : "pl-[5%]"} xs:mb-[8%] xl:xs:mb-[5%] text-white`}>
              <Link2 href="/signup" locale="en" className="bg-C1 px-2">en</Link2>
              <Link2 href="/signup" locale="ar" className="bg-C1 px-2">ar</Link2>
            </div>
            <h1 className="xs:text-4xl lg:text-4xl xl:text-6xl xs:mb-[7%]">{t('brand_name')}</h1>
            <form className="grid xs:gap-3 md:gap-5 lg:gap-7 xs:w-10/12 md:w-9/12 lg:w-10/12 xl:w-9/12"
              onSubmit={handleSubmit(onSubmit)} 
              noValidate
            >
              <label htmlFor="username" className="text-gray-400">
                {t('username_label')}
                <div>
                  <input type="text" id="username" className="p-2 border border-gray-300 text-black w-full"
                  {...register("username")}
                  />  
                  <h1 className="text-red-600">{errors.username?.message}</h1>
                </div>
              </label>
        
              <label htmlFor="email" className="text-gray-400">
                {t('email_label')}
                <div>
                  <input type="email" id="email" className="p-2 border border-gray-300 text-black w-full"
                  {...register("email")}
                  />
                  <h1 className="text-red-600">{errors.email?.message}</h1>
                </div>
              </label>
              
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

              <label htmlFor="confirm_password" className="relative text-gray-400">
                {t('password_label')}
                <div className="realtive">
                  <input type={secure == false ? "text" : "password"} id="confirm_password" className="p-2 pr-14 mb-3 border border-gray-300 text-black w-full"
                  {...register("confirmPassword")}
                  />
                  {
                    secure == false ?
                    <AiOutlineEye className="absolute top-[33px] right-3 text-2xl" onClick={handleSecure}/>
                    :
                    <AiOutlineEyeInvisible className="absolute top-[33px] right-3 text-2xl" onClick={handleSecure}/>
                  }
                  <h1 className="text-red-600">{errors.confirmPassword?.message}</h1>
                </div>
              </label>
              <button disabled={!isDirty||isSubmitting} className="mt-2 mb-10 bg-C1 text-white py-[0.5rem] w-[40%]">{t('sign_up_button')}</button>
            </form> 
            <p className="text-gray-400">{t('have_account_statement')}<Link href="/login" className="text-C1">{t('login_link')}</Link></p>
        </div>
        <div className="xs:hidden md:flex md:col-span-6 lg:col-span-7 bg-gray-400 relative">
          <Image src={randomImage} alt="food_image" fill={true} object-fit="cover"/>
        </div>
      </div>
    </main>
  )
}