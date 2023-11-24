import { Coffee } from "lucide-react";
import GenericWidget from "./generic-widget";

export default function CoffeesWidget( )
{
    const coffees = 500

    return (
        <GenericWidget 
        icon={ Coffee } 
        iconFill="fill-blue-500"
        color="text-blue-600"
        value={ coffees }
        isActive
        >
            <div className="flex space-x-4 items-center justify-center">
                <div className="p-4 rounded-full border-4 border-blue-600">
                    <Coffee className="w-8 h-8 fill-blue-500 text-blue-600" />
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-xl">Coffees</p>
                    <p className="text-sm">You have { coffees } coffees.</p>
                </div>
            </div>
        </GenericWidget>
    )
}