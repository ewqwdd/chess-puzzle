import { Puzzle } from 'entities/Board'

export type SolvedPuzzle = {
    time: number
} & Puzzle

export interface StatsSchema {
    puzzles: SolvedPuzzle[]
    isLoading?: boolean
    error?: string
}