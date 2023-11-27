import { Progress } from "@/components/app/ui/progress";
import { cn } from "@/lib/utils";
import { Heart, X } from "lucide-react";

export default function Home() {
  return (
    <>
        <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-white flex flex-col items-center pt-16">
            <div className="w-full flex items-center justify-center space-x-5">
                <X className="text-neutral-400 w-8 h-8" />
                <Progress color="bg-darkBlue" className={cn("w-[60%] bg-neutral-200")} value={-1} />
                <div className="flex items-center space-x-2">
                    <Heart className="w-8 h-8 fill-red-500 text-red-600" />
                    <p className="text-lg ml-2 font-medium text-red-600">5</p>
                </div>
            </div>
        </div>
    </>
  )
}
