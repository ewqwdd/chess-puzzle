import { BoardCells, CellCords } from 'entities/Board'
import { playerColor } from 'entities/Board/model/types/Board'

export enum FigureTypes {
    KNIGHT = 'knight',
    PAWN = 'pawn',
    KING = 'king',
    QUEEN = 'queen',
    BISHOP = 'bishop',
    ROOK = 'rook',
    KING_ENEMY = 'king_enemy'
}

export class Figure {

	type?: FigureTypes
	boardSize: number = 8
	getAllowed?: (cell: CellCords, board: BoardCells, kingPosition: CellCords) => CellCords[]
	getAllowedNoFilter?: (cell: CellCords, board: BoardCells) => CellCords[]
	getAttacking?: (cell: CellCords, board: BoardCells) => CellCords[]
	color: playerColor
	isAlly: boolean

	constructor(isAlly: boolean, color: playerColor) {
		this.isAlly = isAlly
		this.color = color
	}

}

export const getAllowedLineDirections = (indexes:number[][]) => 
	([row, col]: CellCords, board: BoardCells, boardSize: number) => {
		const allowed: CellCords[] = []
		for(const [indexI, indexJ] of indexes){
			let i = row+indexI
			let j = col+indexJ
			while ((i<boardSize && i>=0)
            && (j<boardSize && j>=0)) {
				allowed.push([i, j])
				if(board[i][j]?.figure) {
					if(board[i][j].figure?.isAlly === board[row][col].figure?.isAlly) {
						allowed.pop()
					}
					break
				}
				i+=indexI
				j+=indexJ
			}
		}
		return allowed
	}

