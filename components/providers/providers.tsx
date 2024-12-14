// components/providers/providers.tsx
"use client"

import { SessionProvider } from "next-auth/react"
import { CurrencyProvider } from "@/context/currency-context"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}