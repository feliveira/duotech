import { Coffee } from "lucide-react";
import GenericWidget from "./generic-widget";
import { useAppContext } from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";

export default function CoffeesWidget( { lang } : { lang: {title: string, description: string[]} } )
{
    const { coffees } = useAppContext( )

    return (
        <GenericWidget 
        icon={ Coffee } 
        iconFill="fill-macaw"
        color="text-whale"
        value={ coffees }
        isActive={ coffees > 0 }
        >
            <div className="flex space-x-4 items-center justify-center">
                <div className="p-4 rounded-full border-4 border-whale">
                    <Coffee className="w-8 h-8 fill-macaw text-whale" />
                </div>
                <div className="flex flex-col">
                    <p className={cn("font-semibold text-xl", coffees > 0 ? "text-whale" : "text-eel")}>{lang.title}</p>
                    <p className="text-sm">{lang.description[0]} { coffees } {lang.description[1]}</p>
                </div>
            </div>
        </GenericWidget>
    )
}