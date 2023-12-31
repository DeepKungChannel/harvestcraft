"use client"

import { ReactNode, useContext, useEffect, useState } from "react"
import Levelbar from "../components/levelbar"
import Navbar from "../components/navbar"
import { Lato, Roboto } from "next/font/google"
import Image from "next/image"

import axeimg from "../../public/imgs/core/axe_mastery.png"
import SkillPointsComponent from "../components/skillpoints"
import { SocketApiAck } from "../utils/sockets/socketTypes"
import { SocketContext, SocketSignedin } from "../utils/sockets/socketProvider"

const lato = Lato({weight: ["400", "300", "700"], subsets: ["latin"]})
const roboto = Roboto({subsets: ['latin'], weight: ['100', '300', '400','500','700','900']})

export default function CoreClientPage() {
    const [CoreDatas, setCoreDatas] = useState<any[]>([])

    const socket = useContext(SocketContext)
    const socketSignin = useContext(SocketSignedin)
    useEffect(() => {
        socket?.emit("core:get", "", getCores)

        return () => {
            // socket?.off("core:get", getCores)
        }
    }, [SocketSignedin, socket])


    function getCores(data: SocketApiAck) {
        if (data.status == 200) {
            let core_datas = data.response
            setCoreDatas(core_datas)
            console.log(core_datas)
        }
    }


    return (
        <>
        <Navbar/>
        <SkillPointsComponent/>
        <div className="mt-[5rem]">&nbsp;</div>
        <div className="px-16 pb-[7rem] min-h-full h-full">
            <h1 className="font-soria text-[4rem] mt-5">Core Overview</h1>
            <p className={`text-[1.4rem] ${lato.className}`}>Use skill point for upgrade stats and skills</p>
            <div className="mt-[1rem] select-none">&nbsp;</div>
            <div className="flex flex-col gap-7 min-h-full">
                {CoreDatas.length > 0 ? (
                    <>{CoreDatas.map(({id, name, description}, index) => <SkillPart key={index} id={id} name={name} description={description}/>)}</>
                ): (
                    <><div className="text-[1.3rem] text-[#525252] w-full min-h-full font-montserrat flex justify-center items-center">No data</div></>
                )}
            </div>
        </div>
        <Levelbar/>
        </>
    )
}

function SkillPart({id, name, description} : {id: string, name: string, description: string}) {

    return (
        <div className="w-[75%] border-[#525252] border-2">
            <div className="flex gap-5">
                <div className="w-[6rem] h-[6rem] bg-[#D9D9D9]">
                    <Image height={200} width={200} alt="axe" src={'/imgs/core/' + id + '.png'} className="w-full h-full p-3"/>
                </div>
                <div className="flex flex-col justify-between min-h-full">
                    <h1 className={`text-[1.3rem] pt-[0.7rem] ${lato.className}`}>{name}</h1>
                    <p className="text-[1.03rem] pb-3">{description}</p>
                </div>
                <div className="flex flex-col justify-between py-3 gap-3 ml-auto mr-5">
                    <p className="select-none">Required 1 skill points</p>
                    <button className={`rounded-[5px] text-sm bg-[#54A3FF] h-[2rem] px-2 justify-center ${lato.className}`}>Learn</button>
                </div>
            </div>
        </div>
    )
}