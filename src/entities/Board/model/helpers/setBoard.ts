import { setAttackedCellsForAll } from 'entities/Figure/helpers/attackedCells'
import { BoardCells, CellCords, FigurePosition } from '../types/Board'
import { FigureTypes } from 'entities/Figure'

export const setBoard = (positions: FigurePosition[], board: BoardCells) => {
	let allyKingPos: CellCords | undefined
	let enemyKingPos: CellCords | undefined
	positions.forEach(({figure, position: [row, column]}) => {
		board[row][column].figure = figure
		if (figure.type === FigureTypes.KING) {
			if (figure.isAlly) {
				allyKingPos = [row, column]
			}
			else {
				enemyKingPos = [row, column]
			}
		}
		
		//setKingPos(figure, this, [row, column])
	})
	setAttackedCellsForAll(board)

	return {board, allyKingPos, enemyKingPos}
}