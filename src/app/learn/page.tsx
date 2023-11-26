import Navbar from "@/components/navbar";
import Topic from "@/components/topic";
import TopicHeader from "@/components/topic-header";
import WidgetBar from "@/components/widget-bar";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="w-full md:max-w-[400px] lg:max-w-[500px] xl:max-w-[560px] 2xl:max-w-[640px] flex flex-col items-center md:ml-32 lg:ml-40 xl:ml-60 2xl:ml-96 my-14 md:my-10 space-y-6">
        <TopicHeader 
        bgColor="bg-[#3486FF]" 
        secondaryBgColor="bg-[#418EFF]"
        guideHref=""
        title="Unit 1" 
        description="Discussing pertinent topics"
        />
        <Topic 
        title="Discuss pertinent topics"
        color="bg-darkBlue"
        description="Lesson 1 of 1"
        >
          <div className="p-4">
            <p className="font-semibold text-lg">All you need to know</p>
            <p className="font-light mb-4">Lesson 1 of 1</p>
            <button className={cn("bg-white w-full py-3 rounded-2xl flex items-center mx-auto text-white transition-all hover:opacity-80 shadow-[0px_4px_0px_0px_#404040] active:shadow-none active:translate-y-1")}>
                <p className="text-sm lg:text-lg font-semibold uppercase text-darkBlue mx-auto">Start +10 xp</p>
            </button>
          </div>
        </Topic>
      </main>

      <WidgetBar />
    </>
  )
}
