import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (
            <main className="w-full min-h-screen flex items-center justify-center bg-[#0d1117] text-[#e6edf3]">
                <h1 className="text-2xl font-bold">Resuming Session...</h1>
            </main>
        )
    }

    if(!user){
        return <Navigate to={'/login'} replace />
    }
    
    return children
}

export default Protected;