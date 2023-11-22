import { Coffee } from "lucide-react";
import GenericWidget from "./generic-widget";

export default function CoffeesWidget( )
{
    return (
        <GenericWidget 
        icon={Coffee} 
        iconFill="fill-blue-500"
        color="text-blue-500"
        value={500}
        isActive
        >

        </GenericWidget>
    )
}