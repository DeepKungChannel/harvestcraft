"use client"
import { MouseEvent, ReactNode, useState } from "react"
import Levelbar from "../components/levelbar"
import * as Progress from "@radix-ui/react-progress"
import Navbar from "../components/navbar"
import Image from "next/image"

import treeimg from '@/public/imgs/gathering/tree.png'
import rockimg  from '@/public/imgs/gathering/rock.png'

export default function GatheringClientPage() {
    const [pg, setpg] = useState(0)
    const [running, setRunning] = useState(false)
    return (
        <>
        <Navbar/>
        <div className="mt-[5rem] select-none">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Gathering</h1>
            <p className={`text-[1.4rem] font-lato`}>Gathering the resource farm farm and farm!</p>

            <div className="mt-[5rem] flex justify-center gap-[15rem]">
                <Box target="wood" setpg={setpg} runninginfo={{running, setRunning}}>
                    <Image width={100} height={100} src={treeimg} quality={98} alt="tree" className="w-full h-full p-3"/>
                </Box>
                <Box target='stone' setpg={setpg} runninginfo={{running, setRunning}}> 
                    <Image width={100} height={100} src={rockimg} quality={98} alt="tree" className="w-full h-full p-5"/>
                </Box>
            </div>
            <div className={"relative bottom-0 h-[5rem] mt-[4rem] w-full px-[5rem] bg-white"}>
                <div className="relative my-auto flex flex-col pt-7 pb-3 justify-center h-full">
                    <Progress.Root className="ProgressRoot relative bg-[#D9D9D9] h-[1rem] w-full max-w-[100rem] rounded-[3px] overflow-hidden" value={pg}>
                        <Progress.Indicator
                            className=" bg-blue-400 h-[1rem] max-w-[100rem] rounded-[5px] transition-all duration-[50ms]"
                            style={{ transform: `translateX(-${100 - pg}%)` }}
                        />
                    </Progress.Root>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 font-montserrat text-2xl">{pg}%</div>
            </div>
        </div>
        <Levelbar/>
        </>
    )
}

function Box({children, target, setpg, runninginfo} : 
    { children: ReactNode, target: string, setpg: React.Dispatch<React.SetStateAction<number>> 
        runninginfo: {running: boolean, setRunning: React.Dispatch<React.SetStateAction<boolean>>}
    }) 
    {
    
    const {running, setRunning} = runninginfo

    async function StartGathering(e: MouseEvent) {
        if (!running) {
            setpg(0)
            setRunning(true)
            for (let i = 0; i <= 100; i+=1){
                await new Promise((resolve, reject)=>{setTimeout(()=>{resolve(1)} , 5/100*1000)})
                setpg(i)
            }
            setRunning(false)
        }
    }

    return (
        <div onClick={StartGathering} className="cursor-pointer w-[10rem] h-[10rem] select-none bg-[#D9D9D9] border-[#747474] border-2 border-solid">
            {children}
        </div>
    )
}