"use client"

import { cn } from "@/lib/utils"
import { Home, Bird } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const routes = [
    { label: "Learn", icon: Home, href: "/learn", color: "text-darkBlue"},
]

export default function Navbar( ) {

    const pathName = usePathname( )

    return (
        <div className="fixed bottom-0 md:inset-y-0 md:space-y-4 py-2 flex md:py-6 md:flex-col w-full md:w-fit border-t border-t-neutral-200 md:border-t-0 md:border-r md:border-r-neutral-200 md:h-full bg-white items-center md:items-start justify-center">
            <div className="px-3 py-2 flex-1">
                <Link href={"/learn"} className="hidden md:flex w-full px-4 py-1 mb-4">
                    <Bird className="xl:hidden text-darkBlue fill-darkBlue w-8 h-8" />
                    {/* <p className="xl:hidden font-medium text-darkBlue text-3xl">dT</p> */}
                    <p className="hidden xl:flex font-medium text-darkBlue text-3xl">duotech</p>
                </Link>
                <div className="space-x-4 md:space-x-0 md:space-y-1 flex md:flex-col h-full items-center justify-center md:justify-start">
                    {routes.map(route => (
                        <Link href={route.href} key={route.href} className={cn("flex p-3 justify-center md:justify-start rounded-xl transition-all delay-100", pathName === route.href ? "border-[3px] border-darkBlue bg-lightBlue text-darkBlue" : "hover:bg-neutral-200 text-gray-600" )} >
                            <div className="flex items-center xl:w-40">
                                <route.icon className={cn("h-5 w-5 lg:w-6 lg:h-6 xl:mr-4", route.color)} />
                                <p className="hidden xl:flex text-sm uppercase font-medium">{route.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}