import Navbar from "@/components/navbar";
import TopicHeader from "@/components/topic-header";
import WidgetBar from "@/components/widget-bar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center md:items-start md:pl-32 lg:pl-40 xl:pl-60 2xl:pl-96 my-14 md:my-10">
        <TopicHeader 
        bgColor="bg-[#3486FF]" 
        secondaryBgColor="bg-[#418EFF]"
        guideHref=""
        title="Unit 1" 
        description="Discussing pertinent topics"
        />
      </main>

      <WidgetBar />
    </>
  )
}
