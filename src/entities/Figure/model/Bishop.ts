import { BoardCells, CellCords, playerColor } from 'entities/Board/model/types/Board'
import { Figure, FigureTypes, getAllowedLineDirections } from './Figure'
import { checkIfCheckmate } from '../helpers/checkIfCheckmate'

const indexes = [
	[1, 1],
	[1, -1],
	[-1, -1],
	[-1, 1]
]

const getAllowedBishop = getAllowedLineDirections(indexes)

export class Bishop extends Figure {
	constructor(isAlly: boolean, color: playerColor) {
		super(isAlly, color)
		this.type = FigureTypes.BISHOP
	}
	getAllowedNoFilter = ([row, col]: CellCords, board: BoardCells) => getAllowedBishop([row, col], board, this.boardSize)
	getAllowed = ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return this.getAllowedNoFilter([row, col], boardCopy)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, this, kingPosition)) as CellCords[]
	}
		

	getAttacking = this.getAllowedNoFilter

}
