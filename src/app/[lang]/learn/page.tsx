import Navbar from "@/components/app/common/navbar";
import Topic from "@/components/app/topics/topic";
import TopicHeader from "@/components/app/topics/topic-header";
import WidgetBar from "@/components/app/widgets/widget-bar";
import { getDictionary } from '@/get-dictionaires'
import { Locale } from '@/i18n-config'

interface PageParams {
  params: {
    lang: Locale
  }
}

export default async function Learn( { params: {lang} } : PageParams ) {
  
  const dictionary = await getDictionary( lang )

  return (
    <>
      <Navbar routeNames={dictionary.navbar.routes} />
      <main className="w-full md:max-w-[400px] lg:max-w-[500px] xl:max-w-[560px] 2xl:max-w-[640px] flex flex-col items-center md:ml-32 lg:ml-40 xl:ml-60 2xl:ml-96 mt-20 mb-28 md:my-10 space-y-6">
        <TopicHeader 
        bgColor="bg-[#1cb0f6]" 
        title={dictionary.learn.topicHeader.title}
        description={dictionary.learn.topicHeader.description}
        />
        <Topic 
        lang={lang}
        title={dictionary.learn.topic.title}
        description={dictionary.learn.topic.description}
        start={dictionary.learn.topic.start}
        backgroundColor="bg-macaw"
        textColor="text-macaw"
        />
      </main>
      <WidgetBar lang={dictionary.widgets} />
    </>
  )
}
