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
            <div className={cn("group flex items-center lg:hover:bg-neutral-100 rounded-lg px-2 py-1", isActive ? color : "text-gray-400") }>
                <Icon className={cn("w-5 h-5 lg:w-6 lg:h-6")} />
                { value != null && (
                    <p className="text-xs lg:text-sm ml-2 font-medium">
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