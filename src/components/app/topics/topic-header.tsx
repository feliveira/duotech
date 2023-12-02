import { cn } from "@/lib/utils"
import { BookText } from "lucide-react"
import Link  from "next/link"


interface TopicHeaderProps {
    title: string, 
    description: string,
    guideHref?: string, 
    bgColor: string,
    secondaryBgColor: string
}


export default function TopicHeader( { title, description, guideHref, bgColor, secondaryBgColor } : TopicHeaderProps )
{
    return (     
        <div className={cn("w-full text-white md:rounded-xl px-4 py-6 flex items-center justify-between", bgColor)}>
            <div className="flex flex-col">
                <p className="font-bold text-lg lg:text-xl mb-2">{ title }</p>
                <p className="text-sm lg:text-base font-thin">{ description }</p>
            </div>
            {
                guideHref !== null && (
                    <Link href={guideHref ?? ""} className={cn("px-6 py-4 rounded-xl flex items-center text-white transition-all hover:opacity-80 border border-[#404040] shadow-[0px_2px_0px_0px_#404040] active:shadow-none active:translate-y-1", secondaryBgColor)}>
                        <BookText className="w-4 h-4 lg:w-6 lg:h-6 mr-3 text-white" />
                        <p className="text-xs lg:text-sm font-medium uppercase">Guidebook</p>
                    </Link>
                )
            }
        </div>
    )
}