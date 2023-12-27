import { BoardCells, CellCords } from 'entities/Board'

export enum FigureTypes {
    KNIGHT = 'knight',
    PAWN = 'pawn',
    KING = 'king',
    QUEEN = 'queen',
    BISHOP = 'bishop',
    ROOK = 'rook',
}

export class Figure {

	type?: FigureTypes
	boardSize: number = 8
	isAlly: boolean

	constructor(isAlly: boolean) {
		this.isAlly = isAlly
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

