import LessonContainer from "@/components/app/lesson/lesson-container";
import { Progress } from "@/components/app/ui/progress";
import { cn } from "@/lib/utils";
import { Heart, X } from "lucide-react";

export default function Home() {
  return (
    <>
        <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-white flex flex-col items-center pt-16">
            <LessonContainer />
        </div>
    </>
  )
}
