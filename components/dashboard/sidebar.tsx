// components/dashboard/sidebar.tsx
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  CircleDollarSign, 
  BarChart3, 
  Settings,
  LogOut 
} from "lucide-react"
import { signOut } from "next-auth/react"

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Transactions',
    icon: CircleDollarSign,
    href: '/dashboard/transactions',
    color: "text-violet-500",
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
    color: "text-pink-700",
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: "text-gray-500",
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition",
                pathname === route.href ? "bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}