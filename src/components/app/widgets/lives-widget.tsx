import { Coffee, Heart } from "lucide-react";
import GenericWidget from "./generic-widget";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/hooks/useAppContext";

export default function LivesWidget( { lang } : { lang: {title: string, description: string[]} } )
{
    const { lives, setLives, coffees, setCoffees } = useAppContext( )

    const refillHearts = ( ) => {
        const coffeesValue = (5 - lives) * 100
        if( coffees >= coffeesValue )
        {
            setLives( 5 )
            setCoffees( coffees => coffees - coffeesValue )
        }
    }

    return (
        <GenericWidget 
        icon={ Heart } 
        iconFill="fill-red-500"
        color="text-red-600"
        value={ lives }
        isActive={ lives > 0 }
        >
        <div className="flex flex-col items-center justify-center">
            <p className="font-semibold text-xl">{lang.title}</p>
            <div className="flex items-center mt-2">
                {Array.from(Array(5).keys()).map(life => (
                    <Heart key={life} className={cn( lives > life ? "text-red-600 fill-red-500" : "text-gray-600 fill-gray-500" )} />
                ))}
            </div>
            {lives < 5 && (
            <button onClick={refillHearts} className="mt-4 uppercase bg-white hover:bg-neutral-100 w-full max-w-[400px] py-3 px-4 rounded-xl flex items-center justify-between border border-neutral-200 transition-all shadow-[0px_1px_0px_0px_#E5E5E5] active:shadow-none active:translate-y-0.5">
                <div className="flex items-center font-medium">
                    <Heart className="w-4 h-4 mr-2 text-red-600 fill-red-500" />
                    {lang.description}
                </div>
                <div className="flex items-center text-blue-600 font-medium">
                    <Coffee className="w-4 h-4 mr-2 fill-blue-500" />
                    {(5 - lives) * 100}
                </div>
            </button>)}
        </div>
        </GenericWidget>
    )
}