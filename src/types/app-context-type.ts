export interface StreakType {
    value: number,
    lastDoneDate: Date
}

export interface AppContextType {
    coffees: number,
    setCoffees: React.Dispatch<React.SetStateAction<number>>,
    lives: number,
    setLives: React.Dispatch<React.SetStateAction<number>>,
    streak: StreakType | null,
    setStreak: React.Dispatch<React.SetStateAction<StreakType | null>>
}