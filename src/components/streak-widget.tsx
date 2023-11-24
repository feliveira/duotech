import { Flame } from "lucide-react";
import GenericWidget from "./generic-widget";
import { cn } from "@/lib/utils";

export default function StreakWidget( )
{
    const streak = 0
    const isTodaysLessonDone = false

    return (
        <GenericWidget 
        icon={ Flame } 
        iconFill="fill-orange-500"
        color="text-orange-600"
        value={ streak }
        isActive={ isTodaysLessonDone }
        >
            <div className="flex space-x-4 items-center justify-center">
                <div className="flex flex-col">
                    <p className={cn("font-semibold text-xl", isTodaysLessonDone && "text-orange-600")}>Streak</p>
                    <p className="text-sm">{ streak } day streak.</p>
                </div>
                <div className={cn("p-4 rounded-full border-4", isTodaysLessonDone ? "border-orange-600" : "border-gray-600" )}>
                    <Flame className={cn("w-8 h-8", isTodaysLessonDone ? "fill-orange-500 text-orange-600" : "fill-gray-500 text-gray-600")} />
                </div>
            </div>
        </GenericWidget>
    )
}