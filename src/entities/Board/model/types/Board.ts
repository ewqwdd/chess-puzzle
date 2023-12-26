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
}

export interface FigurePosition {
    figure: Figure
    position: CellCords
}