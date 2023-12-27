import { BoardCells, CellCords } from 'entities/Board'
import { FigureTypes } from '../../Figure'
import { getAllowedBishop } from '../getAllowedBishop'
import { getAllowedPawn } from '../getAllowedPawn'
import { getAllowedKing } from '../getAllowedKing'
import { checkIfCheckmate } from 'entities/Figure/helpers/checkIfCheckmate'
import { getAllowedKnight } from '../getAllowedKnight'
import { getAllowedQueen } from '../getAllowedQueen'
import { getAllowedRook } from '../getAllowedRook'
import { checkIfStillAttacked } from 'entities/Figure/helpers/checkIfStillAttacked'

export const getAllowed: Record<DeepPartial<FigureTypes>, (cell: CellCords, board: BoardCells, kingPosition: CellCords) => CellCords[]> = {
	bishop: ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return getAllowedBishop([row, col], boardCopy, board.length)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, board[row][col].figure!, kingPosition)) as CellCords[]
	},
	pawn: ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return getAllowedPawn([row, col], boardCopy, board.length)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, board[row][col].figure!, kingPosition)) as CellCords[]
	},
	king: ([row, col]: CellCords, board: BoardCells): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return getAllowedKing([row, col], boardCopy, board.length)
			.filter(elem => checkIfStillAttacked(boardCopy, [row, col], elem, board[row][col].figure!)) as CellCords[]
	},
	knight: ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return getAllowedKnight([row, col], boardCopy, board.length)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, board[row][col].figure!, kingPosition)) as CellCords[]
	},
	queen: ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return getAllowedQueen([row, col], boardCopy, board.length)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, board[row][col].figure!, kingPosition)) as CellCords[]
	},
	rook: ([row, col]: CellCords, board: BoardCells, kingPosition: CellCords): CellCords[] => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		return getAllowedRook([row, col], boardCopy, board.length)
			.filter(elem => checkIfCheckmate(boardCopy, [row, col], elem, board[row][col].figure!, kingPosition)) as CellCords[]
	},
}

