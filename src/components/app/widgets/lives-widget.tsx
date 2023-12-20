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
        iconFill="fill-cardinal"
        color="text-fireant"
        value={ lives }
        isActive={ lives > 0 }
        >
        <div className="flex flex-col items-center justify-center">
            <p className={cn("font-semibold text-xl", lives > 0 ? "text-fireant" : "text-eel" )}>{lang.title}</p>
            <div className="flex items-center mt-2">
                {Array.from(Array(5).keys()).map(life => (
                    <Heart key={life} className={cn( lives > life ? "text-fireant fill-cardinal" : "text-eel fill-wolf" )} />
                ))}
            </div>
            {lives < 5 && (
            <button onClick={refillHearts} className="mt-4 uppercase bg-white hover:bg-neutral-100 w-full max-w-[400px] py-3 px-4 rounded-xl flex items-center justify-between border border-swan transition-all shadow-[0px_1px_0px_0px_#E5E5E5] active:shadow-none active:translate-y-0.5">
                <div className="flex items-center font-medium">
                    <Heart className="w-4 h-4 mr-2 text-fireant fill-cardinal" />
                    {lang.description}
                </div>
                <div className="flex items-center text-wale font-medium">
                    <Coffee className="w-4 h-4 mr-2 fill-macaw text-whale" />
                    {(5 - lives) * 100}
                </div>
            </button>)}
        </div>
        </GenericWidget>
    )
}