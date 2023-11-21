"use client"

import { cn } from "@/lib/utils"
import { Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const routes = [
    { label: "Learn", icon: Home, href: "/learn", color: "text-darkBlue"},
]

export default function Navbar( ) {

    const pathName = usePathname( )

    return (
        <div className="fixed bottom-0 lg:inset-y-0 lg:space-y-4 py-2 flex lg:py-6 lg:flex-col w-full lg:w-fit border-t border-t-neutral-200 lg:border-t-0 lg:border-r lg:border-r-neutral-200 lg:h-full bg-white items-center lg:items-start justify-center">
            <div className="px-3 py-2 flex-1">
                <Link href={"/learn"} className="hidden lg:flex w-full px-4 py-1 mb-4">
                    <p className="lg:hidden font-medium text-darkBlue text-3xl">dT</p>
                    <p className="hidden lg:flex font-medium text-darkBlue text-3xl">duotech</p>
                </Link>
                <div className="space-x-4 lg:space-x-0 lg:space-y-1 flex lg:flex-col h-full items-center justify-center lg:justify-start">
                    {routes.map(route => (
                        <Link href={route.href} key={route.href} className={cn("flex p-3 justify-center lg:justify-start rounded-xl transition-all delay-100", pathName === route.href ? "border-[3px] border-darkBlue bg-lightBlue text-darkBlue" : "hover:bg-neutral-200 text-gray-600" )} >
                            <div className="flex items-center lg:w-40">
                                <route.icon className={cn("h-5 w-5 lg:w-6 lg:h-6 lg:mr-4", route.color)} />
                                <p className="hidden lg:flex text-sm uppercase font-medium">{route.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}