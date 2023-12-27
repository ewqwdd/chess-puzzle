import { BoardCells, CellCords } from 'entities/Board'
import { Figure, FigureTypes } from './Figure'

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


export class King extends Figure {
	constructor(isAlly: boolean) {
		super(isAlly)
		this.type = FigureTypes.KING
	}
}


