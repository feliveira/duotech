/* eslint-disable react/no-unescaped-entities */
"use client"

import { Heart, HeartCrack, X } from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/app/ui/alert-dialog";
import { useState } from "react";

interface LessonBarProps {
    progress: number,
    color: string,
    lives: number,
    lang: {
        title: string,
        description: string,
        keep: string,
        end: string
    }
}


export default function LessonBar( { progress = -1, color, lives, lang } : LessonBarProps )
{
    const router = useRouter( )

    const [isOpen, setIsOpen] = useState( false );

    const handleCancelLesson = ( action?: string ) => {

        if( action === "keep" )
        {
            setIsOpen( false )
            return
        }

        if( action === "end" || progress < 0 )
        {
            router.push("/learn")
            return
        }

        setIsOpen( true )

    }

    return( 
        <div className="w-full flex items-center justify-center space-x-5">
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger><X className="text-neutral-400 w-8 h-8" /></AlertDialogTrigger>
                <AlertDialogContent className="max-w-[400px] w-[90%]">
                    <AlertDialogHeader className="text-center flex flex-col items-center">
                        <HeartCrack className="text-fireant fill-cardinal mx-auto w-16 h-16 my-4" />
                        <AlertDialogTitle className="text-2xl text-eel">{lang.title}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-eel text-base">
                            {lang.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="flex flex-col items-center mx-auto space-y-2 w-full">
                            <AlertDialogAction onClick={( ) => handleCancelLesson( "keep" )} className="mt-2 bg-whale hover:bg-macaw shadow-[0px_4px_0px_0px_#168DC5] active:shadow-none active:translate-y-1 text-white text-lg rounded-xl px-4 py-6 mx-auto w-full max-w-[400px] uppercase">
                                {lang.keep}
                            </AlertDialogAction>
                            <AlertDialogCancel onClick={( ) => handleCancelLesson( "end" )} className="text-fireant text-lg border-none mx-auto w-full max-w-[400px] hover:text-fireant uppercase">
                                {lang.end}
                            </AlertDialogCancel>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Progress color={color} className={cn("w-[60%] bg-swan")} value={ progress } />
            <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 fill-cardinal text-fireant" />
                <p className="text-lg ml-2 font-medium text-fireant">{lives}</p>
            </div>
        </div>
    )
}