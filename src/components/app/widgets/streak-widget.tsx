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
        iconFill="fill-lion"
        color="text-fox"
        value={ streak?.value ?? 0 }
        isActive={ isStreakActive }
        >
            <div className="flex space-x-4 items-center justify-center">
                <div className="flex flex-col">
                    <p className={cn("font-semibold text-xl", isStreakActive && "text-fox")}>{lang.title}</p>
                    <p className="text-sm">{ streak?.value ?? 0 } {lang.description}</p>
                </div>
                <div className={cn("p-4 rounded-full border-4", isStreakActive ? "border-fox" : "border-eel" )}>
                    <Flame className={cn("w-8 h-8", isStreakActive ? "fill-lion text-fox" : "fill-wolf text-eel")} />
                </div>
            </div>
        </GenericWidget>
    )
}