import { Figure, FigureTypes } from 'entities/Figure'

export type atacked = {
    type: FigureTypes
    isAlly: boolean
}

export interface Cell {
    figure?: Figure
    atacked: atacked[]
}

export enum playerColor {
    BLACK = 'black',
    WHITE = 'white'
}

export type BoardCells = Cell[][]

export type CellCords = [number, number]

export interface BoardSchema {
    board: BoardCells
    current?: CellCords
    enabled?: CellCords[]
    isLoading?: boolean
    allyKingPos: CellCords
    enemyKingPos: CellCords
    allyKingAtacked?: boolean
    enemyKingAtacked?: boolean
    puzzle?: Move[]
    failed?: boolean
    playerColor?: playerColor
    lastMove?: Move
    blocked?: boolean
    id?: number
    error?: string
    saved: {
        isLoading?: boolean
        error?: string
        isSuccess?: boolean
    }
}

export interface FigurePosition {
    figure: FigureTypes
    isAlly: boolean
    position: CellCords
}

export interface Move {
    move: [CellCords, CellCords]
    killed?: FigureTypes 
}

export interface Puzzle {
    board: FigurePosition[]
    puzzle: Move[]
    id: number
    createdAt?: Date
}