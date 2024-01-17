import { Puzzle } from 'entities/Board'

export type SolvedPuzzle = {
    id: number
    puzzle: Puzzle
}

export interface StatsSchema {
    puzzles: SolvedPuzzle[]
    solved?: number
    averageTime?: number
    isLoading?: boolean
    error?: string
    isLoadingPuzzles?: boolean
    errorPuzzles?: string
    pagesNumber?: number
}