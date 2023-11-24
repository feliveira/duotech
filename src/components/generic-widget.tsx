"use client"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger} from "./ui/popover"
import { useState } from "react"

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
    const [isOpen, setIsOpen] = useState( false );

    const handleMouseEnter = ( ) => {
        setIsOpen( true )
    };

    const handleMouseLeave = () => {
        setIsOpen( false );
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Popover open={isOpen} onOpenChange={setIsOpen} defaultOpen={true}>
                <PopoverTrigger asChild>
                <div className={cn("cursor-default group flex items-center lg:hover:bg-neutral-100 rounded-lg px-2 py-1", isActive ? color : "text-gray-600") }>
                    <Icon className={cn("w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8", isActive ? iconFill : "fill-gray-500" )} />
                    { value != null && (
                        <p className="text-xs lg:text-sm xl:text-lg ml-2 font-medium">
                            {value}
                        </p>
                    )}
                </div>
                </PopoverTrigger>
                <PopoverContent className="w-screen mt-3 md:mt-0 md:w-80">
                    <div>
                        {children}
                    </div>
                </PopoverContent>
                </Popover>
        </div>
    )
}