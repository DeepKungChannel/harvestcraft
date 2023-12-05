"use client"

import { ReactNode } from "react";
import Levelbar from "../components/levelbar";
import Navbar from "../components/navbar";

export default function CraftingClientPage(){
    return (
        <>
        <Navbar/>
        <div className="mt-[5rem] select-none">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Crafting</h1>
            <p className="text-[1.4rem] font-lato">Crafting the tool weapon armor whatever you want!</p>
            <div className="mt-[2rem] flex gap-[2rem]">
                <Box>
                    &nbsp;
                </Box>
                <div className="flex justify-between w-full px-[2rem]">
                    <div className="flex flex-col">
                        <h1 className="font-lato text-[2rem] font-normal pb-3">Pickaxe I</h1>
                        <p className="pb-3 text-xl">5 wood logs I</p>
                        <p className="text-xl">15 stone I</p>
                    </div>
                    <div className="flex flex-col py-3 justify-center ">
                        <p className="font-lato text-2xl font-normal">Basic pickaxe for beginner</p>
                        <p className="font-lato text-xl font-normal text-[#383838] pl-2">use for gather tier II or below</p>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div> 
        {/* You now just need to put another item so i gonna be 3 item inside this flex box and it will work */}
        <Levelbar/>
        </>
    )
}

function Box({children} : {children: ReactNode}) {
    return (
        <div className="min-w-[10rem] min-h-[10rem] select-none bg-[#D9D9D9] border-[#747474] border-2 border-solid">
            {children}
        </div>
    )
}