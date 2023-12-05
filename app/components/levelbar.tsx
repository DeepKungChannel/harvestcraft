import * as Progress from "@radix-ui/react-progress"

import { useEffect, useState } from "react"

export default function Levelbar({className, progress}: {className?: string, progress?: number}) {
    const [pg, setProgressValue] = useState(progress ? progress : 36)

    
    return (
        <>
        <div className={className + " fixed bottom-0 h-[5rem] w-full px-10 bg-white"}>
            <div className="relative my-auto flex flex-col pt-7 pb-3 justify-center h-full">
                <Progress.Root className="ProgressRoot relative bg-[#D9D9D9] h-[2rem] min-w-full max-w-[100rem] rounded-[10px] overflow-hidden" value={pg}>
                    <Progress.Indicator
                        className=" bg-blue-400 h-[2rem] max-w-[100rem] rounded-[5px] transition-all duration-200"
                        style={{ transform: `translateX(-${100 - pg}%)` }}
                    />
                    <div className="absolute h-[2rem] top-[1px] font-montserrat text-lg left-[50%] -translate-x-[50%]">12700 / 35000</div>
                </Progress.Root>
            </div>
            <div className="absolute top-0 font-soria text-2xl">Level : 1</div>
        </div>
        </>
    )
}