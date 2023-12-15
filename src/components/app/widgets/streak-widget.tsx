import { Flame } from "lucide-react";
import GenericWidget from "./generic-widget";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/hooks/useAppContext";

export default function StreakWidget( { lang } : { lang: {title: string, description: string[]} } )
{
    const { streak } = useAppContext( )
    const isStreakActive = streak != null && streak?.value > 0

    return (
        <GenericWidget
        icon={ Flame } 
        iconFill="fill-orange-500"
        color="text-orange-600"
        value={ streak?.value ?? 0 }
        isActive={ isStreakActive }
        >
            <div className="flex space-x-4 items-center justify-center">
                <div className="flex flex-col">
                    <p className={cn("font-semibold text-xl", isStreakActive && "text-orange-600")}>{lang.title}</p>
                    <p className="text-sm">{ streak?.value ?? 0 } {lang.description}</p>
                </div>
                <div className={cn("p-4 rounded-full border-4", isStreakActive ? "border-orange-600" : "border-gray-600" )}>
                    <Flame className={cn("w-8 h-8", isStreakActive ? "fill-orange-500 text-orange-600" : "fill-gray-500 text-gray-600")} />
                </div>
            </div>
        </GenericWidget>
    )
}