
import { Star } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

interface TopicProps {
    title: string, 
    description: string,
    color: string, 
    children: React.ReactNode
}

export default function Topic( {title, description, color, children} : TopicProps )
{
    return (
        <Popover >
            <PopoverTrigger asChild>
                <button className={cn("transition-all flex items-center justify-center w-16 h-16 border-[3px] border-[#404040] rounded-full shadow-[0px_4px_0px_0px_#404040] active:shadow-none active:translate-y-1", color)}>
                    <Star className="w-6 h-6 fill-white text-white" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="mt-3 md:w-72 p-0 rounded-xl overflow-hidden">
                <div className={cn("text-white", color)}>
                    {children}
                </div>
            </PopoverContent>
        </Popover>
        
    )
}