"use client"

import CoffeesWidget from "./coffees-widget"
import LivesWidget from "./lives-widget"
import StreakWidget from "./streak-widget"

interface GenericWidgetLangType {
    title: string,
    description: string[]
}

interface WidgetLangType {
    coffees: GenericWidgetLangType
    streak: GenericWidgetLangType,
    lives: GenericWidgetLangType
}

export default function WidgetBar( { lang } : { lang: WidgetLangType } ) {
    return (
        <div className="select-none bg-white fixed right-0 xl:right-40 top-0 md:inset-y-0 py-2 flex md:flex-col w-full md:w-fit border-b border-b-neutral-200 md:border-t-0 h-20 md:h-full items-center lg:items-start">
            <div className="px-3 py-2 lg:py-6 flex-1">
                <div className="md:space-x-4 flex items-center justify-between md:justify-start">
                    <StreakWidget lang={lang.streak} />
                    <CoffeesWidget lang={lang.coffees} />
                    <LivesWidget lang={lang.lives} />
                </div>
            </div>
        </div>
    )
}