import Navbar from "@/components/navbar";
import Topic from "@/components/topic";
import TopicHeader from "@/components/topic-header";
import WidgetBar from "@/components/widget-bar";

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
        title="All you need to know"
        description="Lesson 1 of 1"
        backgroundColor="bg-darkBlue"
        textColor="text-darkBlue"
        isActive={true}
        isFinished={true}
        />  
      </main>

      <WidgetBar />
    </>
  )
}
