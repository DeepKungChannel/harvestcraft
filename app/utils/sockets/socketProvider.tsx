"use client"
import React, { createContext, useEffect, useState } from "react"
import { Socket } from "socket.io"
import {io} from 'socket.io-client'
import { SocketApiAck } from "./socketTypes"
import Backend from "../backendRestAPI/backend"

export const SocketContext = createContext<Socket | undefined>(undefined)
// socket connection context
export const SocketSignedin = createContext<boolean>(false)
export const InternetConnection = createContext<boolean>(false)

export default function SocketProvider({children}: {children: React.ReactNode}) {
    const [socket, setsocket] = useState<Socket | undefined>(undefined)
    const [socketSignedin, setsocketSignedin] = useState<boolean>(false)
    const [internetConnection, setInternetconnection] = useState<boolean>(false)

    async function disconnectHandle() {
        const backend = new Backend()
        const api_response = await backend.ping()
        if (api_response.status == 200) {
            setInternetconnection(true)
            setsocketSignedin(false)
        }
        else {
            setInternetconnection(false)
            setsocketSignedin(false)
        }
    }

    async function SocketInit() {

        const backend = new Backend()
        const api_response = await backend.auth.fetch()
        
        if (api_response.status == 200) {
            const session_id = api_response.response.session
            const newSocket = io(`/`,{ autoConnect: true, path: "/api/harvestcraft/ws/socket.io", extraHeaders: { authentication: session_id }})
    
            newSocket.on("connection", (val: SocketApiAck) => {
                if (val.status == 200) {
                    setsocketSignedin(true)
                    setInternetconnection(true)
                    console.log("Connected to backend server")
                }
            })
            
            newSocket.on("disconnect", () => {
                disconnectHandle()
            })

            setsocket(newSocket as any)
        }
        

    }

    useEffect(() => {
        SocketInit()
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            <SocketSignedin.Provider value={socketSignedin}>
            <InternetConnection.Provider value={internetConnection}>
                {children}
            </InternetConnection.Provider>
            </SocketSignedin.Provider>
        </SocketContext.Provider>
    )
}