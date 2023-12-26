import { BoardCells, CellCords, playerColor } from 'entities/Board'
import { Figure, FigureTypes } from './Figure'
import { checkIfCheckmate } from '../helpers/checkIfCheckmate'

export class Pawn extends Figure {
	constructor(isAlly: boolean, color: playerColor) {
		super(isAlly, color)
		this.type = FigureTypes.PAWN
	}
	getAllowedNoFilter = ([row, col]: CellCords, board: BoardCells ) => {
		const allowed: CellCords[] = []
		if(this.isAlly && row<=0) return []
		if(!this.isAlly && row>=this.boardSize-1) return []
		const nextRow = this.isAlly ? row-1 : row + 1
		if(!board[nextRow][col].figure) {
			allowed.push([nextRow, col])
			if (row==6 && !board[nextRow-1][col].figure) {
				allowed.push([nextRow-1, col])
			}
		}
		const nextLeft = board[nextRow][col-1].figure
		const nextRight = board[nextRow][col+1].figure

		if(col>0 && nextLeft && nextLeft.isAlly !== this.isAlly) {
			allowed.push([nextRow, col-1])
		}
		if(col<this.boardSize-1 && nextRight && nextRight.isAlly !== this.isAlly) {
			allowed.push([nextRow, col+1])
		}
		return allowed
	}
	getAllowed = ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords) : CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return this.getAllowedNoFilter([row, col], boardCopy)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, this, kingPosition)) as CellCords[]
	}
        
	getAttacking = ([row, col]: CellCords) => {
		const atacked: CellCords[] = []
		if(this.isAlly && row<=0) return []
		if(!this.isAlly && row>=this.boardSize-1) return []
		const nextRow = this.isAlly ? row-1 : row+1
		if(col>0) {
			atacked.push([nextRow, col-1])
		}
		if(col<this.boardSize-1) {
			atacked.push([nextRow, col+1])
		}
		return atacked
	}
}