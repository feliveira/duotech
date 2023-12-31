import HomeFlowContainer from "@/components/app/home-flow-container"
import { getDictionary } from "@/get-dictionaires"
import { Locale } from "@/i18n-config"

interface PageParams {
    params: {
        lang: Locale
    }
}

export default async function Home( { params: { lang } } : PageParams ) {

    const dictionary = await getDictionary( lang )

    return (
        <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-white flex flex-col items-center pt-16">
            <HomeFlowContainer lang={{...dictionary.home, lang}} />
        </div>
    )

}
