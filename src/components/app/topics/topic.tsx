
import { Star } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface TopicProps {
    title: string, 
    description: string,
    start: string,
    backgroundColor: string,
    textColor: string, 
    lang: string
}

export default function Topic( {title, description, start, backgroundColor, textColor, lang} : TopicProps )
{
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <button className={cn("border border-whale text-white transition-all flex items-center justify-center w-[70px] h-[65px] rounded-full shadow-[0px_7px_0px_0px_#168DC5] active:shadow-none active:translate-y-1", backgroundColor)}>
                        <Star className="w-10 h-7 fill-white" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="mt-3 md:w-72 p-0 rounded-xl overflow-hidden">
                    <div className={cn("p-4 text-white", backgroundColor)}>
                        <p className="font-semibold text-lg">{ title }</p>
                        <p className="font-light mb-4">{ description }</p>
                        <Link href={lang === "pt" ? "/pt/lesson" : "/en/lesson"} prefetch={false} className={cn("border border-whale bg-white w-full py-3 rounded-2xl flex items-center mx-auto text-white transition-all hover:bg-iguana shadow-[0px_4px_0px_0px_#168DC5] active:shadow-none active:translate-y-1")}>
                            <p className={cn("text-sm lg:text-base font-semibold uppercase mx-auto", textColor)}>{ start }</p>
                        </Link>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
        
    )
}