import { setAttackedCellsForAll } from 'entities/Figure/helpers/attackedCells'
import { BoardCells, CellCords, FigurePosition } from '../types/Board'
import { FigureTypes, figureMap } from 'entities/Figure'

export const setBoard = (positions: FigurePosition[], board: BoardCells) => {
	let allyKingPos: CellCords | undefined
	let enemyKingPos: CellCords | undefined
	console.log(positions)
	positions.forEach(({figure, position: [row, column], isAlly}) => {
		board[row][column].figure = figureMap(figure, isAlly)
		if (figure === FigureTypes.KING) {
			if (isAlly) {
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