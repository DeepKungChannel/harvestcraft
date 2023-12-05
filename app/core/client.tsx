"use client"

import { ReactNode } from "react"
import Levelbar from "../components/levelbar"
import Navbar from "../components/navbar"
import { Lato, Roboto } from "next/font/google"
import Image from "next/image"

import axeimg from "../../public/imgs/core/axe.png"
import SkillPointsComponent from "../components/skillpoints"

const lato = Lato({weight: ["400", "300", "700"], subsets: ["latin"]})
const roboto = Roboto({subsets: ['latin'], weight: ['100', '300', '400','500','700','900']})

export default function CoreClientPage() {
    return (
        <>
        <Navbar/>
        <SkillPointsComponent/>
        <div className="mt-[5rem]">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Core Overview</h1>
            <p className={`text-[1.4rem] ${lato.className}`}>Use skill point for upgrade stats and skills</p>
            <div className="mt-[1rem] select-none">&nbsp;</div>
            <div className="flex flex-col gap-7">
                <SkillPart>
                    <div className="flex gap-5">
                        <div className="w-[6rem] h-[6rem] bg-[#D9D9D9]">
                            <Image height={200} width={200} alt="axe" src={axeimg} className="w-full h-full p-2"/>
                        </div>
                        <div className="flex flex-col justify-between min-h-full">
                            <h1 className={`text-[1.3rem] pt-[0.7rem] ${lato.className}`}>Axe mastery I</h1>
                            <p className="text-[1.03rem] pb-3">Reduce time to cut down trees by 0.25%</p>
                        </div>
                        <div className="flex flex-col justify-between py-3 gap-3 ml-auto mr-5">
                            <p className="select-none">Required 1 skill points</p>
                            <button className={`rounded-[5px] text-sm bg-[#54A3FF] h-[2rem] px-2 justify-center ${lato.className}`}>Learn</button>
                        </div>
                    </div>
                </SkillPart>
            </div>
        </div>
        <Levelbar/>
        </>
    )
}

function SkillPart({children} : {children: ReactNode}) {

    return (
        <div className="w-[75%] border-[#525252] border-2">
            {children}
        </div>
    )
}