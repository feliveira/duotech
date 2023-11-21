import { Coffee } from "lucide-react";
import { Widget, WidgetContent } from "./widget";

export default function CoffeesWidget( )
{
    return (
        <Widget>
            <WidgetContent 
            icon={Coffee} 
            color="text-blue-500"
            value={500}
            isActive
            />
        </Widget>
    )
}