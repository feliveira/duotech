"use client"

import CoffeesWidget from "./credits-widget"
import LivesWidget from "./lives-widget"
import StreakWidget from "./streak-widget"

export default function WidgetBar( ) {
    return (
        <div className="bg-white fixed right-0 lg:right-28 xl:right-40 top-0 lg:inset-y-0 py-2 flex lg:flex-col w-full lg:w-fit border-b border-b-neutral-200 lg:border-t-0 lg:h-full items-center lg:items-start">
            <div className="px-3 py-2 lg:py-6 flex-1">
                <div className="lg:space-x-4 flex items-center justify-between lg:justify-start">
                    <StreakWidget />
                    <CoffeesWidget />
                    <LivesWidget />
                </div>
            </div>
        </div>
    )
}