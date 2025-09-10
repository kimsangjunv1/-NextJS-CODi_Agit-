"use client"

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const AuthCheckComponent = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            { children }
        </SessionProvider>
    )
}

export default AuthCheckComponent