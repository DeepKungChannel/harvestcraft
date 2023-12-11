"use client"
import { MouseEvent, ReactNode, useContext, useEffect, useState } from "react"
import Levelbar from "../components/levelbar"
import * as Progress from "@radix-ui/react-progress"
import Navbar from "../components/navbar"
import Image from "next/image"

import treeimg from '@/public/imgs/gathering/tree.png'
import rockimg  from '@/public/imgs/gathering/rock.png'
import { SocketContext, SocketSignedin } from "../utils/sockets/socketProvider"
import { Socket } from "socket.io"

export default function GatheringClientPage() {
    const socket = useContext(SocketContext)
    const socketSignedin = useContext(SocketSignedin)
    const [pg, setpg] = useState(0)
    const [running, setRunning] = useState(false)

    function listener(data: any) {
        setpg(data.pg)
    }

    useEffect(() => {
        socket?.on("gather", listener)
    
        return () => {
            socket?.off("gather", listener)
        }
    }, [socket, socketSignedin])
    return (
        <>
        <Navbar/>
        <div className="mt-[5rem] select-none">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Gathering</h1>
            <p className={`text-[1.4rem] font-lato`}>Gathering the resource farm farm and farm!</p>

            <div className="mt-[5rem] flex justify-center gap-[15rem]">
                <Box target="wood" setpg={setpg} runninginfo={{running, setRunning}} socket={socket}>
                    <Image width={100} height={100} src={treeimg} quality={98} alt="tree" className="w-full h-full p-3"/>
                </Box>
                <Box target='stone' setpg={setpg} runninginfo={{running, setRunning}} socket={socket}> 
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

type GatheringApiAck = {
    status: number
    response: any
}

type GatheringResponse = {
    items: {name: string, count: number}
    baseTime: number
    xp: number
}

function Box({children, target, setpg, runninginfo, socket} : 
    { children: ReactNode, target: string, setpg: React.Dispatch<React.SetStateAction<number>> 
        runninginfo: {running: boolean, setRunning: React.Dispatch<React.SetStateAction<boolean>>},
        socket?: Socket
    }) 
    {
    
    const {running, setRunning} = runninginfo

    async function StartGathering(e: MouseEvent) {
        if (!running) {
            setRunning(true)
            if (socket?.connected) {
                socket.emit("gather", {target}, (val: GatheringApiAck) => {

                })
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