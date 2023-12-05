"use client"
import Image from "next/image"
import Navbar from "./components/navbar"
import backpackimg from '../public/imgs/backpack.svg'
import axesimg from '../public/imgs/2axes.svg'
import anvilimg from '../public/imgs/anvil.svg'
import Levelbar from "./components/levelbar"
import PointsComponent from "./components/points"
import { ReactNode } from "react"
import Link from "next/link"

export default function ClientPage() {

    return (
        <>
        <PointsComponent/>
        <Navbar />
        <div className="font-soria mt-[10rem] mb-[3rem] w-full flex justify-center items-center flex-col">
            <h1 className="text-[3rem] leading-7">Welcome to</h1>
            <h1 className="text-[4rem] relative">HarvestCraft <span className="absolute top-[32%] -right-[3.5rem] text-[2rem] text-[#FF0000]">beta</span></h1>
        </div>
        <div className="flex gap-[3.6rem] justify-center mt-5 w-full">
            <ButtonCard>
                {/* picture */}
                <Image width={200} height={200} className="w-[5rem] h-[5rem]" src={backpackimg} alt="backpack"/>  
                <p className="text-[2rem]">Inventory</p>
            </ButtonCard>
            <Link href="/gathering">
                <ButtonCard>
                    {/* picture */}
                    <Image width={200} height={161} className="w-[6rem]" src={axesimg} alt="backpack"/>
                    <p className="text-[2rem]">Gathering</p>
                </ButtonCard>
            </Link>
            <Link href="/crafting">
                <ButtonCard>
                    {/* picture */}
                    <Image width={200} height={200} className="w-[6rem]" src={anvilimg} alt="backpack"/>
                    <p className="text-[2rem] ">Crafting</p>
                </ButtonCard>
            </Link>
        </div>
        <Levelbar/>
        </>
    )
}

function ButtonCard({children}:{children: ReactNode}) {
    return (
        <div className="bg-[#CFC6BD] min-w-[12rem] min-h-[13rem] font-soria flex flex-col items-center justify-center gap-5 select-none cursor-pointer">
            {children}
        </div>
    )
}