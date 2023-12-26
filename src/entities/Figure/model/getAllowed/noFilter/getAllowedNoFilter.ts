import { BoardCells, CellCords } from 'entities/Board'
import { FigureTypes } from '../../Figure'
import { getAllowedBishop } from '../getAllowedBishop'
import { getAllowedPawn } from '../getAllowedPawn'
import { getAllowedKing } from '../getAllowedKing'

export const getAllowedNoFilter: DeepPartial<Record<FigureTypes, (cell: CellCords, board: BoardCells) => CellCords[]>> = {
	bishop: getAllowedBishop,
	pawn: getAllowedPawn,
	king: getAllowedKing
}

