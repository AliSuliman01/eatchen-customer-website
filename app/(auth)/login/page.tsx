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

type FormData = {
  email: string,
  password: string,
  remember_me: boolean
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function Login() { 

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
    redirect("/")
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
      <div className="xs:col-span-12 md:col-span-6 lg:col-span-5 xs:pt-16 xl:pt-[5.8rem] xs:pl-7 lg:pl-12 xl:pl-24">
          <h1 className="xs:text-4xl lg:text-4xl xl:text-6xl xs:mb-[7%]">Eatchen</h1>
          <h1 className="xs:text-2xl lg:text-2xl xl:text-3xl font-semibold">You are very welcome </h1>
          <p className="xs:w-10/12 xl:w-9/12 mb-10 mt-3 text-gray-400">Sign in with your Email Address and Password.</p>
          <form className="grid xs:gap-3 md:gap-5 lg:gap-7 xs:w-10/12 md:w-9/12 lg:w-10/12 xl:w-9/12"
            onSubmit={handleSubmit(onSubmit)} 
            noValidate
          >
            <label htmlFor="email" className="text-gray-400">
              Email
              <div>
                <input type="email" id="email" className="p-2 border border-gray-300 w-full text-black"
                {...register("email")}
                />
                <h1 className="text-red-600">{errors.email?.message}</h1>
              </div>
            </label>

            <label htmlFor="password" className="relative text-gray-400">
              Password
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
                Remember me
              </label>
              <Link href="/login/email_reset" className="text-gray-400 select-none cursor-pointer">Forgot Password?</Link>
            </div>
            <button disabled={!isDirty||isSubmitting} className="mt-2 mb-10 bg-C1 text-white py-[0.5rem] w-[40%]">Login</button>
            </form> 
          <p className="text-gray-400">Don&apos;t have an account? <Link href="/signup" className="text-C1">Registe here</Link></p>
      </div>
      <div className="xs:hidden md:grid md:col-span-6 lg:col-span-7 bg-gray-400 relative">
        <Image src={randomImage} alt="food_image" fill={true} object-fit="cover"/>
      </div>
    </div>
  </main>
  )
}
