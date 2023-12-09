"use client"

import { ReactNode, useState } from "react"
import Navbar from "../components/navbar"

export default function InventoryClientPage(){
    const [inventoryData, setInventoryData] = useState([{picturePath: "/hi"}])
    function generateBox() {
        const count = 15;
        let element = []
        for (let i = 0; i < count; i++) {
            element.push(<Box position={i}>&nbsp;</Box>)
        }

        return element
    }
    return (
        <>
        <Navbar/>
        <div className="mt-[5rem] select-none">&nbsp;</div>
        <div className="px-16">
            <h1 className="font-soria text-[4rem] mt-5">Inventory</h1>
            <p className={`text-[1.4rem] font-lato`}>Manage your items here!</p>

            <div className="grid grid-cols-5 place-items-center w-fit gap-[4rem] mt-[3rem] select-none pl-[3%]">
                {
                    generateBox()
                }
            </div>

        </div>
        </>
    )
}

function Box({children, picturePath, position}: {children: ReactNode, position:number, picturePath?: string}){


    return (
        <div className="bg-[#D9D9D9] border-[#6E6E6E] border-solid border-2 w-[7rem] h-[7rem]" onDrop={(e) => {console.log("from",JSON.parse(e.dataTransfer.getData('application/json')).position, "to", position)}} onDragStart={(e)=>{e.dataTransfer.setData("application/json", JSON.stringify({position:position}))}} onDragOver={(e)=>{e.preventDefault()}} draggable={true}>
            {children}
        </div>
    )
}