"use client"

import { Heart, X } from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LessonBar( { progress = -1 } )
{
    const router = useRouter( )

    const handleCancelLesson = ( ) => {
        router.back()
    }

    return( 
        <div className="w-full flex items-center justify-center space-x-5">
            <button onClick={handleCancelLesson}>
                <X className="text-neutral-400 w-8 h-8" />
            </button>
            <Progress color="bg-darkBlue" className={cn("w-[60%] bg-neutral-200")} value={ progress } />
            <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 fill-red-500 text-red-600" />
                <p className="text-lg ml-2 font-medium text-red-600">5</p>
            </div>
        </div>
    )
}