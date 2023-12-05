"use client"
import { ReactNode, useState } from "react"
import Levelbar from "../components/levelbar"
import * as Progress from "@radix-ui/react-progress"
import Navbar from "../components/navbar"

export default function GatheringClientPage() {
    const [pg, setpg] = useState(0)
    return (
        <>
        <Navbar/>
        <div className="mt-[5rem] select-none">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Gathering</h1>
            <p className={`text-[1.4rem] font-lato`}>Gathering the resource farm farm and farm!</p>

            <div className="mt-[5rem] flex justify-center gap-[15rem]">
                <Box>
                    &nbsp;
                </Box>
                <Box>
                    &nbsp;
                </Box>
            </div>
            <div className={"relative bottom-0 h-[5rem] mt-[4rem] w-full px-[5rem] bg-white"}>
                <div className="relative my-auto flex flex-col pt-7 pb-3 justify-center h-full">
                    <Progress.Root className="ProgressRoot relative bg-[#D9D9D9] h-[1rem] w-full max-w-[100rem] rounded-[3px] overflow-hidden" value={pg}>
                        <Progress.Indicator
                            className=" bg-blue-400 h-[1rem] max-w-[100rem] rounded-[5px] transition-all duration-200"
                            style={{ transform: `translateX(-${100 - pg}%)` }}
                        />
                    </Progress.Root>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 font-montserrat text-2xl">50%</div>
            </div>
        </div>
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