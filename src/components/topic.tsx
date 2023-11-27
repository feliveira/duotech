
import { Star, Check, Lock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

interface TopicProps {
    title: string, 
    description: string,
    backgroundColor: string,
    textColor: string, 
    isFinished: boolean,
    isActive: boolean
}

export default function Topic( {title, description, backgroundColor, textColor, isActive, isFinished} : TopicProps )
{
    return (
        <button disabled={ !isActive }>
            <Popover>
                <PopoverTrigger asChild>
                    <button className={cn("text-white transition-all flex items-center justify-center w-16 h-16 border-[3px] border-neutral-700 rounded-full shadow-[0px_4px_0px_0px_#404040] active:shadow-none active:translate-y-1", isActive ? backgroundColor : "bg-neutral-200")}>
                        {
                        isFinished ? 
                        <Check strokeWidth={4} className="w-6 h-6" /> : 
                        isActive ? 
                        <Star className="w-6 h-6 fill-white" /> :
                        <Lock className="w-6 h-6 text-neutral-700" />
                        }
                    </button>
                </PopoverTrigger>
                <PopoverContent className="mt-3 md:w-72 p-0 rounded-xl overflow-hidden">
                    <div className={cn("p-4 text-white", backgroundColor)}>
                        <p className="font-semibold text-lg">{ title }</p>
                        <p className="font-light mb-4">{ description }</p>
                        {
                        isFinished ?
                        <button className={cn("bg-white w-full py-3 rounded-2xl flex items-center mx-auto text-white transition-all hover:opacity-80 shadow-[0px_4px_0px_0px_#404040] active:shadow-none active:translate-y-1")}>
                            <p className={cn("text-sm lg:text-base font-semibold uppercase mx-auto", textColor)}>Practice +5 coffees</p>
                        </button>
                        :
                        <button className={cn("bg-white w-full py-3 rounded-2xl flex items-center mx-auto text-white transition-all hover:opacity-80 shadow-[0px_4px_0px_0px_#404040] active:shadow-none active:translate-y-1")}>
                            <p className={cn("text-sm lg:text-base font-semibold uppercase mx-auto", textColor)}>Start +10 coffees</p>
                        </button>
                        }
                    </div>
                </PopoverContent>
            </Popover>
        </button>
        
    )
}