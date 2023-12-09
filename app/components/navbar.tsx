import React from 'react'
import localFont from "next/font/local"
import Link from 'next/link'



function Navbar() {
  return (
    <div className='fixed w-full top-0'>

        <div className='min-h-[4rem] bg-[#472f5f] font-montserrat flex'>
            <div className='absolute z-10 text-white h-[4rem] flex items-center'>
              <h1 className='pl-5 text-lg'>DeepKungChannel</h1>
                
            </div>
            <ul className='flex justify-center w-full text-white items-center font-montserrat gap-14'>
            <Link href="/" className='text-[1rem]'>Home</Link> 
            <Link href="/core" className='text-[1rem]'>Core</Link> 
            <Link href="/market" className='text-[1rem]'>Market</Link> 
            </ul>
        </div>
    </div>
  )
}

export default Navbar