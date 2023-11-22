import { Flame } from "lucide-react";
import GenericWidget from "./generic-widget";

export default function StreakWidget( )
{
    return (
        <GenericWidget 
        icon={Flame} 
        iconFill="fill-orange-500"
        color="text-orange-500"
        value={0}
        isActive={false}
        >

        </GenericWidget>
    )
}