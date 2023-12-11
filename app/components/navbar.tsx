"use client"
import React, { useContext } from 'react'
import localFont from "next/font/local"
import Link from 'next/link'
import { InternetConnection, SocketSignedin } from '../utils/sockets/socketProvider'



function Navbar() {
  const socketconnection = useContext(SocketSignedin)
  const internetConnection = useContext(InternetConnection)

  return (
    <div className='fixed w-full top-0 z-50'>
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
        {((internetConnection == false) || (socketconnection == false)) ? (
          // show gray no connection bar
          <>
          {!internetConnection ? (
            <div className='w-full bg-slate-900 text-white font-montserrat text-[0.8rem] text-center py-1 `'>
              Cannot talk to backend api. Please check your internet connection.
            </div>
          ): (
            <div className='w-full bg-slate-900 text-white font-montserrat text-[0.8rem] text-center py-1 `'>
              Please signin before playing this game
            </div>
          )}
            
          </>
        ) : <></>}
    </div>
  )
}

export default Navbar