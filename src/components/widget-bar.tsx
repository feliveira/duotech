"use client"

import LivesWidget from "./lives-widget"

export default function WidgetBar( ) {
    return (
        <div className="bg-white fixed right-0 top-0 md:inset-y-0 md:space-y-4 py-2 flex md:flex-col w-full md:w-fit border-b border-b-neutral-200 md:border-t-0 md:border-l md:border-l-neutral-200 md:h-full items-center md:items-start justify-center">
            <div className="px-3 py-2 flex-1">
                <div className="space-x-4 md:space-x-0 md:space-y-1 flex md:flex-col h-full items-center justify-center md:justify-start">
                    <LivesWidget />
                </div>
            </div>
        </div>
    )
}