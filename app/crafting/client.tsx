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
            <div className="border-[#6E6E6E] border-2 border-solid mt-[2rem] flex gap-3">
                <Box>
                    &nbsp;
                </Box>
                <div className="flex justify-between w-full px-5">
                    <div className="flex flex-col">
                        <h1 className="font-lato text-[1.45rem] font-normal pb-2 pt-3">Pickaxe I</h1>
                        <p className="pb-2 text-[1.05rem]">5 wood logs I</p>
                        <p className="text-[1.05rem]">15 stone I</p>
                    </div>
                    <div className="flex flex-col py-3 justify-center ">
                        <p className="font-lato text-[1.25rem] font-normal">Basic pickaxe for beginner</p>
                        <p className="font-lato text-[1rem] font-normal text-[#383838] pl-2">use for gather tier II or below</p>
                    </div>
                    <div className="flex flex-col justify-center pr-5">
                        <button className="bg-[#54A3FF] rounded-[0.25rem] font-lato text-[1.20rem] font-normal text-[#383838] py-[0.45rem] px-[3rem]">craft</button>
                    </div>
                </div>
            </div>
        </div>
         
        <Levelbar/>
        </>
    )
}

function Box({children} : {children: ReactNode}) {
    return (
        <div className="min-w-[8rem] min-h-[8rem] select-none bg-[#D9D9D9] border-[#747474] border-r-2 border-solid">
            {children}
        </div>
    )
}