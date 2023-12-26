import { BoardCells, CellCords } from 'entities/Board'
import { FigureTypes } from '../Figure'
import { getAllowedNoFilter } from '../getAllowed/noFilter/getAllowedNoFilter'

const boardSize = 8

export const getAttacking: DeepPartial<Record<FigureTypes, (cell: CellCords, board: BoardCells) => CellCords[]>> = {
	pawn: ([row, col]: CellCords, board: BoardCells) => {
		const isAlly = board[row][col].figure?.isAlly
		const atacked: CellCords[] = []
		if(isAlly && row<=0) return []
		if(!isAlly && row>=boardSize-1) return []
		const nextRow = isAlly ? row-1 : row+1
		if(col>0) {
			atacked.push([nextRow, col-1])
		}
		if(col<boardSize-1) {
			atacked.push([nextRow, col+1])
		}
		return atacked
	},
	bishop: getAllowedNoFilter.bishop,
	king: getAllowedNoFilter.king
}

