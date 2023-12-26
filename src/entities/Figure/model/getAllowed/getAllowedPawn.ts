import { BoardCells, CellCords } from 'entities/Board'

export const getAllowedPawn = ([row, col]: CellCords, board: BoardCells, boardSize: number = 8 ) => {
	const allowed: CellCords[] = []
	const isAlly = board[row][col].figure?.isAlly
	if(isAlly && row<=0) return []
	if(!isAlly && row>=boardSize-1) return []
	const nextRow = isAlly ? row-1 : row + 1
	if(!board[nextRow][col].figure) {
		allowed.push([nextRow, col])
		if (row==6 && !board[nextRow-1][col].figure) {
			allowed.push([nextRow-1, col])
		}
	}
	const nextLeft = board[nextRow][col-1].figure
	const nextRight = board[nextRow][col+1].figure

	if(col>0 && nextLeft && nextLeft.isAlly !== isAlly) {
		allowed.push([nextRow, col-1])
	}
	if(col<boardSize-1 && nextRight && nextRight.isAlly !== isAlly) {
		allowed.push([nextRow, col+1])
	}
	return allowed
}