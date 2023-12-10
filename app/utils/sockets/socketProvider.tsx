"use client"
import React, { createContext, useEffect, useState } from "react"
import { Socket } from "socket.io"
import {io} from 'socket.io-client'

export const SocketContext = createContext<Socket | undefined>(undefined)

export default function SocketProvider({children}: {children: React.ReactNode}) {
    const [socket, setsocket] = useState<Socket | undefined>(undefined)

    useEffect(() => {
        const newSocket = io(`/`,{ path: "/api/harvestcraft/ws/socket.io", extraHeaders: { authentication: "64021bf8-df1e-4fb3-811c-ce8a74714cfc" }})
        newSocket.on("connect", () => {
            console.log("Connect socket io successfully")
        })

        setsocket(newSocket as any)
    }, [])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}