import { BoardCells, CellCords } from 'entities/Board'
import { FigureTypes } from '../../Figure'
import { getAllowedBishop } from '../getAllowedBishop'
import { getAllowedPawn } from '../getAllowedPawn'
import { getAllowedKing } from '../getAllowedKing'
import { getAllowedKnight } from '../getAllowedKnight'
import { getAllowedQueen } from '../getAllowedQueen'
import { getAllowedRook } from '../getAllowedRook'

export const getAllowedNoFilter: Record<FigureTypes, (cell: CellCords, board: BoardCells, boardSize: number) => CellCords[]> = {
	bishop: getAllowedBishop,
	pawn: getAllowedPawn,
	king: getAllowedKing,
	knight: getAllowedKnight,
	queen: getAllowedQueen,
	rook: getAllowedRook
}

