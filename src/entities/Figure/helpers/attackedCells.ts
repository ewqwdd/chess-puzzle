import { BoardCells, CellCords } from 'entities/Board'
import { FigureTypes } from '../model/Figure'
import { getAttacking } from '../model/getAttacking/getAttacking'


export const setAttackedCells = (cells: CellCords[], board: BoardCells, type: FigureTypes, isAlly: boolean) => {
	cells.forEach(([row, col]) => {
		board[row][col].atacked.push({isAlly, type})
	})
	return board
}

export const deleteAtackedCells = (cells: CellCords[], board: BoardCells, type: FigureTypes, isAlly: boolean) => {
	cells.forEach(([row, col]) => {
		const index = board[row][col].atacked.lastIndexOf({isAlly, type})
		board[row][col].atacked.splice(index, 1)
	})
	return board
}

export const clearAtackedCells = (board: BoardCells) => {
	for(let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			board[i][j].atacked = []
		}
	}
}

export const setAttackedCellsForAll = (board: BoardCells) => {
	for(let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			const cell = board[i][j]
			if(cell.figure?.type) {
				const atacked = getAttacking[cell.figure.type]([i, j], board, board.length)
				if(cell.figure?.type) {
					setAttackedCells(atacked, board, cell.figure!.type!, cell.figure?.isAlly ?? true)
				}
			} 
		}
	}
}