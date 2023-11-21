import { Flame } from "lucide-react";
import { Widget, WidgetContent } from "./widget";

export default function StreakWidget( )
{
    return (
        <Widget>
            <WidgetContent 
            icon={Flame} 
            color="text-orange-500"
            value={0}
            isActive={false}
            />
        </Widget>
    )
}