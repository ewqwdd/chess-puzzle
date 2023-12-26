import { BoardCells, CellCords } from 'entities/Board'
import { FigureTypes } from '../../Figure'
import { getAllowedBishop } from '../getAllowedBishop'
import { getAllowedPawn } from '../getAllowedPawn'
import { getAllowedKing } from '../getAllowedKing'
import { checkIfCheckmate } from 'entities/Figure/helpers/checkIfCheckmate'

export const getAllowed: DeepPartial<Record<FigureTypes, (cell: CellCords, board: BoardCells, kingPosition: CellCords) => CellCords[]>> = {
	bishop: ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return getAllowedBishop([row, col], boardCopy, 8)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, board[row][col].figure!, kingPosition)) as CellCords[]
	},
	pawn: ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return getAllowedPawn([row, col], boardCopy, 8)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, board[row][col].figure!, kingPosition)) as CellCords[]
	},
	king: getAllowedKing
}

