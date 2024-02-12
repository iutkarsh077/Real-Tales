"use client";
import { SessionProvider } from "next-auth/react"

export default function NextJsProvider({children}) {
 
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}