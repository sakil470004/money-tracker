// components/dashboard/navbar.tsx
"use client"

import { UserCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { ModeToggle } from "@/components/mode-toggle"
import { CurrencySelector } from "@/components/dashboard/currency-selector"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center p-4 border-b">
      <div className="flex flex-1 items-center gap-x-4">
        <UserCircle className="h-8 w-8" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {session?.user?.name || 'User'}
          </span>
          <span className="text-xs text-gray-500">
            {session?.user?.email}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <CurrencySelector />
        <ModeToggle />
      </div>
    </div>
  )
}