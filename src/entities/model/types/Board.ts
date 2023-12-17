export interface Board {
    board: Cell[][]
    current?: undefined
    enabled?: CellCords[]

}

export interface Cell {
    figure?: undefined
    atacked: string[]
}

export type CellCords = [number, number]