import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface WidgetContentProps {
    icon: LucideIcon,
    value?: number,
    color: string,
    isActive: boolean,
    children?: React.ReactNode
}

function Widget( { children } : { children: React.ReactNode } )
{
    return (
        <div className="flex flex-col justify-center">
            { children }
        </div>
    )
}

function WidgetContent( { icon: Icon, value, color, isActive, children} : WidgetContentProps )
{
    return (
        <div className="flex flex-col items-center">
            <div className={cn("group flex items-center md:hover:bg-neutral-100 rounded-xl px-2 py-1", isActive ? color : "text-gray-400") }>
                <Icon className={cn("w-5 h-5", value && "mr-3")} />
                { value != null && (
                    <p className="text-xs md:text-sm">
                        {value}
                    </p>
                )}
            </div>
            {children}
        </div>
    )
}


export {
    Widget,
    WidgetContent
}