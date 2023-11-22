import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface WidgetProps {
    icon: LucideIcon,
    iconFill: string,
    value?: number,
    color: string,
    isActive: boolean,
    children?: React.ReactNode
}
export default function GenericWidget ( { icon: Icon, iconFill, value, color, isActive, children} : WidgetProps )
{

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={cn("group flex items-center lg:hover:bg-neutral-100 rounded-lg px-2 py-1", isActive ? color : "text-gray-400") }>
                <Icon className={cn("w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8", isActive ? iconFill : "fill-gray-400" )} />
                { value != null && (
                    <p className="text-xs lg:text-sm xl:text-lg ml-2 font-medium">
                        {value}
                    </p>
                )}
            </div>
        </div>
    )
}