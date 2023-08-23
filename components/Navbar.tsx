'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' 

const Navbar = () => {

  const pathname = usePathname()

  return (
    <main className="flex justify-between items-center sticky top-0 z-50 bg-C6 py-5 px-[4%]">
      <h1 className="text-3xl text-C3">Eatchen</h1>
      <div className="xs:hidden md:flex justify-evenly md:gap-x-8 lg:gap-x-16">
        <Link href="/builder" className={`py-1 px-3 text-C4 border-2 border-transparent ${pathname === "/builder" ? "border-b-C3":null}`} >builder</Link>
        <Link href="/orders" className={`py-1 px-3 text-C4 border-2 border-transparent ${pathname === "/orders" ? "border-b-C3":null}`} >orders</Link>
        <Link href="/my_kitchen" className={`bg-C3 py-1 px-4 text-black border-2 border-transparent ${pathname === "/my_kitchen" ? "border-b-C3":null} rounded-b-xl rounded-t-3xl`} >My kitchen</Link>
      </div> 
    </main>
  )
}

export default Navbar