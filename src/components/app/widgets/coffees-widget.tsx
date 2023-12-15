import { Coffee } from "lucide-react";
import GenericWidget from "./generic-widget";
import { useAppContext } from "@/hooks/useAppContext";

export default function CoffeesWidget( { lang } : { lang: {title: string, description: string[]} } )
{
    const { coffees } = useAppContext( )

    return (
        <GenericWidget 
        icon={ Coffee } 
        iconFill="fill-blue-500"
        color="text-blue-600"
        value={ coffees }
        isActive={ coffees > 0 }
        >
            <div className="flex space-x-4 items-center justify-center">
                <div className="p-4 rounded-full border-4 border-blue-600">
                    <Coffee className="w-8 h-8 fill-blue-500 text-blue-600" />
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-xl">{lang.title}</p>
                    <p className="text-sm">{lang.description[0]} { coffees } {lang.description[1]}</p>
                </div>
            </div>
        </GenericWidget>
    )
}