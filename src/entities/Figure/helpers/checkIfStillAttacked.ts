import { BoardCells, CellCords } from 'entities/Board'
import { Figure } from '../model/Figure'
import { clearAtackedCells, setAttackedCellsForAll } from './attackedCells'

export const checkIfStillAttacked = (
	board: BoardCells, 
	[row, col]: CellCords, 
	[rowNext, colNext]: CellCords, 
	figure: Figure) => {
	const boardCopy = JSON.parse(JSON.stringify(board)) as BoardCells
	boardCopy[row][col].figure = undefined
	boardCopy[rowNext][colNext].figure = figure
	clearAtackedCells(boardCopy)
	setAttackedCellsForAll(boardCopy)
	// проверка работает только на белого короля и фигуры!
	if (figure.isAlly && boardCopy[rowNext][colNext].atacked.length>0 && boardCopy[rowNext][colNext].atacked.some(v => !v?.isAlly)) return false
	return true
}