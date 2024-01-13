"use client"
import { useAppContext } from "@/hooks/useAppContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import US from "/public/static/flags/us.svg"
import BR from "/public/static/flags/br.svg"
import IDLE from "/public/static/character/idle.png"
import Image from "next/image"
import { Coffee, Flame, Heart } from "lucide-react"

interface HomeFlowLangType {
    lang: string,
    noStreakTitle: string,
    streakTitle: string
}

export default function HomeFlowContainer( { lang } : { lang: HomeFlowLangType } )
{
    const { streak, coffees, lives } = useAppContext( )

    return(
        <div className="flex flex-col items-center w-full">
            <Image src={IDLE} className="h-36 object-cover min-w-[112px] w-40" alt="" />
            <h1 className={cn("text-2xl font-semibold text-center mt-4", streak === null ? "mb-12" : "mb-2")}>{ streak === null ? lang.noStreakTitle : lang.streakTitle }</h1>
            {
                streak != null &&
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex items-center gap-1 cursor-default">
                        <Flame className={cn("w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8", streak.value > 0 ? "fill-lion text-fox" : "fill-wolf" )} />
                        <p className={cn("text-xs lg:text-sm xl:text-lg font-medium", streak.value > 0 && "text-fox")}>
                            {streak.value}
                        </p>
                    </div>

                    <div className="flex items-center gap-1 cursor-default">
                        <Coffee className={cn("w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8", coffees > 0 ? "fill-macaw text-whale" : "fill-wolf" )} />
                        <p className={cn("text-xs lg:text-sm xl:text-lg font-medium", coffees > 0 && "text-whale")}>
                            {coffees}
                        </p>
                    </div>

                    <div className="flex items-center gap-1 cursor-default">
                        <Heart className={cn("w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8", lives > 0 ? "fill-cardinal text-fireant" : "fill-wolf" )} />
                        <p className={cn("text-xs lg:text-sm xl:text-lg font-medium", lives > 0 && "text-fireant")}>
                            {lives}
                        </p>
                    </div>
                </div>
            }
            <div className={cn("flex flex-col w-full gap-6", lang.lang === "pt" && "flex-col-reverse")}>
                <Link href="/en/learn" locale="en">
                    <div className="flex items-center border w-[90%] max-w-[500px] mx-auto p-2 gap-2 rounded-md hover:scale-105 transition-all">
                        <Image src={US} className="w-12 h-8" alt="USA" />
                        <p className="font-semibold mx-auto">Senior Developer</p>
                    </div>
                </Link>
                <Link href="/pt/learn" locale="pt">
                    <div className="flex items-center border w-[90%] max-w-[500px] mx-auto p-2 gap-2 rounded-md hover:scale-105 transition-all">
                        <Image src={BR} className="w-12 h-8" alt="Brazil" />
                        <p className="font-semibold mx-auto">Desenvolvedor Sênior</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}