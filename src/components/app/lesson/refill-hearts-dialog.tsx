/* eslint-disable react/no-unescaped-entities */
"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/app/ui/alert-dialog";
import { useAppContext } from "@/hooks/useAppContext";
import { Coffee, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RefillLangType {
    title: string,
    main_description: string,
    secondary_description: string,
    coffees: string,
    lives: string,
    button: {
        continue: string,
        refill: string,
        cancel: string,
    }
}

export default function RefillHeartsDialog( { lang } : { lang: RefillLangType } )
{
    const router = useRouter( )
    const { lives, setLives, coffees, setCoffees } = useAppContext( )
    const [isShowingGiveLives, setIsShowingGiveLives] = useState( false )

    const reffilHearts = ( ) => {
        if( coffees >= 500 )
        {
            setCoffees( coffees => coffees - 500 )
            setLives( 5 )
            return
        }

        setIsShowingGiveLives( true )
    }

    const giveLives = ( ) => {
        setLives( 3 )
        setCoffees( coffees => coffees + 100 )
    }

    return ( 
        <>
        {
            lives === 0 &&
            <AlertDialog open={true}>
                <AlertDialogContent className="w-[90%]">
                    <AlertDialogHeader className="text-center flex flex-col items-center">
                    <AlertDialogTitle className="text-2xl text-neutral-800">{lang.title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-neutral-600 text-base">
                        {isShowingGiveLives ? 
                        <div className="flex flex-col items-center justify-center">
                            <p>{lang.secondary_description}</p>
                            <p className="text-blue-600 font-semibold mt-4 text-lg">+100 {lang.coffees}</p>
                            <p className="text-red-600 font-semibold mb-2 text-lg">+3 {lang.lives}</p> 
                        </div>
                        : 
                        `${lang.main_description}`
                        }
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {
                            isShowingGiveLives ?
                            <AlertDialogAction onClick={giveLives} className="mt-2 bg-green-500 hover:bg-green-600 shadow-[0px_4px_0px_0px_#15803d] active:shadow-none active:translate-y-1 text-white text-lg rounded-xl px-4 py-6 mx-auto w-full max-w-[400px] uppercase">
                                {lang.button.continue}
                            </AlertDialogAction>
                            :
                            <div className="flex flex-col items-center mx-auto space-y-2 w-full">
                                <AlertDialogAction onClick={reffilHearts} className="flex justify-between mt-2 bg-white hover:bg-white hover:scale-[1.02] transition-all shadow-[0px_4px_0px_0px_#E5E5E5] border active:shadow-none active:translate-y-1 text-neutral-800 rounded-xl px-4 py-6 mx-auto w-full max-w-[400px] uppercase">
                                    <div className="flex items-center space-x-2">
                                        <Heart className="w-4 h-4 fill-red-500 text-red-600" />
                                        <p>{lang.button.refill}</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Coffee className="w-4 h-4 fill-blue-500 text-blue-600" />
                                        <p className="text-blue-600">{(5 - lives) * 100}</p>
                                    </div>
                                </AlertDialogAction>
                                <AlertDialogCancel onClick={( ) => router.push("/learn")} className="text-red-600 border-none mx-auto w-full max-w-[400px] hover:text-red-600 uppercase">
                                    {lang.button.cancel}
                                </AlertDialogCancel>
                            </div>
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        }
        </>
    )
}