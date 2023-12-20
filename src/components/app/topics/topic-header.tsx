import { cn } from "@/lib/utils"
import { BookText } from "lucide-react"
import Link  from "next/link"


interface TopicHeaderProps {
    title: string, 
    description: string,
    bgColor: string
}


export default function TopicHeader( { title, description, bgColor } : TopicHeaderProps )
{
    return (     
        <div className={cn("w-full text-white md:rounded-xl px-4 py-6 flex items-center justify-between", bgColor)}>
            <div className="flex flex-col">
                <p className="font-semibold text-lg lg:text-xl mb-2">{ title }</p>
                <p className="text-sm lg:text-base font-thin">{ description }</p>
            </div>
            
        </div>
    )
}