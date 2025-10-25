"use client"

import { Home, User, CreditCard, Headphones } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "My account", href: "/personal/account", icon: User },
  { name: "My plan", href: "/personal/plan", icon: CreditCard },
  { name: "Support", href: "/personal/support", icon: Headphones },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col p-4 space-y-2">
      {navItems.map(({ name, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100",
            pathname === href && "bg-gray-100 text-primary"
          )}
        >
          <Icon className="w-4 h-4" />
          {name}
        </Link>
      ))}
    </div>
  )
}
