/* eslint-disable react/no-unescaped-entities */
"use client"

import { Heart, HeartCrack, X } from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function LessonBar( { progress = -1 } )
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
             <div onClick={( ) => handleCancelLesson( "" )}>
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger><X className="text-neutral-400 w-8 h-8" /></AlertDialogTrigger>
                    <AlertDialogContent className="max-w-[400px] w-[90%]">
                        <AlertDialogHeader className="text-center flex flex-col items-center">
                            <HeartCrack className="text-red-600 fill-red-500 mx-auto w-16 h-16 my-4" />
                            <AlertDialogTitle className="text-2xl text-neutral-800">Wait, don't go!</AlertDialogTitle>
                            <AlertDialogDescription className="text-center text-neutral-600 text-base">
                                You're right on track! If you quit now, you'll lose your progress.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <div className="flex flex-col items-center mx-auto space-y-2 w-full">
                                <AlertDialogAction onClick={( ) => handleCancelLesson( "keep" )} className="mt-2 bg-darkBlue hover:bg-blue-500 shadow-[0px_4px_0px_0px_#2563eb] active:shadow-none active:translate-y-1 text-white text-lg rounded-xl px-4 py-6 mx-auto w-full max-w-[400px] uppercase">
                                    Keep Learning
                                </AlertDialogAction>
                                <AlertDialogCancel onClick={( ) => handleCancelLesson( "end" )} className="text-red-600 text-lg border-none mx-auto w-full max-w-[400px] hover:text-red-600 uppercase">
                                    End Session
                                </AlertDialogCancel>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <Progress color="bg-darkBlue" className={cn("w-[60%] bg-neutral-200")} value={ progress } />
            <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 fill-red-500 text-red-600" />
                <p className="text-lg ml-2 font-medium text-red-600">5</p>
            </div>
        </div>
    )
}