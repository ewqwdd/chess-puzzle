import { BoardCells, CellCords, playerColor } from 'entities/Board'
import { Figure, FigureTypes } from './Figure'

const indexes = [
	[1, 1],
	[1, -1],
	[-1, -1],
	[-1, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
	[0, 1]
]

export const buildGetAllowedKing = (indexes:number[][]) => 
	([row, col]: CellCords, board: BoardCells, boardSize: number, isAlly: boolean) => {
		const allowed: CellCords[] = []
		for(const [indexI, indexJ] of indexes){
			const i = row+indexI
			const j = col+indexJ
			if ((i<boardSize && i>=0) && (j<boardSize && j>=0)) {
				const cellToCheck = board[i][j]
				if(cellToCheck.figure?.isAlly !== isAlly &&
					(cellToCheck.atacked.length==0 || 
                    cellToCheck.atacked.every(elem => elem.isAlly === isAlly))){
					allowed.push([i, j])
				}  
			}
		}
		return allowed
	}

const getAllowedKing = buildGetAllowedKing(indexes)

export class King extends Figure {
	constructor(isAlly: boolean, color: playerColor) {
		super(isAlly, color)
		this.type = FigureTypes.KING
	}
	getAllowed = ([row, col]: CellCords, board: BoardCells,) => getAllowedKing([row, col], board, this.boardSize, this.isAlly)
	getAttacking = this.getAllowed
}


