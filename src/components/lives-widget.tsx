import { Heart } from "lucide-react";
import GenericWidget from "./generic-widget";

export default function LivesWidget( )
{
    return (
        <GenericWidget 
        icon={ Heart } 
        iconFill="fill-red-500"
        color="text-red-600"
        value={ 5 }
        isActive
        >
            
        </GenericWidget>
    )
}