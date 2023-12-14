"use client"

import { ReactNode } from "react";
import Levelbar from "../components/levelbar";
import Navbar from "../components/navbar";
import Image from "next/image";

export default function CraftingClientPage(){
    return (
        <>
        <Navbar/>
        <div className="mt-[5rem] select-none">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Crafting</h1>
            <p className="text-[1.4rem] font-lato">Crafting the tool weapon armor whatever you want!</p>
            <Items>
                
            </Items>
        </div>
         
        <Levelbar/>
        </>
    )
}

function Items() {
    return (
        <div className="border-[#6E6E6E] border-2 border-solid mt-[2rem] flex gap-3">
            <div className="w-[8rem] h-[8rem] min-w-[8rem] select-none bg-[#D9D9D9] border-[#747474] border-r-2 border-solid">
                <Image alt="item's picture" width={300} height={300} src={"/imgs/items/axe.png"} className="p-3 w-full h-full"/>
            </div>
            <div className="flex justify-between w-full px-5">
                <div className="flex flex-col justify-evenly py-2">
                    <h1 className="font-lato text-[1.45rem] font-semibold">Pickaxe I</h1>
                    <p className="text-[1.05rem]">5 Wood logs I</p>
                    <p className="text-[1.05rem]">15 Stone I</p>
                </div>
                <div className="flex flex-col py-3 justify-center ">
                    <p className="font-lato text-[1rem]">Basic pickaxe for beginner</p>
                    <p className="font-lato text-[0.9rem] text-[#383838]">Use for gather tier II or below</p>
                </div>
                <div className="flex flex-col justify-center pr-5">
                    <button className="bg-[#54A3FF] rounded-[0.25rem] font-lato text-[1.05rem] font-normal py-[0.45rem] px-[3rem] ">Craft</button>
                </div>
            </div>
        </div>
    )
}