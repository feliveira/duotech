'use client'

import { AppContextType, StreakType } from "@/types/app-context-type";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext<AppContextType | undefined>( undefined );

export function AppContextProvider({ children } : { children: React.ReactNode })
{
    const [coffees, setCoffees] = useState( 500 )
    const [lives, setLives] = useState( 5 )
    const [streak, setStreak] = useState<StreakType | null>( null )
    
    const [isInitialLoad, setIsInitialLoad] = useState( true )

    const providerValues = {
       coffees, setCoffees, 
       lives, setLives,
       streak, setStreak
    }

    useEffect(() => {
        if( !isInitialLoad )
        {
            localStorage.setItem( 'coffees', coffees.toString( ) )
            localStorage.setItem( 'lives', lives.toString( ) )
            localStorage.setItem( 'streak', JSON.stringify( streak ) )
        }
    }, [coffees, lives, streak])
    
    useEffect(() => {
    
        const storedCoffees = localStorage.getItem('coffees');
        const storedLives = localStorage.getItem('lives');
        const storedStreak = localStorage.getItem('streak');

        if ( storedCoffees ) {
            setCoffees( parseInt( storedCoffees, 10 ) );
        }

        if ( storedLives ) {
            setLives( parseInt( storedLives, 10 ) );
        }

        if ( storedStreak ) {
            const parsedStreak = JSON.parse( storedStreak );
        
            if( parsedStreak !== null )
            {
                const today = new Date( )
                const lastDoneDate = new Date( parsedStreak.lastDoneDate )
                const dateDifferenceInDays = Math.floor(
                    ( today.getTime( ) - lastDoneDate.getTime( ) ) / ( 24 * 60 * 60 * 1000 )
                )
            
                setStreak( ( dateDifferenceInDays >= 2 || dateDifferenceInDays < 0 ) ? null : parsedStreak )
            }

            setStreak( null )

        }

        setIsInitialLoad( false )
    }, [])


    return( 
        <AppContext.Provider value={ providerValues }>
            { children }
        </AppContext.Provider>
    )
}