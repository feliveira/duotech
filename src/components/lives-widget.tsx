import { Heart } from "lucide-react";
import { Widget, WidgetContent } from "./widget";

export default function LivesWidget( )
{
    return (
        <Widget>
            <WidgetContent 
            icon={Heart} 
            color="text-red-500"
            value={5}
            isActive
            />
        </Widget>
    )
}