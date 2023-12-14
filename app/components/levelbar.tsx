import * as Progress from "@radix-ui/react-progress"

import { useContext, useEffect, useState } from "react"
import { SocketContext, SocketSignedin } from "../utils/sockets/socketProvider"
import { SocketApiAck } from "../utils/sockets/socketTypes"

export default function Levelbar({className, progress}: {className?: string, progress?: number}) {
    const [pg, setProgressValue] = useState(progress ? progress : 0)
    const [xp, setXp] = useState(0)
    const socket = useContext(SocketContext)
    const socketSiginedin = useContext(SocketSignedin)

    function getLevelInfo(data: SocketApiAck) {
        if (data.status == 200) {
            setXp(data.response.xp)
        }
    }
    useEffect(() => {
        const progress = xp / 3000 * 100

        if (progress > 100) {
            setProgressValue(100)
        } else {
            setProgressValue(progress)
        }
    }, [xp])
    useEffect(() => {
        socket?.emit("level:get", "", getLevelInfo)
        socket?.on("level:set", getLevelInfo)
        return () => {
            socket?.off("xp:get", getLevelInfo)
        }
    }, [socket, socketSiginedin])
    
    return (
        <>
        <div className={className + " fixed bottom-0 h-[5rem] w-full px-10 bg-white"}>
            <div className="relative my-auto flex flex-col pt-7 pb-3 justify-center h-full">
                <Progress.Root className="ProgressRoot relative bg-[#D9D9D9] h-[2rem] min-w-full max-w-[100rem] rounded-[10px] overflow-hidden" value={pg}>
                    <Progress.Indicator
                        className=" bg-blue-400 h-[2rem] max-w-[100rem] rounded-[5px] transition-all duration-200"
                        style={{ transform: `translateX(-${100 - pg}%)` }}
                    />
                    <div className="absolute h-[2rem] top-[1px] font-montserrat text-lg left-[50%] -translate-x-[50%]">{xp} / 3000</div>
                </Progress.Root>
            </div>
            <div className="absolute top-0 font-soria text-2xl">Level : 1</div>
        </div>
        </>
    )
}