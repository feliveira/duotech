"use client"

import CoffeesWidget from "./coffees-widget"
import LivesWidget from "./lives-widget"
import StreakWidget from "./streak-widget"

export default function WidgetBar( ) {
    return (
        <div className="bg-white fixed right-0 xl:right-40 top-0 md:inset-y-0 py-2 flex md:flex-col w-full md:w-fit border-b border-b-neutral-200 md:border-t-0 md:h-full items-center lg:items-start">
            <div className="px-3 py-2 lg:py-6 flex-1">
                <div className="md:space-x-4 flex items-center justify-between md:justify-start">
                    <StreakWidget />
                    <CoffeesWidget />
                    <LivesWidget />
                </div>
            </div>
        </div>
    )
}