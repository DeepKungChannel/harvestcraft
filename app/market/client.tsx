"use client"

import { Kanit, Lato } from "next/font/google"
import Navbar from "../components/navbar"
import PointsComponent from "../components/points"
import { ReactNode } from "react"

const lato = Lato({weight: ["400", "300", "700"], subsets: ["latin"]})
const kanit = Kanit({weight: ['300','400','600','700','800'], subsets: ['latin', 'latin-ext']})
export default function MarketClientPage() {

    return (
        <>
        <Navbar/>
        <PointsComponent/>
        <div className="mt-[5rem]">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Market</h1>
            <p className={`text-[1.4rem] ${lato.className}`}>Buy or sell anything you want here!</p>
            
            
            {/* Search box */}
            <div className="flex gap-3 h-[2.5rem] mt-10">
                <input type="text" name="search" id="search" placeholder="Search a name of items" className="text-[#353535] w-[25rem] bg-[#D9D9D9] border-2 border-solid border-[#525252] p-2 pb-3 pl-3"/>
                <div className="min-h-full bg-[#22A2FF] border-2 border-solid border-[#0C436B] w-[2.5rem]"></div>
            </div>

            <div className="mt-[0.8rem] select-none">&nbsp;</div>
            <div className="flex flex-col gap-5">
                <ItemCard>
                    <div className="min-h-full min-w-[8rem] bg-[#C0C0C0]">&nbsp;</div>
                    <div className="flex justify-between w-full px-5">
                        <div className="flex flex-col justify-between py-2">
                            <h1 className={`text-[1.55rem] font-kanit font-light pt-1`}>Wood log</h1>
                            <p className="font-kanit font-light text-[1.2rem] pb-1">Sold by DeepKungChannel</p>
                        </div>
                        <div className="mr-[10%] text-[1.4rem] font-kanit font-light h-fit my-auto">Total amount: 1</div>
                        <div className="flex flex-col gap-3 justify-center pr-5">
                            <p className="text-center font-kanit font-light text-[1.2rem]">15 Silvers</p>
                            <button className="bg-[#28a9c0] text-white px-10 py-[5px] text-[1rem] rounded-[5px] font-kanit font-light">Buy</button>
                        </div>
                    </div>
                </ItemCard>
            </div>
        </div>

        </>
    )
}

function ItemCard({children}: {children: ReactNode}) {

    return (
        <div className="w-full h-[8rem] border-solid border-2 border-[#525252] flex">
            {children}
        </div>
    )
}