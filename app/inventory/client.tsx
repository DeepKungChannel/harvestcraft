"use client"

import { ReactNode, useContext, useEffect, useState } from "react"
import Navbar from "../components/navbar"
import { SocketContext, SocketSignedin } from "../utils/sockets/socketProvider"
import { SocketApiAck } from "../utils/sockets/socketTypes"
import Image from "next/image"


export default function InventoryClientPage(){
    const [inventoryData, setInventoryData] = useState({})
    const socket = useContext(SocketContext)
    const socketSignedin = useContext(SocketSignedin)

    function ReceiveInventoryDateUpdate(val: SocketApiAck){
        if (val.status == 200) {
            setInventoryData(val.response)
        }
    }
    useEffect(() => {
        if (socket) {
            socket.emit("inventory", "", (val: SocketApiAck) => {
                if (val.status == 200) {
                    setInventoryData(val.response)
                }
            })
            socket.on("inventory", ReceiveInventoryDateUpdate)            
        }
        return () => {
            socket?.off("inventory", ReceiveInventoryDateUpdate)
        }
    }, [socket, socketSignedin])

    
    

    return (
        <>
        <Navbar/>
        <div className="mt-[5rem] select-none">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Inventory</h1>
            <p className={`text-[1.4rem] font-lato`}>Manage your items here!</p>

            <div className="grid grid-cols-5 place-items-center w-fit gap-[4rem] mt-[3rem] select-none pl-[3%] mb-[3rem]">
                <InventorySection inventoryData={inventoryData}/>
            </div>

        </div>
        </>
    )
}

function InventorySection({inventoryData} : {inventoryData: any}) {
    const count = 15;
    let element = []
    for (let i = 0; i < count; i++) {
        let data = Object.entries(inventoryData)[i]
        if (data === undefined) {
            element.push(<Box position={i} key={i} >&nbsp;</Box>)
        }
        else {
            element.push(
                <Box position={i} key={i}>
                    <Image alt="item" onContextMenu={(e)=>{e.preventDefault()}} width={300} height={300} src={`/imgs/items/` + data[0] + ".png"} className="w-full p-3"/>
                    <div className="absolute z-20 bg-[#6DC2FF] px-[0.6rem] py-[0.15rem] -bottom-2 -right-2 rounded-[5px] font-montserrat text-[0.9rem]">{data[1] as any}x</div>
                </Box>
            )
        }
    }

    return element
    
}

function Box({children, picturePath, position}: {children: ReactNode, position:number, picturePath?: string}){



    return (
        <div className="bg-[#D9D9D9] border-[#6E6E6E] border-solid border-2 w-[7rem] h-[7rem] relative" onDrop={(e) => {console.log("from",JSON.parse(e.dataTransfer.getData('application/json')).position, "to", position)}} onDragStart={(e)=>{e.dataTransfer.setData("application/json", JSON.stringify({position:position}))}} onDragOver={(e)=>{e.preventDefault()}} draggable={true}>
            {children}
        </div>
    )
}