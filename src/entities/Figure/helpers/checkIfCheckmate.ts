import { BoardCells, CellCords } from 'entities/Board'
import { Figure } from '../model/Figure'
import { clearAtackedCells, setAttackedCellsForAll } from './attackedCells'

export const checkIfCheckmate = (
	board: BoardCells, 
	[row, col]: CellCords, 
	[rowNext, colNext]: CellCords, 
	figure: Figure,
	[kingRow, kingCol]: CellCords) => {
	const boardCopy = JSON.parse(JSON.stringify(board)) as BoardCells
	boardCopy[row][col].figure = undefined
	boardCopy[rowNext][colNext].figure = figure
	clearAtackedCells(boardCopy)
	setAttackedCellsForAll(boardCopy)
	// проверка работает только на белого короля и фигуры!
	if (figure.isAlly && boardCopy[kingRow][kingCol].atacked.length>0 && boardCopy[kingRow][kingCol].atacked.some(v => !v?.isAlly)) return false
	return true
}